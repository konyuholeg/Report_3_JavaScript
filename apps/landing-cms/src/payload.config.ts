import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { uk } from '@payloadcms/translations/languages/uk'
import { en } from '@payloadcms/translations/languages/en'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Common } from './globals/Common'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' — Landing CMS' },
  },
  i18n: { supportedLanguages: { uk, en }, fallbackLanguage: 'uk' },
  // Vite-лендінг живе на іншому origin, тому дозволяємо його в CORS
  cors: [process.env.FRONTEND_URL || 'http://localhost:5173'],
  serverURL: process.env.CMS_URL || 'http://localhost:3001',
  collections: [Pages, Media, Users],
  globals: [Common],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '', max: 5 },
  }),
  sharp,
})
