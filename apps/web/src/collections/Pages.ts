import type { CollectionConfig } from 'payload'
import { pageBlocks } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Сторінка', plural: 'Сторінки' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'updatedAt'] },
  access: {
    read: ({ req }) => (req.user ? true : { published: { equals: true } }),
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Назва' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug',
      admin: { position: 'sidebar' },
      validate: (value: unknown) =>
        typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
          ? true
          : 'Лише латиниця, цифри та дефіси',
    },
    { name: 'published', type: 'checkbox', defaultValue: true, label: 'Опубліковано', admin: { position: 'sidebar' } },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'title', type: 'text', maxLength: 70 },
        { name: 'description', type: 'textarea', maxLength: 180 },
      ],
    },
    { name: 'layout', type: 'blocks', required: true, minRows: 1, label: 'Блоки сторінки', blocks: pageBlocks },
  ],
}
