export type RitualMetrics = {
  completedCount: number;
  streak: number;
  statusToday: "Completed" | "Pending";
  reflection: string;
  lastCompletedDate: string | null;
};

const REFLECTION_KEY = "readingRitualReflection";
const COMPLETED_TODAY_KEY = "ritualCompletedToday";
const COMPLETED_DATE_KEY = "ritualCompletedDate";
const COMPLETED_COUNT_KEY = "ritualCompletedCount";
const STREAK_KEY = "ritualStreak";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getTodayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function getYesterdayKey(date = new Date()) {
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  return getTodayKey(yesterday);
}

export function getReflection() {
  if (!canUseStorage()) return "";
  return window.localStorage.getItem(REFLECTION_KEY) ?? "";
}

export function saveReflection(value: string) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(REFLECTION_KEY, value);
}

export function readRitualMetrics(): RitualMetrics {
  if (!canUseStorage()) {
    return {
      completedCount: 0,
      streak: 0,
      statusToday: "Pending",
      reflection: "",
      lastCompletedDate: null,
    };
  }

  const today = getTodayKey();
  const completedDate = window.localStorage.getItem(COMPLETED_DATE_KEY);
  const completedCount = Number.parseInt(window.localStorage.getItem(COMPLETED_COUNT_KEY) ?? "0", 10);
  const streak = Number.parseInt(window.localStorage.getItem(STREAK_KEY) ?? "0", 10);
  const reflection = window.localStorage.getItem(REFLECTION_KEY) ?? "";
  const isCompletedToday =
    window.localStorage.getItem(COMPLETED_TODAY_KEY) === "true" && completedDate === today;

  return {
    completedCount: Number.isNaN(completedCount) ? 0 : completedCount,
    streak: Number.isNaN(streak) ? 0 : streak,
    statusToday: isCompletedToday ? "Completed" : "Pending",
    reflection,
    lastCompletedDate: completedDate,
  };
}

export function completeReadingRitual() {
  if (!canUseStorage()) return readRitualMetrics();

  const today = getTodayKey();
  const yesterday = getYesterdayKey();
  const metrics = readRitualMetrics();
  const completedToday = metrics.lastCompletedDate === today;

  let nextCompletedCount = metrics.completedCount;
  let nextStreak = metrics.streak;

  if (!completedToday) {
    nextCompletedCount += 1;
    nextStreak = metrics.lastCompletedDate === yesterday ? metrics.streak + 1 : 1;
  }

  window.localStorage.setItem(COMPLETED_TODAY_KEY, "true");
  window.localStorage.setItem(COMPLETED_DATE_KEY, today);
  window.localStorage.setItem(COMPLETED_COUNT_KEY, String(nextCompletedCount));
  window.localStorage.setItem(STREAK_KEY, String(nextStreak));

  return {
    completedCount: nextCompletedCount,
    streak: nextStreak,
    statusToday: "Completed" as const,
    reflection: getReflection(),
    lastCompletedDate: today,
  };
}
