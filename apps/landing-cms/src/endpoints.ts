import type { Endpoint } from 'payload'

const CMS_URL = process.env.CMS_URL || 'http://localhost:3001'

// Фронтенд на іншому origin, тому відносні URL медіа робимо абсолютними.
function absoluteUrl(url: string): string {
  return /^https?:\/\//i.test(url) ? url : new URL(url, CMS_URL).toString()
}

// Прибираємо службові поля Payload і віддаємо фронтенду плоский блок { type, ... }.
function cleanBlock(block: Record<string, any>) {
  const { id, blockName, blockType, image, ...rest } = block
  const clean: Record<string, any> = { type: blockType, ...rest }

  if (image && typeof image === 'object' && image.url) {
    clean.image = { src: absoluteUrl(image.url), alt: image.alt ?? '' }
  }

  return clean
}

export const commonEndpoint: Endpoint = {
  path: '/common',
  method: 'get',
  handler: async (req) => {
    const common = await req.payload.findGlobal({ slug: 'common' })

    return Response.json({
      siteName: common.siteName,
      menu: (common.menu ?? []).map(({ label, link }) => ({ label, link })),
      footer: { text: common.footer?.text ?? '' },
    })
  },
}

export const pageEndpoint: Endpoint = {
  path: '/page',
  method: 'get',
  handler: async (req) => {
    const path = typeof req.query.path === 'string' ? req.query.path : '/'

    const result = await req.payload.find({
      collection: 'pages',
      where: { path: { equals: path } },
      depth: 1,
      limit: 1,
    })

    const page = result.docs[0]

    if (!page) {
      return Response.json({ error: 'Сторінку не знайдено' }, { status: 404 })
    }

    return Response.json({
      path: page.path,
      title: page.title,
      blocks: (page.blocks ?? []).map(cleanBlock),
    })
  },
}

export const endpoints: Endpoint[] = [commonEndpoint, pageEndpoint]
