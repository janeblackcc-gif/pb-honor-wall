import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Header } from '@/components/Layout/Header';
import { HonorGrid } from '@/components/HonorWall/HonorGrid';
import { Input } from '@/components/ui/Input';
import { useRunnerData } from '@/hooks/useRunnerData';
import { getDataSourceUrl, isGoogleSheetsSource } from '@/config/dataSource';

function App() {
  const { runners, loading, error } = useRunnerData(
    getDataSourceUrl(),
    isGoogleSheetsSource()
  );
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRunners = useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase();
    return runners.filter(r =>
      r.name.toLowerCase().includes(lowerTerm)
    );
  }, [runners, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input
            placeholder="搜索成员..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HonorGrid runners={filteredRunners} loading={loading} error={error} />
      </main>
    </div>
  );
}

export default App;
