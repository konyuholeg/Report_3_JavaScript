'use client'

import { useEffect } from 'react'
import { useLanding } from '../hooks/useLanding'
import { BlockRenderer } from './BlockRenderer'
import { ErrorState, LandingSkeleton } from './States'
import { SiteFooter, SiteHeader } from './SiteChrome'

export function LandingClient({ slug }: { slug: string }) {
  const { state, retry } = useLanding(slug)

  useEffect(() => {
    if (state.status === 'ready') document.title = state.data.seo.title
  }, [state])

  const site = state.status === 'ready' ? state.data.site : undefined

  return (
    <>
      <SiteHeader site={site} />
      <main className="container main">
        {state.status === 'loading' && <LandingSkeleton />}
        {state.status === 'error' && <ErrorState error={state.error} onRetry={retry} />}
        {state.status === 'ready' && <BlockRenderer blocks={state.data.blocks} />}
      </main>
      <SiteFooter site={site} />
    </>
  )
}
