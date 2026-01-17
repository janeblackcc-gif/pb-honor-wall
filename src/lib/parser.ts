import Papa from 'papaparse';
import { RawRecord, Runner, EventType } from '@/types';
import { parseTimeToSeconds, validateTimeFormat } from './time';

const VALID_EVENTS: Record<string, EventType> = {
  '1km': '1km',
  '1k': '1km',
  '1500m': '1500m',
  '1.5km': '1500m',
  '1500': '1500m',
  '3km': '3km',
  '3k': '3km',
  '5km': '5km',
  '5k': '5km',
  '10km': '10km',
  '10k': '10km',
  'half': '半马',
  'halfmarathon': '半马',
  'half marathon': '半马',
  '半程': '半马',
  '半马': '半马',
  'full': '全马',
  'fullmarathon': '全马',
  'full marathon': '全马',
  'marathon': '全马',
  '全程': '全马',
  '全马': '全马',
};

function normalizeEvent(rawEvent: string): EventType | null {
  if (!rawEvent) return null;
  const normalized = rawEvent.trim().toLowerCase().replace(/\s+/g, '');
  return VALID_EVENTS[normalized] || null;
}

function isValidDate(dateStr: string): boolean {
  if (!dateStr) return false;
  const date = new Date(dateStr.trim());
  return !isNaN(date.getTime());
}

export function parseCSV(csvString: string): Runner[] {
  const { data } = Papa.parse<RawRecord>(csvString, {
    header: true,
    skipEmptyLines: true,
  });

  const runnerMap = new Map<string, Runner>();

  data.forEach((row) => {
    const name = row.Name?.trim();
    if (!name) return;

    const event = normalizeEvent(row.Event);
    if (!event) return;

    const time = row.Time?.trim();
    if (!time || !validateTimeFormat(time)) return;

    const timeSeconds = parseTimeToSeconds(time);
    if (timeSeconds === null) return;

    const date = row.Date?.trim();
    if (!isValidDate(date)) return;

    if (!runnerMap.has(name)) {
      runnerMap.set(name, {
        id: name,
        name: name,
        avatar: '',
        records: {},
        lastUpdated: '1900-01-01',
      });
    }

    const runner = runnerMap.get(name)!;

    if (date > runner.lastUpdated) {
      runner.lastUpdated = date;
    }

    const currentPB = runner.records[event];
    const currentSeconds = currentPB ? parseTimeToSeconds(currentPB.time) : null;

    if (!currentSeconds || timeSeconds < currentSeconds) {
      runner.records[event] = {
        event,
        time: row.Time.trim(),
        date: date,
        note: row.Note?.trim() || '',
      };
    }
  });

  return Array.from(runnerMap.values());
}

export function parseGoogleSheetsJSON(jsonData: RawRecord[]): Runner[] {
  const runnerMap = new Map<string, Runner>();

  jsonData.forEach((row) => {
    const name = row.Name?.trim();
    if (!name) return;

    const event = normalizeEvent(row.Event);
    if (!event) return;

    const time = row.Time?.trim();
    if (!time || !validateTimeFormat(time)) return;

    const timeSeconds = parseTimeToSeconds(time);
    if (timeSeconds === null) return;

    const date = row.Date?.trim();
    if (!isValidDate(date)) return;

    if (!runnerMap.has(name)) {
      runnerMap.set(name, {
        id: name,
        name: name,
        avatar: '',
        records: {},
        lastUpdated: '1900-01-01',
      });
    }

    const runner = runnerMap.get(name)!;

    if (date > runner.lastUpdated) {
      runner.lastUpdated = date;
    }

    const currentPB = runner.records[event];
    const currentSeconds = currentPB ? parseTimeToSeconds(currentPB.time) : null;

    if (!currentSeconds || timeSeconds < currentSeconds) {
      runner.records[event] = {
        event,
        time: row.Time.trim(),
        date: date,
        note: row.Note?.trim() || '',
      };
    }
  });

  return Array.from(runnerMap.values());
}
