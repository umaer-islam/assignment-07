/**
 * Utility functions for Bengali localization and formatting
 */

const bnNumberFormatter = new Intl.NumberFormat("bn-BD");

export function formatBengaliNumber(num: number | string): string {
  if (typeof num === "string") {
    const parsed = Number(num);
    if (isNaN(parsed)) return num;
    return bnNumberFormatter.format(parsed);
  }
  return bnNumberFormatter.format(num);
}

export function formatPriceBDT(amount: number): string {
  return `৳ ${formatBengaliNumber(amount)}`;
}

export function formatPriceTaka(amount: number): string {
  return `${formatBengaliNumber(amount)} টাকা`;
}

export function formatPriceChange(pct: number): string {
  return `${formatBengaliNumber(Math.abs(pct))}%`;
}

export function formatBengaliUnit(unit: string): string {
  if (!unit) return "";
  const clean = unit.toLowerCase().trim();
  const map: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    hali: "হালি",
    piece: "পিস",
    gram: "গ্রাম",
    gm: "গ্রাম",
  };
  if (map[clean]) return `প্রতি ${map[clean]}`;
  if (clean.startsWith("প্রতি")) return unit;
  return `প্রতি ${unit}`;
}

export function getBengaliCurrentDate(): string {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("bn-BD", options).format(date);
}
