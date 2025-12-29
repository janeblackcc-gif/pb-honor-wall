import { X, Timer, Calendar, Award } from 'lucide-react';
import { PersonalBest } from '@/types';

interface PBDetailModalProps {
  pb: PersonalBest;
  runnerName: string;
  onClose: () => void;
}

const EVENT_COLORS: Record<string, string> = {
  '1km': 'text-yellow-600',
  '3km': 'text-orange-600',
  '5km': 'text-emerald-600',
  '10km': 'text-blue-600',
  '半马': 'text-purple-600',
  '全马': 'text-rose-600',
};

export function PBDetailModal({ pb, runnerName, onClose }: PBDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 p-6 border-b border-slate-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-white/50"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-500 rounded-lg text-white">
              <Award size={20} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{runnerName}</h2>
          </div>

          <p className={`text-3xl font-bold ${EVENT_COLORS[pb.event]} uppercase tracking-wide`}>
            {pb.event}
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-baseline gap-3">
            <Timer className="text-slate-400 shrink-0" size={20} />
            <div>
              <p className="text-xs text-slate-500 mb-1">成绩</p>
              <p className="text-4xl font-bold font-mono text-slate-800">{pb.time}</p>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <Calendar className="text-slate-400 shrink-0" size={20} />
            <div>
              <p className="text-xs text-slate-500 mb-1">创造日期</p>
              <p className="text-lg font-semibold text-slate-700">{pb.date}</p>
            </div>
          </div>

          {pb.note && (
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 mb-2">备注</p>
              <p className="text-sm text-slate-700 leading-relaxed break-words">
                {pb.note}
              </p>
            </div>
          )}
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
