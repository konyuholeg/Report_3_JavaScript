import type { Block } from 'payload'

const accentOptions = [
  { label: 'Синій', value: 'blue' },
  { label: 'Зелений', value: 'green' },
  { label: 'Фіолетовий', value: 'violet' },
]

const linkFields = (prefix: string) => [
  { name: 'label', type: 'text' as const, required: true, label: `${prefix}: текст` },
  { name: 'href', type: 'text' as const, required: true, label: `${prefix}: посилання` },
]

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Головний екран', plural: 'Головні екрани' },
  fields: [
    { name: 'label', type: 'text', required: true, label: 'Мітка над заголовком' },
    { name: 'heading', type: 'text', required: true, label: 'Заголовок' },
    { name: 'lead', type: 'textarea', required: true, label: 'Підзаголовок' },
    { name: 'primaryCta', type: 'group', label: 'Основна кнопка', fields: linkFields('Кнопка') },
    { name: 'secondaryCta', type: 'group', label: 'Додаткова кнопка', fields: linkFields('Кнопка').map((f) => ({ ...f, required: false })) },
    {
      name: 'preview',
      type: 'group',
      label: 'Картка-приклад вакансії',
      fields: [
        { name: 'company', type: 'text' },
        { name: 'title', type: 'text' },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'applied',
          options: [
            { label: 'Знайдено', value: 'found' },
            { label: 'Подано заявку', value: 'applied' },
            { label: 'Зацікавило', value: 'offer' },
            { label: 'Відмова', value: 'rejected' },
          ],
        },
        { name: 'matchPercent', type: 'number', min: 0, max: 100, defaultValue: 67 },
        {
          name: 'skills',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'matched', type: 'checkbox', defaultValue: true },
          ],
        },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Зображення (необов’язково)' },
  ],
}

export const FeaturesBlock: Block = {
  slug: 'features',
  labels: { singular: 'Можливості', plural: 'Блоки можливостей' },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Заголовок секції' },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
        { name: 'accent', type: 'select', defaultValue: 'blue', options: accentOptions },
      ],
    },
  ],
}

export const StepsBlock: Block = {
  slug: 'steps',
  labels: { singular: 'Як це працює', plural: 'Блоки кроків' },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Заголовок секції' },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
      ],
    },
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Цифри', plural: 'Блоки цифр' },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}

export const FaqBlock: Block = {
  slug: 'faq',
  labels: { singular: 'Питання та відповіді', plural: 'Блоки FAQ' },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Заголовок секції' },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}

export const CtaBlock: Block = {
  slug: 'cta',
  labels: { singular: 'Заклик до дії', plural: 'Блоки CTA' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    { name: 'showLeadForm', type: 'checkbox', defaultValue: true, label: 'Показати форму email' },
    { name: 'buttonLabel', type: 'text', defaultValue: 'Повідомте мене про запуск' },
  ],
}

export const pageBlocks: Block[] = [HeroBlock, FeaturesBlock, StepsBlock, StatsBlock, FaqBlock, CtaBlock]
