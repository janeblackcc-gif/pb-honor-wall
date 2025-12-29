import { PersonalBest, EventType } from '@/types';
import { cn } from '@/lib/utils';
import { Timer, Calendar } from 'lucide-react';
import { formatTime } from '@/lib/time';

interface EventBadgeProps {
  pb: PersonalBest;
  onClick?: () => void;
}

const EVENT_STYLES: Record<EventType, string> = {
  '1km': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  '3km': 'bg-orange-100 text-orange-800 border-orange-200',
  '5km': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  '10km': 'bg-blue-100 text-blue-800 border-blue-200',
  '半马': 'bg-purple-100 text-purple-800 border-purple-200',
  '全马': 'bg-rose-100 text-rose-800 border-rose-200',
};

export function EventBadge({ pb, onClick }: EventBadgeProps) {
  return (
    <div
      className={cn(
        "flex flex-col p-3 rounded-lg border transition-all duration-200",
        EVENT_STYLES[pb.event] || 'bg-slate-100 text-slate-800',
        onClick && "cursor-pointer hover:shadow-md hover:scale-105"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold text-xs uppercase tracking-wider opacity-80">
          {pb.event}
        </span>
        {pb.note && (
           <span className="text-[10px] truncate max-w-[80px] opacity-70" title={pb.note}>
             {pb.note}
           </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 font-mono text-lg font-bold leading-none">
        <Timer size={14} className="opacity-60" />
        {formatTime(pb.time)}
      </div>
      <div className="text-[10px] opacity-60 mt-1 flex items-center gap-1">
        <Calendar size={10} /> {pb.date}
      </div>
    </div>
  );
}
