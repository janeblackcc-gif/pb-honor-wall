import { Runner } from '@/types';
import { RunnerCard } from './RunnerCard';
import { Loader2, AlertCircle } from 'lucide-react';

interface HonorGridProps {
  runners: Runner[];
  loading: boolean;
  error?: string | null;
}

export function HonorGrid({ runners, loading, error }: HonorGridProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p>加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-red-500 bg-red-50 rounded-lg border border-red-200">
        <AlertCircle className="mb-4" size={32} />
        <p className="font-semibold">加载失败</p>
        <p className="text-sm text-red-400 mt-2">{error}</p>
      </div>
    );
  }

  if (runners.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
        <p>未找到符合条件的成员</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {runners.map(runner => (
        <RunnerCard key={runner.id} runner={runner} />
      ))}
    </div>
  );
}
