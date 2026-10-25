import type { Block } from 'payload'

export const Stats: Block = {
  slug: 'stats',
  labels: { singular: 'Цифри', plural: 'Цифри' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції (для якоря)' },
    {
      name: 'items',
      type: 'array',
      label: 'Показники',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'value', type: 'text', label: 'Значення', required: true },
        { name: 'label', type: 'text', label: 'Підпис', required: true },
      ],
    },
  ],
}
