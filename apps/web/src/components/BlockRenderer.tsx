import type { ComponentType } from 'react'
import type { BlockByType, BlockType, PageBlock } from '@tracker/shared'
import { Hero } from './blocks/Hero'
import { Features } from './blocks/Features'
import { Steps } from './blocks/Steps'
import { Stats } from './blocks/Stats'
import { Faq } from './blocks/Faq'
import { Cta } from './blocks/Cta'

type BlockComponents = {
  [K in BlockType]: ComponentType<{ block: BlockByType<K> }>
}

const components: BlockComponents = {
  hero: Hero,
  features: Features,
  steps: Steps,
  stats: Stats,
  faq: Faq,
  cta: Cta,
}

function renderBlock<K extends BlockType>(block: BlockByType<K>) {
  const Component = components[block.blockType as K] as ComponentType<{ block: BlockByType<K> }>
  return <Component block={block} />
}

export function BlockRenderer({ blocks }: { blocks: PageBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <div key={block.id ?? `${block.blockType}-${index}`}>{renderBlock(block)}</div>
      ))}
    </>
  )
}
