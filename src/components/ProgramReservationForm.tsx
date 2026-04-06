"use client";

import { useEffect, useState, useTransition } from "react";

type ProgramReservationFormProps = {
  slug: string;
  title: string;
};

type ProgramPayload = {
  item: {
    sessions: Array<{
      id: string;
      startsAt: string;
      endsAt: string;
      city: string;
      timezone: string;
      venueName: string | null;
      status: string;
    }>;
  };
};

function formatSessionLabel(session: ProgramPayload["item"]["sessions"][number]) {
  const starts = new Date(session.startsAt);
  return `${starts.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })} • ${starts.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  })} • ${session.city}`;
}

export default function ProgramReservationForm({ slug, title }: ProgramReservationFormProps) {
  const [sessions, setSessions] = useState<ProgramPayload["item"]["sessions"]>([]);
  const [sessionId, setSessionId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [participantCount, setParticipantCount] = useState("1");
  const [notes, setNotes] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;

    void fetch(`/api/public/content/programs/${slug}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: ProgramPayload | null) => {
        if (!cancelled && data?.item?.sessions) {
          setSessions(data.item.sessions);
          setSessionId(data.item.sessions[0]?.id ?? "");
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <div className="rounded-[28px] border border-[#D8CEC1] bg-[#FAF7F1] p-8">
      <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d6d]">Reserve Your Spot</p>
      <h2 className="mt-4 text-[28px] leading-[1.12] tracking-[-0.02em] text-[#1c1c1c]">{title}</h2>
      <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.8] text-[#5f584f]">
        Send a reservation request and Seijaku will follow up with confirmation and fulfillment details.
      </p>

      <div className="mt-6 grid gap-4">
        {sessions.length > 0 ? (
          <select
            value={sessionId}
            onChange={(event) => setSessionId(event.target.value)}
            className="w-full rounded-[18px] border border-[#cfc3b4] bg-white px-4 py-3 text-[14px] text-[#2f2924] outline-none focus:border-[#2e4a36] focus:ring-2 focus:ring-[#2e4a36]/15"
          >
            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {formatSessionLabel(session)}
              </option>
            ))}
          </select>
        ) : (
          <p className="rounded-[18px] border border-[#ded2c4] bg-[#fcf9f4] px-4 py-3 text-[13px] leading-[1.8] text-[#6a6055]">
            No dated session is published yet. You can still send an interest request and Seijaku will follow up when dates are finalized.
          </p>
        )}

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
          value={participantCount}
          onChange={(event) => setParticipantCount(event.target.value)}
          className="w-full rounded-[18px] border border-[#cfc3b4] bg-white px-4 py-3 text-[14px] text-[#2f2924] outline-none focus:border-[#2e4a36] focus:ring-2 focus:ring-[#2e4a36]/15"
        />
        <textarea
          rows={4}
          placeholder="Notes or accessibility needs"
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

            const response = await fetch("/api/public/lead/program-reservations", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                slug,
                sessionId: sessionId || undefined,
                name,
                email,
                phone,
                participantCount: Number(participantCount || 1),
                notes,
              }),
            });

            const data = (await response.json().catch(() => null)) as { error?: string } | null;

            if (!response.ok) {
              setError(data?.error ?? "Unable to submit reservation.");
              return;
            }

            setNotice("Reservation request received. Seijaku will follow up soon.");
            setName("");
            setEmail("");
            setPhone("");
            setParticipantCount("1");
            setNotes("");
          });
        }}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f4efe8] hover:bg-[#243c2c] disabled:cursor-not-allowed disabled:bg-[#a8a095]"
      >
        {isPending ? "Sending Request" : "Send Reservation Request"}
      </button>
    </div>
  );
}
