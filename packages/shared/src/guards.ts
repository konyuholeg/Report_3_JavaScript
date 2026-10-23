import type {
  ApiError,
  ApiResult,
  BlockByType,
  BlockType,
  LandingPage,
  LeadInput,
  PageBlock,
} from './types'

const BLOCK_TYPES: readonly BlockType[] = ['hero', 'features', 'steps', 'stats', 'faq', 'cta']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const isBlockType = (value: unknown): value is BlockType =>
  typeof value === 'string' && (BLOCK_TYPES as readonly string[]).includes(value)

export const isPageBlock = (value: unknown): value is PageBlock =>
  isObject(value) && isBlockType(value.blockType)

export function isBlockOf<T extends BlockType>(
  block: PageBlock,
  type: T,
): block is BlockByType<T> {
  return block.blockType === type
}

export function pickBlocks<T extends BlockType>(blocks: PageBlock[], type: T): BlockByType<T>[] {
  return blocks.filter((block): block is BlockByType<T> => isBlockOf(block, type))
}

export const isValidEmail = (email: string): boolean => EMAIL_RE.test(email.trim())

export const isLeadInput = (value: unknown): value is LeadInput =>
  isObject(value) && typeof value.email === 'string' && isValidEmail(value.email)

export const isApiError = (value: unknown): value is ApiError =>
  isObject(value) &&
  typeof value.code === 'string' &&
  typeof value.message === 'string' &&
  typeof value.status === 'number'

export const isLandingPage = (value: unknown): value is LandingPage =>
  isObject(value) &&
  typeof value.slug === 'string' &&
  typeof value.title === 'string' &&
  Array.isArray(value.blocks) &&
  value.blocks.every(isPageBlock) &&
  isObject(value.site)

export function parseApiResult<T>(raw: unknown, validate: (value: unknown) => value is T): ApiResult<T> {
  if (isObject(raw) && raw.ok === true && validate(raw.data)) {
    return { ok: true, data: raw.data }
  }
  if (isObject(raw) && raw.ok === false && isApiError(raw.error)) {
    return { ok: false, error: raw.error }
  }
  return {
    ok: false,
    error: { code: 'server', message: 'Сервер повернув неочікувану відповідь', status: 502 },
  }
}

export const ok = <T>(data: T): ApiResult<T> => ({ ok: true, data })

export const fail = (code: ApiError['code'], message: string, status: number): ApiResult<never> => ({
  ok: false,
  error: { code, message, status },
})
