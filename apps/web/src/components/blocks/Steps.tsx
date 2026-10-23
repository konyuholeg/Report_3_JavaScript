import type { BlockByType } from '@tracker/shared'

export function Steps({ block }: { block: BlockByType<'steps'> }) {
  return (
    <section id="steps">
      <h2 className="lp-section-title">{block.title}</h2>
      <div className="lp-grid">
        {block.items.map((item, index) => (
          <article key={item.title} className="lp-card lp-feature">
            <div className="lp-step-num">{index + 1}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
