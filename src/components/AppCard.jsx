import { memo } from 'react'
import { ExternalLink, Clock, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ICONS, STATUS_CONFIG } from '@/constants/apps'

const ICON_BG = {
  active:        'bg-blue-50',
  maintenance:   'bg-amber-50',
  'coming-soon': 'bg-slate-100',
}

const ICON_COLOR = {
  active:        'text-blue-700',
  maintenance:   'text-amber-600',
  'coming-soon': 'text-slate-400',
}

export const AppCard = memo(function AppCard({ name, description, icon: iconKey, category, status, url, eta }) {
  const Icon   = ICONS[iconKey] ?? ICONS.FileText
  const cfg    = STATUS_CONFIG[status] ?? STATUS_CONFIG['coming-soon']
  const active = status === 'active' && !!url

  const card = (
    <div className={cn(
      'group bg-white rounded-xl border p-5 flex flex-col gap-3 h-full transition-all duration-150',
      active
        ? 'border-slate-200 hover:shadow-md hover:-translate-y-0.5 hover:border-blue-300 cursor-pointer'
        : 'border-slate-100 bg-slate-50/60 cursor-default opacity-60',
    )}>

      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', ICON_BG[status] ?? 'bg-slate-100')}>
          <Icon size={20} className={cn(ICON_COLOR[status] ?? 'text-slate-400')} aria-hidden="true" />
        </div>
        <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap', cfg.cls)}>
          {cfg.label}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1">
        <p className="font-semibold text-slate-900 text-sm leading-snug">{name}</p>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{description}</p>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
          {category}
        </span>
        <div className="flex items-center gap-1">
          {active && (
            <span className="flex items-center gap-1 text-xs font-medium text-blue-600 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              Acessar <ExternalLink size={11} aria-hidden="true" />
            </span>
          )}
          {status === 'coming-soon' && eta && (
            <span className="text-xs text-slate-400">{eta}</span>
          )}
          {status === 'coming-soon' && !eta && (
            <Clock size={13} className="text-slate-300" aria-hidden="true" />
          )}
          {status === 'maintenance' && (
            <Wrench size={13} className="text-amber-500" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  )

  if (active) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Acessar ${name} — abre em nova aba`}
        className="contents"
      >
        {card}
      </a>
    )
  }

  return card
})
