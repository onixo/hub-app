import { cn } from '@/lib/utils'

export function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        type="button"
        onClick={() => onChange('')}
        className={cn(
          'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
          !active
            ? 'bg-blue-700 text-white'
            : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-700',
        )}
      >
        Todos
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
            active === cat
              ? 'bg-blue-700 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-700',
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
