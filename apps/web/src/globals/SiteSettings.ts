import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Налаштування сайту',
  access: { read: () => true },
  fields: [
    { name: 'brandName', type: 'text', required: true, defaultValue: 'Internship Tracker', label: 'Назва бренду' },
    {
      name: 'nav',
      type: 'array',
      label: 'Навігація',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'external', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      label: 'Соцмережі',
      maxRows: 8,
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'GitHub', value: 'github' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'X (Twitter)', value: 'x' },
          ],
        },
        { name: 'url', type: 'text', required: true, label: 'Посилання' },
      ],
    },
    { name: 'footerText', type: 'text', defaultValue: '© Internship Tracker', label: 'Текст у футері' },
    { name: 'contactEmail', type: 'email', label: 'Контактний email' },
  ],
}
