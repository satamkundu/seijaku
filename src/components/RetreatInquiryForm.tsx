"use client";

import { useState, useTransition } from "react";

export default function RetreatInquiryForm({ slug, title }: { slug: string; title: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [partySize, setPartySize] = useState("1");
  const [notes, setNotes] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded-[28px] border border-[#d8cec1] bg-[#faf7f1] p-6 sm:p-8">
      <p className="text-[10px] uppercase tracking-[0.22em] text-[#8e755c]">Retreat Inquiry</p>
      <h2 className="mt-4 text-[30px] leading-[1.08] tracking-[-0.02em] text-[#1c1c1c]">{title}</h2>
      <p className="mt-4 max-w-[38ch] text-[15px] leading-[1.8] text-[#5d574e]">
        Send your details and Seijaku will follow up with availability, timing, and retreat preparation notes.
      </p>

      <div className="mt-6 grid gap-4">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-[18px] border border-[#cfc3b4] bg-white px-4 py-3 text-[14px] text-[#2f2924] outline-none focus:border-[#2e4a36] focus:ring-2 focus:ring-[#2e4a36]/15"
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-[18px] border border-[#cfc3b4] bg-white px-4 py-3 text-[14px] text-[#2f2924] outline-none focus:border-[#2e4a36] focus:ring-2 focus:ring-[#2e4a36]/15"
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="w-full rounded-[18px] border border-[#cfc3b4] bg-white px-4 py-3 text-[14px] text-[#2f2924] outline-none focus:border-[#2e4a36] focus:ring-2 focus:ring-[#2e4a36]/15"
        />
        <input
          type="number"
          min="1"
          value={partySize}
          onChange={(event) => setPartySize(event.target.value)}
          className="w-full rounded-[18px] border border-[#cfc3b4] bg-white px-4 py-3 text-[14px] text-[#2f2924] outline-none focus:border-[#2e4a36] focus:ring-2 focus:ring-[#2e4a36]/15"
        />
        <textarea
          rows={4}
          placeholder="Anything you want Seijaku to know about your interest"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="w-full rounded-[18px] border border-[#cfc3b4] bg-white px-4 py-3 text-[14px] leading-[1.8] text-[#2f2924] outline-none focus:border-[#2e4a36] focus:ring-2 focus:ring-[#2e4a36]/15"
        />
      </div>

      {notice ? <p className="mt-4 rounded-[18px] border border-[#cde0d2] bg-[#eef8f0] px-4 py-3 text-[13px] text-[#2c6541]">{notice}</p> : null}
      {error ? <p className="mt-4 rounded-[18px] border border-[#e7c1ba] bg-[#fff1ee] px-4 py-3 text-[13px] text-[#9f4332]">{error}</p> : null}

      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            setNotice(null);
            setError(null);

            const response = await fetch("/api/public/lead/retreat-inquiries", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                slug,
                name,
                email,
                phone,
                partySize: Number(partySize || 1),
                notes,
              }),
            });

            const data = (await response.json().catch(() => null)) as { error?: string } | null;

            if (!response.ok) {
              setError(data?.error ?? "Unable to send inquiry.");
              return;
            }

            setNotice("Inquiry received. Seijaku will reach out with details soon.");
            setName("");
            setEmail("");
            setPhone("");
            setPartySize("1");
            setNotes("");
          });
        }}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] hover:bg-[#243c2c] disabled:cursor-not-allowed disabled:bg-[#a8a095]"
      >
        {isPending ? "Sending Inquiry" : "Send Inquiry"}
      </button>
    </div>
  );
}
