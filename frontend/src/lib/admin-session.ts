import "server-only";

import crypto from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { backendJson } from "@/src/lib/backend";

const ADMIN_COOKIE_NAME = process.env.ADMIN_COOKIE_NAME ?? "seijaku-admin-session";
const ADMIN_COOKIE_SECRET = process.env.ADMIN_COOKIE_SECRET ?? "seijaku-admin-cookie-secret";
const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

type AdminSessionPayload = {
  token: string;
};

export type AdminIdentity = {
  id: string;
  email: string;
  role: "SUPER_ADMIN" | "EDITOR";
  status: "ACTIVE" | "DISABLED";
};

function toBase64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function fromBase64Url(input: string) {
  return Buffer.from(input, "base64url").toString("utf8");
}

function signPayload(payload: string) {
  return crypto.createHmac("sha256", ADMIN_COOKIE_SECRET).update(payload).digest("base64url");
}

function encodeSession(payload: AdminSessionPayload) {
  const raw = toBase64Url(JSON.stringify(payload));
  return `${raw}.${signPayload(raw)}`;
}

function decodeSession(cookieValue: string | undefined) {
  if (!cookieValue) {
    return null;
  }

  const [raw, signature] = cookieValue.split(".");

  if (!raw || !signature) {
    return null;
  }

  const expectedSignature = signPayload(raw);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  try {
    return JSON.parse(fromBase64Url(raw)) as AdminSessionPayload;
  } catch {
    return null;
  }
}

async function fetchCurrentAdmin(token: string) {
  return backendJson<{ admin: AdminIdentity }>("/admin/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getAdminSessionToken() {
  const cookieStore = await cookies();
  const session = decodeSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  return session?.token ?? null;
}

export async function getCurrentAdminIdentity() {
  const token = await getAdminSessionToken();

  if (!token) {
    return null;
  }

  try {
    const data = await fetchCurrentAdmin(token);
    return { token, admin: data.admin };
  } catch {
    return null;
  }
}

export async function requireCurrentAdmin() {
  const session = await getCurrentAdminIdentity();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export function applyAdminSessionCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: encodeSession({ token }),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });

  return response;
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
