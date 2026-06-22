import { useState, useMemo } from 'react'
import { Search, AlertTriangle } from 'lucide-react'
import logoColor from '@/assets/logo-color.png'
import logoWhite from '@/assets/logo-white.png'
import { useApps } from '@/hooks/useApps'
import { AppCard } from '@/components/AppCard'
import { SkeletonCard } from '@/components/SkeletonCard'
import { SearchBar } from '@/components/SearchBar'
import { EmptyState } from '@/components/EmptyState'
import { CategoryFilter } from '@/components/CategoryFilter'

function SectionHeader({ title, count, accent }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className={`w-1.5 h-5 rounded-full ${accent}`} />
      <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
      <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md tabular-nums">
        {count}
      </span>
    </div>
  )
}

export default function App() {
  const { apps, loading, offline } = useApps()
  const [search, setSearch]           = useState('')
  const [categoryFilter, setCategory] = useState('')

  const categories = useMemo(() => {
    const cats = [...new Set(apps.map(a => a.category).filter(Boolean))]
    return cats.sort()
  }, [apps])

  const filtered = useMemo(() =>
    apps.filter(a => {
      const matchSearch   = !search || [a.name, a.description, a.category].some(v =>
        v?.toLowerCase().includes(search.toLowerCase())
      )
      const matchCategory = !categoryFilter || a.category === categoryFilter
      return matchSearch && matchCategory
    }),
    [apps, search, categoryFilter]
  )

  const activeApps   = useMemo(() => filtered.filter(a => a.status === 'active'),   [filtered])
  const inactiveApps = useMemo(() => filtered.filter(a => a.status !== 'active'),   [filtered])
  const isEmpty      = !loading && filtered.length === 0

  const inactiveSectionTitle = useMemo(() => {
    const hasMaintenance = inactiveApps.some(a => a.status === 'maintenance')
    const hasComingSoon  = inactiveApps.some(a => a.status === 'coming-soon')
    if (hasMaintenance && hasComingSoon) return 'Em breve e manutenção'
    if (hasMaintenance) return 'Manutenção'
    return 'Em breve'
  }, [inactiveApps])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-slate-900 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium focus:ring-2 focus:ring-blue-500"
      >
        Ir para o conteúdo
      </a>

      {/* Header persistente */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-14 flex items-center justify-between">
          <h1 className="sr-only">UNI Hub — Sistemas Digitais Construtora UNI</h1>
          <img src={logoColor} alt="UNI Hub" className="h-7 w-auto" />
          <a
            href="mailto:ti@somosauni.com.br"
            aria-label="Enviar email para suporte de TI"
            className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
          >
            Suporte
          </a>
        </div>
      </header>

      {/* Hero compacto */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 px-6 py-8 sm:py-10 text-center">
        <img src={logoWhite} alt="" aria-hidden="true" className="h-10 mx-auto mb-5 opacity-90" />
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Conteúdo principal */}
      <main id="main-content" className="flex-1 px-6 lg:px-8 py-8 max-w-6xl mx-auto w-full">

        {/* Banner offline */}
        {offline && (
          <div
            role="alert"
            className="mb-6 flex items-center gap-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-2.5 rounded-lg"
          >
            <AlertTriangle size={14} className="shrink-0" aria-hidden="true" />
            <span>Dados carregados em modo offline. Algumas informações podem estar desatualizadas.</span>
          </div>
        )}

        {/* Filtros de categoria */}
        {!loading && categories.length > 0 && (
          <div className="mb-6">
            <CategoryFilter
              categories={categories}
              active={categoryFilter}
              onChange={setCategory}
            />
          </div>
        )}

        {/* Contador de resultados (acessibilidade) */}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {!loading && `${filtered.length} aplicativo${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`}
        </span>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>

        ) : isEmpty ? (
          <EmptyState
            icon={Search}
            title="Nenhum aplicativo encontrado"
            description="Tente buscar com outros termos ou limpar os filtros"
            action={
              <button
                type="button"
                onClick={() => { setSearch(''); setCategory('') }}
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                Limpar filtros
              </button>
            }
          />

        ) : (
          <div className="space-y-10">

            {/* Seção: Disponíveis */}
            {activeApps.length > 0 && (
              <section aria-label="Aplicativos disponíveis">
                <SectionHeader
                  title="Disponíveis"
                  count={activeApps.length}
                  accent="bg-emerald-500"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {activeApps.map(app => <AppCard key={app.slug} {...app} />)}
                </div>
              </section>
            )}

            {/* Seção: Em breve / Manutenção */}
            {inactiveApps.length > 0 && (
              <section aria-label={inactiveSectionTitle}>
                <SectionHeader
                  title={inactiveSectionTitle}
                  count={inactiveApps.length}
                  accent="bg-slate-300"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {inactiveApps.map(app => <AppCard key={app.slug} {...app} />)}
                </div>
              </section>
            )}

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Construtora UNI. Todos os direitos reservados.</p>
          <a
            href="mailto:ti@somosauni.com.br"
            aria-label="Enviar email para suporte de TI"
            className="hover:text-blue-600 transition-colors"
          >
            ti@somosauni.com.br
          </a>
        </div>
      </footer>

    </div>
  )
}
