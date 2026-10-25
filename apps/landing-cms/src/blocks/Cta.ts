import type { Block } from 'payload'

export const Cta: Block = {
  slug: 'cta',
  labels: { singular: 'Заклик до дії', plural: 'Заклики до дії' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції (для якоря)' },
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    { name: 'text', type: 'textarea', label: 'Текст' },
    { name: 'buttonText', type: 'text', label: 'Текст кнопки', required: true },
    { name: 'buttonLink', type: 'text', label: 'Посилання кнопки', required: true },
  ],
}
