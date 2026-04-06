"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { completeReadingRitual, getReflection, saveReflection } from "@/src/lib/ritualProgress";

const screens = [
  { id: "intro", label: "Intro" },
  { id: "step-1", label: "Step 1" },
  { id: "step-2", label: "Step 2" },
  { id: "step-3", label: "Step 3" },
  { id: "step-4", label: "Step 4" },
  { id: "complete", label: "Done" },
] as const;

const stepContent = [
  {
    eyebrow: "Reading Ritual",
    title: "The Reading Hour",
    subtitle: "A quiet return to the page - and to yourself.",
    body: [
      "Reading is not consumption.",
      "It is companionship.",
      "Take ten unhurried minutes to sit with a book - and your senses.",
      "Optional: A Seijaku diffuser or scent object.",
      "Estimated time: 8-12 minutes.",
    ],
    button: "Begin",
  },
  {
    eyebrow: "Step 1",
    title: "Prepare the Space",
    body: [
      "Light your chosen scent.",
      "Adjust the light - softer than the day.",
      "Place your book in front of you.",
      "Notice its weight. Its edges.",
      "Take one slow breath before opening it.",
    ],
    button: "Continue",
  },
  {
    eyebrow: "Step 2",
    title: "Read Slowly",
    body: [
      "Read one page only.",
      "Do not skim.",
      "Do not underline yet.",
      "Let the sentences move at their own pace.",
      "When a line lingers, pause.",
    ],
    button: "Continue",
  },
  {
    eyebrow: "Step 3",
    title: "The Line That Stayed",
    body: ["What sentence remained with you?", "Type it below - exactly as written."],
    button: "Continue",
  },
  {
    eyebrow: "Step 4",
    title: "Close Gently",
    body: [
      "Close the book.",
      "Hold it for a moment before placing it down.",
      "Let the scent in the room carry the words forward.",
      "Tonight, one page is enough.",
    ],
    button: "Complete Ritual",
  },
];

export default function RitualPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [reflection, setReflection] = useState(() => getReflection());
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (!timerRunning) return;

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setTimerRunning(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [step, timerRunning]);

  function handleReflectionChange(value: string) {
    setReflection(value);
    saveReflection(value);
  }

  function goNext() {
    if (step === 3 && !reflection.trim()) return;

    if (step === 4) {
      completeReadingRitual();
      setTimerRunning(false);
      setStep(5);
      return;
    }

    setStep((current) => {
      const nextStep = Math.min(current + 1, 5);

      if (current === 1) {
        setTimeLeft(300);
        setTimerRunning(false);
      }

      if (nextStep === 2) {
        setTimeLeft(300);
        setTimerRunning(false);
      }

      return nextStep;
    });
  }

  function handlePracticeAgain() {
    setStep(0);
    setTimerRunning(false);
    setTimeLeft(300);
  }

  const current = stepContent[Math.min(step, 4)];
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <main className="min-h-screen bg-[#ece5da] px-6 pb-20 pt-[108px] sm:px-8 sm:pt-[124px]">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-3xl border border-[#b89e6c]/25 bg-[#f8f3ec] p-6 shadow-[0_20px_60px_rgba(70,50,25,0.08)] sm:p-8">
          <div className="flex flex-wrap gap-2">
            {screens.map((screen, index) => {
              const isActive = index === step;
              const isComplete = index < step;

              return (
                <div
                  key={screen.id}
                  className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] transition ${
                    isActive
                      ? "border-[#2e4a36] bg-[#2e4a36] text-[#f4efe8]"
                      : isComplete
                        ? "border-[#b89e6c]/40 bg-[#efe4d4] text-[#5a5a5a]"
                        : "border-[#b89e6c]/30 bg-[#fbf7f1] text-[#8a8177]"
                  }`}
                >
                  {screen.label}
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="mt-8"
            >
              {step < 5 ? (
                <>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#5a5a5a]">{current.eyebrow}</p>
                  <h1 className="mt-5 font-serif text-[28px] tracking-[-0.01em] text-[#1c1c1c]">{current.title}</h1>
                  {"subtitle" in current && current.subtitle ? (
                    <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.85] text-[#3a3a3a]">{current.subtitle}</p>
                  ) : null}

                  <div className="mt-6 space-y-4 rounded-2xl border border-[#2e4a36]/20 bg-[#fbf7f1] p-5">
                    {current.body.map((paragraph) => (
                      <p key={paragraph} className="max-w-[46ch] text-[15px] leading-[1.85] text-[#3a3a3a]">
                        {paragraph}
                      </p>
                    ))}

                    {step === 2 ? (
                      <div className="rounded-2xl border border-[#b89e6c]/25 bg-[#f4efe8] p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#5a5a5a]">Reading Timer</p>
                        <p className="mt-2 font-serif text-[28px] text-[#1c1c1c]">
                          {minutes}:{seconds}
                        </p>
                        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => setTimerRunning((currentTimerState) => !currentTimerState)}
                            className="inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-5 py-3 text-sm font-medium text-[#f4efe8] transition hover:bg-[#243c2c]"
                          >
                            {timerRunning ? "Pause timer" : timeLeft === 300 || timeLeft === 0 ? "Start 5-minute timer" : "Resume timer"}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setTimerRunning(false);
                              setTimeLeft(300);
                            }}
                            className="inline-flex items-center justify-center rounded-full border border-[#2e4a36]/35 px-5 py-3 text-sm font-medium text-[#2e4a36] transition hover:bg-[#2e4a36] hover:text-[#f4efe8]"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {step === 3 ? (
                      <div className="pt-1">
                        <textarea
                          value={reflection}
                          onChange={(event) => handleReflectionChange(event.target.value)}
                          placeholder="A line I want to remember..."
                          className="min-h-[132px] w-full rounded-2xl border border-[#b89e6c]/35 bg-[#fffdfa] px-4 py-4 text-[15px] text-[#3a3a3a] outline-none placeholder:text-[#8b8177] focus:border-[#2e4a36]"
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link href="/" className="text-[11px] uppercase tracking-[0.18em] text-[#5a5a5a] transition hover:text-[#2e4a36]">
                      Return Home
                    </Link>
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={step === 3 && !reflection.trim()}
                      className="inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-6 py-4 text-sm font-medium text-[#f4efe8] transition hover:bg-[#243c2c] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      {current.button}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#5a5a5a]">Reading Ritual</p>
                  <h1 className="mt-5 font-serif text-[28px] tracking-[-0.01em] text-[#1c1c1c]">Ritual complete</h1>
                  <div className="mt-6 rounded-2xl border border-[#2e4a36]/20 bg-[#fbf7f1] p-5">
                    <p className="max-w-[40ch] text-[15px] leading-[1.85] text-[#3a3a3a]">
                      Your reflection is saved locally.
                    </p>
                    <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.85] text-[#3a3a3a]">
                      Return tomorrow to keep the practice alive.
                    </p>
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => router.push("/dashboard")}
                      className="inline-flex items-center justify-center rounded-full bg-[#2e4a36] px-6 py-4 text-sm font-medium text-[#f4efe8] transition hover:bg-[#243c2c]"
                    >
                      Go to dashboard
                    </button>
                    <button
                      type="button"
                      onClick={handlePracticeAgain}
                      className="inline-flex items-center justify-center rounded-full border border-[#2e4a36]/35 px-6 py-4 text-sm font-medium text-[#2e4a36] transition hover:bg-[#2e4a36] hover:text-[#f4efe8]"
                    >
                      Practice again
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
