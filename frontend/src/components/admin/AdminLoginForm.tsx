"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { adminButtonClassName, adminInputClassName } from "@/src/components/admin/AdminField";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        startTransition(async () => {
          setError(null);
          const response = await fetch("/api/admin/session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const payload = (await response.json().catch(() => null)) as { error?: string } | null;

          if (!response.ok) {
            setError(payload?.error ?? "Unable to sign in.");
            return;
          }

          router.push("/admin");
          router.refresh();
        });
      }}
    >
      <div className="space-y-2">
        <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#6a5d50]" htmlFor="admin-email">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={adminInputClassName}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#6a5d50]" htmlFor="admin-password">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={adminInputClassName}
        />
      </div>

      {error ? <p className="rounded-2xl border border-[#e7c1ba] bg-[#fff1ee] px-4 py-3 text-[14px] text-[#9f4332]">{error}</p> : null}

      <button type="submit" disabled={isPending} className={`${adminButtonClassName} w-full`}>
        {isPending ? "Signing in" : "Sign in"}
      </button>
    </form>
  );
}
