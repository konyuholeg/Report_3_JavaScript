import type { BlockByType } from '@tracker/shared'

export function Features({ block }: { block: BlockByType<'features'> }) {
  return (
    <section id="features">
      <h2 className="lp-section-title">{block.title}</h2>
      <div className="lp-grid">
        {block.items.map((item) => (
          <article key={item.title} className={`lp-card lp-feature accent-${item.accent}`}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
