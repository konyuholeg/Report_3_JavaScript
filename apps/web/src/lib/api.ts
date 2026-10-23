import { fail, isLandingPage, isObject, parseApiResult } from '@tracker/shared'
import type { ApiResult, LandingPage, LeadInput } from '@tracker/shared'

const isLeadAck = (value: unknown): value is { id: string | number; email: string } =>
  isObject(value) && typeof value.email === 'string'

async function request<T>(
  url: string,
  validate: (value: unknown) => value is T,
  init?: RequestInit,
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, init)
    const raw: unknown = await res.json().catch(() => null)
    return parseApiResult(raw, validate)
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    return fail('network', 'Немає зʼєднання з сервером. Перевірте інтернет і спробуйте ще раз.', 0)
  }
}

export const fetchLanding = (slug: string, signal?: AbortSignal): Promise<ApiResult<LandingPage>> =>
  request(`/api/landing/${encodeURIComponent(slug)}`, isLandingPage, { signal, cache: 'no-store' })

export const submitLead = (input: LeadInput): Promise<ApiResult<{ id: string | number; email: string }>> =>
  request('/api/subscribe', isLeadAck, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
