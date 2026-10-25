import type { Block } from 'payload'

export const Steps: Block = {
  slug: 'steps',
  labels: { singular: 'Кроки', plural: 'Кроки' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції (для якоря)' },
    { name: 'title', type: 'text', label: 'Заголовок секції', required: true },
    {
      name: 'items',
      type: 'array',
      label: 'Кроки',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', label: 'Назва', required: true },
        { name: 'text', type: 'textarea', label: 'Опис' },
      ],
    },
  ],
}
