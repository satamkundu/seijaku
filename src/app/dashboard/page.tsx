"use client";

import Link from "next/link";
import { useState } from "react";

import { readRitualMetrics, type RitualMetrics } from "@/src/lib/ritualProgress";

const emptyMetrics: RitualMetrics = {
  completedCount: 0,
  streak: 0,
  statusToday: "Pending",
  reflection: "",
  lastCompletedDate: null,
};

export default function DashboardPage() {
  const [metrics] = useState<RitualMetrics>(() => readRitualMetrics() ?? emptyMetrics);

  return (
    <main className="min-h-screen bg-[#ece5da] px-6 pb-20 pt-[108px] sm:px-8 sm:pt-[124px]">
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-3xl border border-[#b89e6c]/25 bg-[#f8f3ec] p-6 shadow-[0_20px_60px_rgba(70,50,25,0.08)] sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#5a5a5a]">Dashboard</p>
          <h1 className="mt-5 font-serif text-[28px] tracking-[-0.01em] text-[#1c1c1c]">Daily Ritual Overview</h1>
          <p className="mt-3 max-w-[42ch] text-[15px] leading-[1.85] text-[#3a3a3a]">
            Your reading ritual progress is saved locally and updated the moment you complete today&apos;s practice.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#2e4a36]/20 bg-[#fbf7f1] p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#5a5a5a]">Completed Rituals</p>
              <p className="mt-2 font-serif text-[28px] text-[#1c1c1c]">{metrics.completedCount}</p>
            </div>
            <div className="rounded-2xl border border-[#2e4a36]/20 bg-[#fbf7f1] p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#5a5a5a]">Status Today</p>
              <p className="mt-2 font-serif text-[28px] text-[#1c1c1c]">{metrics.statusToday}</p>
            </div>
            <div className="rounded-2xl border border-[#2e4a36]/20 bg-[#fbf7f1] p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#5a5a5a]">Streak</p>
              <p className="mt-2 font-serif text-[28px] text-[#1c1c1c]">{metrics.streak} Days</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#2e4a36]/20 bg-[#fbf7f1] p-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#5a5a5a]">Latest Reflection</p>
            <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.85] text-[#3a3a3a]">
              {metrics.reflection.trim() ? metrics.reflection : "No line saved yet. Complete The Reading Hour to keep one sentence close."}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/ritual"
              className="inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-6 py-4 text-sm font-medium text-[#f4efe8] transition hover:bg-[#243c2c]"
            >
              Return to Ritual
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-[#2e4a36]/35 px-6 py-4 text-sm font-medium text-[#2e4a36] transition hover:bg-[#2e4a36] hover:text-[#f4efe8]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
