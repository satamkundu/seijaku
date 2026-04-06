"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { adminSecondaryButtonClassName } from "@/src/components/admin/AdminField";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            setError(null);
            const response = await fetch("/api/admin/session", { method: "DELETE" });

            if (!response.ok) {
              setError("Unable to sign out right now.");
              return;
            }

            router.push("/admin/login");
            router.refresh();
          });
        }}
        className={adminSecondaryButtonClassName}
      >
        {isPending ? "Signing out" : "Sign out"}
      </button>
      {error ? <p className="text-[12px] text-[#9f4332]">{error}</p> : null}
    </div>
  );
}
