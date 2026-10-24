import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції (для якоря)' },
    { name: 'badge', type: 'text', label: 'Бейдж' },
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    { name: 'subtitle', type: 'textarea', label: 'Підзаголовок' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Зображення' },
    {
      name: 'buttons',
      type: 'array',
      label: 'Кнопки',
      maxRows: 2,
      fields: [
        { name: 'text', type: 'text', label: 'Текст', required: true },
        { name: 'link', type: 'text', label: 'Посилання', required: true },
        {
          name: 'variant',
          type: 'select',
          label: 'Вигляд',
          defaultValue: 'primary',
          options: [
            { label: 'Основна', value: 'primary' },
            { label: 'Додаткова', value: 'secondary' },
          ],
        },
      ],
    },
  ],
}
