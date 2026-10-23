import type { Media, Page, SiteSetting } from '../payload-types'
import type {
  Accent,
  ApplicationStatus,
  LandingPage,
  MediaRef,
  PageBlock,
  PreviewCard,
  SiteSettings,
} from '@tracker/shared'

type RawBlock = Page['layout'][number]

const ACCENTS: readonly Accent[] = ['blue', 'green', 'violet']

const toAccent = (value: string | null | undefined): Accent =>
  ACCENTS.find((a) => a === value) ?? 'blue'

const toMedia = (value: number | Media | null | undefined): MediaRef | null => {
  if (!value || typeof value === 'number' || !value.url) return null
  return {
    url: value.sizes?.hero?.url ?? value.url,
    alt: value.alt,
    width: value.width,
    height: value.height,
  }
}

const toPreview = (raw: Extract<RawBlock, { blockType: 'hero' }>['preview']): PreviewCard | null => {
  if (!raw?.company || !raw.title) return null
  const status: ApplicationStatus = raw.status ?? 'applied'
  return {
    company: raw.company,
    title: raw.title,
    status,
    matchPercent: raw.matchPercent ?? 0,
    skills: (raw.skills ?? []).map((s) => ({ name: s.name, matched: Boolean(s.matched) })),
  }
}

export function normalizeBlock(block: RawBlock): PageBlock {
  const base = { id: block.id, blockName: block.blockName }
  switch (block.blockType) {
    case 'hero':
      return {
        ...base,
        blockType: 'hero',
        label: block.label,
        heading: block.heading,
        lead: block.lead,
        primaryCta: block.primaryCta,
        secondaryCta:
          block.secondaryCta?.label && block.secondaryCta.href
            ? { label: block.secondaryCta.label, href: block.secondaryCta.href }
            : null,
        preview: toPreview(block.preview),
        image: toMedia(block.image),
      }
    case 'features':
      return {
        ...base,
        blockType: 'features',
        title: block.title,
        items: block.items.map((i) => ({ title: i.title, text: i.text, accent: toAccent(i.accent) })),
      }
    case 'steps':
      return {
        ...base,
        blockType: 'steps',
        title: block.title,
        items: block.items.map((i) => ({ title: i.title, text: i.text })),
      }
    case 'stats':
      return {
        ...base,
        blockType: 'stats',
        items: block.items.map((i) => ({ value: i.value, label: i.label })),
      }
    case 'faq':
      return {
        ...base,
        blockType: 'faq',
        title: block.title,
        items: block.items.map((i) => ({ question: i.question, answer: i.answer })),
      }
    case 'cta':
      return {
        ...base,
        blockType: 'cta',
        heading: block.heading,
        text: block.text,
        showLeadForm: Boolean(block.showLeadForm),
        buttonLabel: block.buttonLabel ?? 'Повідомте мене про запуск',
      }
  }
}

export const normalizeSettings = (raw: SiteSetting): SiteSettings => ({
  brandName: raw.brandName,
  nav: (raw.nav ?? []).map((n) => ({ label: n.label, href: n.href, external: Boolean(n.external) })),
  socials: (raw.socials ?? []).map((x) => ({ platform: x.platform, url: x.url })),
  footerText: raw.footerText ?? '',
  contactEmail: raw.contactEmail ?? null,
})

export const normalizePage = (doc: Page): Omit<LandingPage, 'site'> => ({
  slug: doc.slug,
  title: doc.title,
  seo: { title: doc.seo?.title || doc.title, description: doc.seo?.description || '' },
  updatedAt: doc.updatedAt,
  blocks: doc.layout.map(normalizeBlock),
})
