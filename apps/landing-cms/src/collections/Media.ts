import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Медіафайл', plural: 'Медіа' },
  access: { read: () => true },
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'card', width: 640 },
      { name: 'hero', width: 1280 },
    ],
  },
  fields: [{ name: 'alt', type: 'text', required: true, label: 'Alt-текст' }],
}
