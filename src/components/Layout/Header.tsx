import { Trophy, UploadCloud, Database } from 'lucide-react';
import { DATA_SOURCE_CONFIG } from '@/config/dataSource';

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 py-4 sm:py-0 gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-brand-500 rounded-lg text-white">
              <Trophy size={24} />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              PB 荣誉墙
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {children}
            <a
              href={DATA_SOURCE_CONFIG.DATABASE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 rounded-full transition-all duration-200 hover:border-brand-500 hover:shadow-md cursor-pointer no-underline"
            >
              <Database size={16} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
              <span className="text-xs font-semibold tracking-wider text-slate-600 group-hover:text-brand-500 uppercase">
                数据表
              </span>
            </a>
            <a
              href={DATA_SOURCE_CONFIG.UPLOAD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 rounded-full transition-all duration-200 hover:border-brand-500 hover:shadow-md cursor-pointer no-underline"
            >
              <UploadCloud size={16} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
              <span className="text-xs font-semibold tracking-wider text-slate-600 group-hover:text-brand-500 uppercase">
                上传数据
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
