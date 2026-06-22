import { Search, X } from 'lucide-react'

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative max-w-md sm:max-w-lg mx-auto">
      <label htmlFor="app-search" className="sr-only">
        Buscar aplicativo
      </label>
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        aria-hidden="true"
      />
      <input
        id="app-search"
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Buscar aplicativo..."
        autoComplete="off"
        className="w-full bg-white rounded-lg pl-10 pr-9 py-2.5 text-sm text-slate-900 outline-none shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-800 transition-shadow"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Limpar busca"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
