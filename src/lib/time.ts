const TIME_REGEX = /^(\d{1,2}):([0-5]\d):([0-5]\d)$|^([0-5]?\d):([0-5]\d)$/;

export function validateTimeFormat(timeStr: string): boolean {
  if (!timeStr) return false;
  return TIME_REGEX.test(timeStr.trim());
}

export function parseTimeToSeconds(timeStr: string): number | null {
  if (!timeStr) return null;
  const trimmed = timeStr.trim();

  if (!TIME_REGEX.test(trimmed)) return null;

  const parts = trimmed.split(':');
  const nums = parts.map(p => parseInt(p, 10));

  if (nums.some(n => isNaN(n))) return null;

  if (parts.length === 2) {
    const [mins, secs] = nums;
    return mins * 60 + secs;
  } else if (parts.length === 3) {
    const [hours, mins, secs] = nums;
    return hours * 3600 + mins * 60 + secs;
  }

  return null;
}

export function formatTime(timeStr: string): string {
  if (!timeStr) return 'Time Error';
  const trimmed = timeStr.trim();

  if (!TIME_REGEX.test(trimmed)) {
    return 'Time Error';
  }

  return trimmed;
}
