import { useState, useEffect } from 'react';
import { Runner } from '@/types';
import { parseCSV, parseGoogleSheetsJSON } from '@/lib/parser';

export function useRunnerData(dataSourceUrl: string, isGoogleSheets = false) {
  const [runners, setRunners] = useState<Runner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(dataSourceUrl, {
          signal: abortController.signal,
        });

        if (!response.ok) throw new Error('Failed to fetch data');

        let parsedRunners: Runner[];

        if (isGoogleSheets) {
          const jsonData = await response.json();
          parsedRunners = parseGoogleSheetsJSON(jsonData);
        } else {
          const csvText = await response.text();
          parsedRunners = parseCSV(csvText);
        }

        parsedRunners.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));

        setRunners(parsedRunners);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [dataSourceUrl, isGoogleSheets]);

  return { runners, loading, error };
}
