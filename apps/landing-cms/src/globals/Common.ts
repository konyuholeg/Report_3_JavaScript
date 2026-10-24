import type { GlobalConfig } from 'payload'

export const Common: GlobalConfig = {
  slug: 'common',
  label: 'Налаштування сайту',
  access: { read: () => true },
  fields: [
    { name: 'siteName', type: 'text', label: 'Назва сайту', required: true, defaultValue: 'Internship Tracker' },
    {
      name: 'menu',
      type: 'array',
      label: 'Головне меню',
      fields: [
        { name: 'label', type: 'text', label: 'Назва пункту', required: true },
        { name: 'link', type: 'text', label: 'Посилання', required: true },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Футер',
      fields: [{ name: 'text', type: 'text', label: 'Текст' }],
    },
  ],
}
