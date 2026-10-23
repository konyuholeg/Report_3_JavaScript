import type { Endpoint, PayloadRequest } from 'payload'
import { fail, isObject, isValidEmail, ok } from '@tracker/shared'
import type { ApiResult, LandingPage, LeadInput } from '@tracker/shared'
import { normalizePage, normalizeSettings } from '../lib/normalize'

const json = <T,>(result: ApiResult<T>, status: number): Response =>
  Response.json(result, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  })

const readBody = async (req: PayloadRequest): Promise<unknown> => {
  try {
    return await req.json?.()
  } catch {
    return undefined
  }
}

const landingEndpoint: Endpoint = {
  path: '/landing/:slug',
  method: 'get',
  handler: async (req) => {
    const slug = String(req.routeParams?.slug ?? '')
    try {
      const found = await req.payload.find({
        collection: 'pages',
        where: { slug: { equals: slug }, published: { equals: true } },
        depth: 1,
        limit: 1,
        overrideAccess: true,
      })
      const doc = found.docs[0]
      if (!doc) {
        return json(fail('not_found', `Сторінку «${slug}» не знайдено`, 404), 404)
      }
      const settings = await req.payload.findGlobal({ slug: 'site-settings', depth: 0 })
      const page: LandingPage = { ...normalizePage(doc), site: normalizeSettings(settings) }
      return json(ok(page), 200)
    } catch (error) {
      req.payload.logger.error({ err: error, msg: 'landing endpoint failed' })
      return json(fail('server', 'Не вдалося отримати сторінку', 500), 500)
    }
  },
}

const leadsEndpoint: Endpoint = {
  path: '/subscribe',
  method: 'post',
  handler: async (req) => {
    const body = await readBody(req)
    if (!isObject(body) || typeof body.email !== 'string' || !isValidEmail(body.email)) {
      return json(fail('validation', 'Вкажіть коректний email', 400), 400)
    }
    const input: LeadInput = {
      email: body.email.trim().toLowerCase(),
      name: typeof body.name === 'string' ? body.name.trim().slice(0, 100) : undefined,
      source: typeof body.source === 'string' ? body.source.slice(0, 50) : 'landing',
    }
    try {
      const existing = await req.payload.find({
        collection: 'leads',
        where: { email: { equals: input.email } },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      })
      if (existing.totalDocs > 0) {
        return json(fail('duplicate', 'Цей email уже підписаний', 409), 409)
      }
      const created = await req.payload.create({
        collection: 'leads',
        data: input,
        overrideAccess: true,
      })
      return json(ok({ id: created.id, email: created.email }), 201)
    } catch (error) {
      req.payload.logger.error({ err: error, msg: 'lead endpoint failed' })
      return json(fail('server', 'Не вдалося зберегти email', 500), 500)
    }
  },
}

const healthEndpoint: Endpoint = {
  path: '/health',
  method: 'get',
  handler: async (req) => {
    try {
      const pages = await req.payload.count({ collection: 'pages', overrideAccess: true })
      return json(ok({ database: 'up', pages: pages.totalDocs }), 200)
    } catch {
      return json(fail('server', 'База даних недоступна', 503), 503)
    }
  },
}

export const endpoints: Endpoint[] = [landingEndpoint, leadsEndpoint, healthEndpoint]
