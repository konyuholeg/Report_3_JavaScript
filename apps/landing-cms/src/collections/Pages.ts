import type { CollectionConfig } from 'payload'
import { pageBlocks } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Сторінка', plural: 'Сторінки' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'path', 'updatedAt'] },
  access: { read: () => true },
  fields: [
    {
      name: 'path',
      type: 'text',
      label: 'Адреса сторінки',
      required: true,
      unique: true,
      defaultValue: '/',
      validate: (value: unknown) =>
        typeof value === 'string' && /^\/[a-z0-9\-/]*$/.test(value)
          ? true
          : 'Адреса має починатися з "/" (латиниця, цифри, дефіси)',
    },
    { name: 'title', type: 'text', label: 'Назва сторінки', required: true },
    { name: 'blocks', type: 'blocks', label: 'Блоки сторінки', blocks: pageBlocks },
  ],
}
