"use client";

import { useState, useTransition } from "react";

export default function FooterNewsletterForm() {
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="mt-10"
      onSubmit={(event) => {
        event.preventDefault();
        startTransition(async () => {
          setNotice(null);
          setError(null);

          const response = await fetch("/api/public/lead/newsletter-subscriptions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              source: "site-footer",
            }),
          });

          const data = (await response.json().catch(() => null)) as { error?: string } | null;

          if (!response.ok) {
            setError(data?.error ?? "Unable to subscribe right now.");
            return;
          }

          setNotice("Subscribed. Quiet notes from Seijaku will arrive soon.");
          setEmail("");
        });
      }}
    >
      <label htmlFor="footer-email" className="sr-only">
        Your email address
      </label>
      <div className="flex flex-col gap-4 border-b border-black/20 pb-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          className="w-full bg-transparent px-0 py-1 text-[16px] text-[#1f1d1a] outline-none placeholder:text-[#8e877d]"
        />
        <button
          type="submit"
          disabled={isPending}
          className="shrink-0 px-0 py-1 text-left text-[12px] font-medium uppercase tracking-[0.28em] text-[#1f1d1a] hover:opacity-65 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1f1d1a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#e8e2d7] disabled:opacity-50"
        >
          {isPending ? "Subscribing" : "Subscribe"}
        </button>
      </div>
      {notice ? <p className="mt-4 text-[13px] leading-[1.8] text-[#2e4a36]">{notice}</p> : null}
      {error ? <p className="mt-4 text-[13px] leading-[1.8] text-[#9f4332]">{error}</p> : null}
    </form>
  );
}
