export function SkeletonCard() {
  return (
    <div aria-hidden="true" className="bg-white rounded-xl border border-slate-200 p-5 h-36 animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-slate-100" />
        <div className="h-6 w-16 rounded-full bg-slate-100" />
      </div>
      <div className="h-3.5 w-2/3 bg-slate-100 rounded mb-2" />
      <div className="h-3 w-full bg-slate-100 rounded mb-1.5" />
      <div className="h-3 w-4/5 bg-slate-100 rounded" />
    </div>
  )
}
