import type { BlockByType } from '@tracker/shared'

export function Stats({ block }: { block: BlockByType<'stats'> }) {
  return (
    <section className="lp-stats" aria-label="Ключові цифри">
      {block.items.map((item) => (
        <div key={item.label} className="lp-stat">
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </section>
  )
}
