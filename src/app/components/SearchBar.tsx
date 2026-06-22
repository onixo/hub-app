import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar aplicativos..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0047BB] focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}
