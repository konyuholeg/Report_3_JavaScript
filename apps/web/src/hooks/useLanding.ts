'use client'

import { useCallback, useEffect, useState } from 'react'
import type { LandingPage, LoadState } from '@tracker/shared'
import { fetchLanding } from '../lib/api'

export function useLanding(slug: string): { state: LoadState<LandingPage>; retry: () => void } {
  const [state, setState] = useState<LoadState<LandingPage>>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading' })

    fetchLanding(slug, controller.signal)
      .then((result) => {
        setState(result.ok ? { status: 'ready', data: result.data } : { status: 'error', error: result.error })
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setState({
          status: 'error',
          error: { code: 'server', message: 'Сталася непередбачена помилка', status: 500 },
        })
      })

    return () => controller.abort()
  }, [slug, attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])
  return { state, retry }
}
