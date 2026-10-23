import type { ApplicationStatus, BlockByType } from '@tracker/shared'

const STATUS_LABEL: Record<ApplicationStatus, string> = {
  found: 'Знайдено',
  applied: 'Подано заявку',
  offer: 'Зацікавило',
  rejected: 'Відмова',
}

export function Hero({ block }: { block: BlockByType<'hero'> }) {
  const { preview } = block
  return (
    <section className="lp-hero" id="top">
      <div>
        <span className="lp-label">{block.label}</span>
        <h1>{block.heading}</h1>
        <p className="lp-lead">{block.lead}</p>
        <div className="lp-actions">
          <a href={block.primaryCta.href} className="btn lp-btn-light">
            {block.primaryCta.label}
          </a>
          {block.secondaryCta && (
            <a href={block.secondaryCta.href} className="btn lp-btn-ghost">
              {block.secondaryCta.label}
            </a>
          )}
        </div>
      </div>

      {preview && (
        <div className={`lp-preview st-${preview.status}`} aria-hidden="true">
          <div className="lp-preview-company">{preview.company}</div>
          <div className="lp-preview-title">{preview.title}</div>
          <div className="lp-preview-row">
            <span className={`badge badge-${preview.status}`}>{STATUS_LABEL[preview.status]}</span>
            <span className="badge badge-match">Збіг навичок: {preview.matchPercent}%</span>
          </div>
          <div className="lp-preview-skills">
            {preview.skills.map((s) => (
              <span key={s.name} className={`pill ${s.matched ? 'pill-match' : 'pill-miss'}`}>
                {s.name}
              </span>
            ))}
          </div>
          <div className="lp-bar">
            <span style={{ width: `${preview.matchPercent}%` }} />
          </div>
        </div>
      )}
    </section>
  )
}
