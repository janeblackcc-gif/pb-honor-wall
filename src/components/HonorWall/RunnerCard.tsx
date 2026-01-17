import { useState } from 'react';
import { Runner, EventType } from '@/types';
import { EventBadge } from './EventBadge';
import { PBDetailModal } from './PBDetailModal';
import { getInitials, getAvatarColor } from '@/lib/utils';

interface RunnerCardProps {
  runner: Runner;
}

const DISPLAY_ORDER: EventType[] = ['1km', '1500m', '3km', '5km', '10km', '半马', '全马'];

export function RunnerCard({ runner }: RunnerCardProps) {
  const hasRecords = Object.keys(runner.records).length > 0;
  const [selectedPB, setSelectedPB] = useState<{ event: EventType; runnerName: string } | null>(null);

  return (
    <>
      <div className="bg-white rounded-2xl border-2 border-slate-100 hover:border-brand-500 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
        <div className="p-5 flex items-center gap-4 border-b border-slate-50">
          <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 shadow-sm">
            <div className={`w-full h-full flex items-center justify-center text-white font-bold text-xl ${getAvatarColor(runner.name)}`}>
              {getInitials(runner.name)}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-slate-900 truncate">{runner.name}</h3>
            <p className="text-xs text-slate-400">
              更新于 {runner.lastUpdated}
            </p>
          </div>
        </div>

        <div className="p-5 grid grid-cols-2 gap-3 flex-1 content-start">
          {hasRecords ? DISPLAY_ORDER.map(evt => {
            const pb = runner.records[evt];
            if (!pb) return null;
            return (
              <EventBadge
                key={evt}
                pb={pb}
                onClick={() => setSelectedPB({ event: evt, runnerName: runner.name })}
              />
            );
          }) : (
            <div className="col-span-2 text-center text-sm text-slate-400 py-8">暂无记录</div>
          )}
        </div>
      </div>

      {selectedPB && runner.records[selectedPB.event] && (
        <PBDetailModal
          pb={runner.records[selectedPB.event]!}
          runnerName={selectedPB.runnerName}
          onClose={() => setSelectedPB(null)}
        />
      )}
    </>
  );
}
