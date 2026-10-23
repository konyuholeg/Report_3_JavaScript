import type { BlockByType } from '@tracker/shared'

export function Faq({ block }: { block: BlockByType<'faq'> }) {
  return (
    <section id="faq">
      <h2 className="lp-section-title">{block.title}</h2>
      <div className="lp-faq">
        {block.items.map((item) => (
          <details key={item.question} className="lp-card lp-faq-item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
