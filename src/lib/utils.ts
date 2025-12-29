import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  if (!name) return '?';
  const trimmed = name.trim();
  if (/[\u4e00-\u9fa5]/.test(trimmed)) {
    return trimmed.charAt(0);
  }
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

export function getAvatarColor(name: string): string {
  const colors = [
    'bg-gradient-to-br from-rose-400 to-pink-300',
    'bg-gradient-to-br from-sky-400 to-blue-300',
    'bg-gradient-to-br from-emerald-400 to-teal-300',
    'bg-gradient-to-br from-amber-400 to-orange-300',
    'bg-gradient-to-br from-purple-400 to-violet-300',
    'bg-gradient-to-br from-lime-400 to-green-300',
    'bg-gradient-to-br from-fuchsia-400 to-pink-300',
    'bg-gradient-to-br from-cyan-400 to-sky-300',
  ];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}
