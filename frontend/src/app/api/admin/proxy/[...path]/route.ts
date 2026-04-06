import { NextRequest, NextResponse } from "next/server";

import { clearAdminSessionCookie, getAdminSessionToken } from "@/src/lib/admin-session";
import { getBackendBaseUrl } from "@/src/lib/backend";

async function proxyRequest(request: NextRequest, params: { path?: string[] }) {
  const token = await getAdminSessionToken();

  if (!token) {
    return clearAdminSessionCookie(NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }

  const targetPath = params.path?.join("/") ?? "";
  const targetUrl = `${getBackendBaseUrl()}/admin/${targetPath}${request.nextUrl.search}`;
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Accept", "application/json");

  let body: BodyInit | undefined;
  const contentType = request.headers.get("content-type");

  if (contentType?.includes("multipart/form-data")) {
    const incomingFormData = await request.formData();
    const outgoingFormData = new FormData();

    for (const [key, value] of incomingFormData.entries()) {
      outgoingFormData.append(key, value);
    }

    body = outgoingFormData;
  } else if (request.method !== "GET" && request.method !== "HEAD") {
    const text = await request.text();
    if (text) {
      body = text;
      if (contentType) {
        headers.set("Content-Type", contentType);
      }
    }
  }

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
    cache: "no-store",
  });

  const responseText = await response.text();
  const nextResponse = new NextResponse(responseText, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "application/json",
    },
  });

  if (response.status === 401) {
    return clearAdminSessionCookie(nextResponse);
  }

  return nextResponse;
}

export async function GET(request: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  return proxyRequest(request, await context.params);
}

export async function POST(request: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  return proxyRequest(request, await context.params);
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  return proxyRequest(request, await context.params);
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  return proxyRequest(request, await context.params);
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  return proxyRequest(request, await context.params);
}
