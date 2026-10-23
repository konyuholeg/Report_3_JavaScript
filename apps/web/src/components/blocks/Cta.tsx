import type { BlockByType } from '@tracker/shared'
import { LeadForm } from '../LeadForm'

export function Cta({ block }: { block: BlockByType<'cta'> }) {
  return (
    <section className="lp-card lp-cta" id="cta">
      <h2>{block.heading}</h2>
      {block.text && <p>{block.text}</p>}
      {block.showLeadForm && <LeadForm buttonLabel={block.buttonLabel} />}
    </section>
  )
}
