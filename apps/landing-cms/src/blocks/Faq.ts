import type { Block } from 'payload'

export const Faq: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQ' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції (для якоря)' },
    { name: 'title', type: 'text', label: 'Заголовок секції', required: true },
    {
      name: 'items',
      type: 'array',
      label: 'Питання',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', label: 'Питання', required: true },
        { name: 'answer', type: 'textarea', label: 'Відповідь', required: true },
      ],
    },
  ],
}
