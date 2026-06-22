import { useState, useEffect } from 'react'
import { APP_META, COMING_SOON_EXTRA } from '@/constants/apps'

function normalize(data) {
  return data.map(a => ({
    slug:   a.slug,
    name:   APP_META[a.slug]?.name ?? a.name,
    status: a.isActive ? 'active' : 'coming-soon',
    ...APP_META[a.slug],
  }))
}

function buildFallback() {
  const base = Object.entries(APP_META).map(([slug, meta]) => ({
    slug, status: 'coming-soon', ...meta,
  }))
  COMING_SOON_EXTRA.forEach(a => base.push({ ...a, status: 'coming-soon' }))
  return base
}

export function useApps() {
  const [apps, setApps]       = useState([])
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/applications/public', { signal: controller.signal })
      .then(r => r.ok ? r.json() : Promise.reject(new Error('API error')))
      .then(({ data }) => {
        const fromApi  = normalize(data)
        const apiSlugs = new Set(data.map(a => a.slug))
        COMING_SOON_EXTRA
          .filter(a => !apiSlugs.has(a.slug))
          .forEach(a => fromApi.push({ ...a, status: 'coming-soon' }))
        setApps(fromApi)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setOffline(true)
        setApps(buildFallback())
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return { apps, loading, offline }
}
