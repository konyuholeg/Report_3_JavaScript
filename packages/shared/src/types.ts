export type ID = string | number
export type Slug = string
export type Href = string
export type ISODate = string

export type BlockType = 'hero' | 'features' | 'steps' | 'stats' | 'faq' | 'cta'
export type Accent = 'blue' | 'green' | 'violet'
export type ApplicationStatus = 'found' | 'applied' | 'offer' | 'rejected'

export type BlockBase = {
  id?: string | null
  blockName?: string | null
}

export type Link = {
  label: string
  href: Href
}

export type MediaRef = {
  url: string
  alt: string
  width?: number | null
  height?: number | null
}

export type PreviewSkill = {
  name: string
  matched: boolean
}

export type PreviewCard = {
  company: string
  title: string
  status: ApplicationStatus
  matchPercent: number
  skills: PreviewSkill[]
}

export type HeroBlock = BlockBase & {
  blockType: 'hero'
  label: string
  heading: string
  lead: string
  primaryCta: Link
  secondaryCta?: Link | null
  preview?: PreviewCard | null
  image?: MediaRef | null
}

export type FeatureItem = {
  title: string
  text: string
  accent: Accent
}

export type FeaturesBlock = BlockBase & {
  blockType: 'features'
  title: string
  items: FeatureItem[]
}

export type StepItem = {
  title: string
  text: string
}

export type StepsBlock = BlockBase & {
  blockType: 'steps'
  title: string
  items: StepItem[]
}

export type StatItem = {
  value: string
  label: string
}

export type StatsBlock = BlockBase & {
  blockType: 'stats'
  items: StatItem[]
}

export type FaqItem = {
  question: string
  answer: string
}

export type FaqBlock = BlockBase & {
  blockType: 'faq'
  title: string
  items: FaqItem[]
}

export type CtaBlock = BlockBase & {
  blockType: 'cta'
  heading: string
  text?: string | null
  showLeadForm: boolean
  buttonLabel: string
}

export type PageBlock = HeroBlock | FeaturesBlock | StepsBlock | StatsBlock | FaqBlock | CtaBlock

export type BlockByType<T extends BlockType> = Extract<PageBlock, { blockType: T }>

export type SeoMeta = {
  title: string
  description: string
}

export type PageMeta = {
  slug: Slug
  title: string
  seo: SeoMeta
  updatedAt: ISODate
}

export type NavLink = Link & { external?: boolean }

export type SocialPlatform = 'github' | 'telegram' | 'linkedin' | 'instagram' | 'facebook' | 'youtube' | 'x'

export type SocialLink = {
  platform: SocialPlatform
  url: Href
}

export type SiteSettings = {
  brandName: string
  nav: NavLink[]
  socials: SocialLink[]
  footerText: string
  contactEmail?: string | null
}

export type LandingPage = PageMeta & {
  blocks: PageBlock[]
  site: SiteSettings
}

export type LeadInput = {
  email: string
  name?: string
  source?: string
}

export type LeadRecord = LeadInput & {
  id: ID
  createdAt: ISODate
}

export type ApiError = {
  code: 'not_found' | 'validation' | 'duplicate' | 'server' | 'network'
  message: string
  status: number
}

export type ApiSuccess<T> = { ok: true; data: T }
export type ApiFailure = { ok: false; error: ApiError }
export type ApiResult<T> = ApiSuccess<T> | ApiFailure

export type LoadState<T> =
  | { status: 'loading' }
  | { status: 'error'; error: ApiError }
  | { status: 'ready'; data: T }

export type Validator<T> = (value: unknown) => value is T
