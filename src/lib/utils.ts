import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(date: Date) {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInMs = Number(now) - Number(targetDate);

  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  const rtf = new Intl.RelativeTimeFormat("ar", { numeric: "auto" });
  return rtf.format(-diffInDays, "day");
}
