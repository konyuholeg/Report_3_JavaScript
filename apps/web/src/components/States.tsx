import type { ApiError } from '@tracker/shared'

export function LandingSkeleton() {
  return (
    <div className="container" role="status" aria-live="polite" aria-label="Завантаження сторінки">
      <div className="sk sk-hero" />
      <div className="sk sk-title" />
      <div className="lp-grid">
        <div className="sk sk-card" />
        <div className="sk sk-card" />
        <div className="sk sk-card" />
      </div>
    </div>
  )
}

const TITLES: Record<ApiError['code'], string> = {
  not_found: 'Сторінку не знайдено',
  network: 'Немає зʼєднання',
  validation: 'Некоректний запит',
  duplicate: 'Дані вже існують',
  server: 'Щось пішло не так',
}

export function ErrorState({ error, onRetry }: { error: ApiError; onRetry: () => void }) {
  return (
    <div className="container">
      <div className="lp-card lp-error" role="alert">
        <h1>{TITLES[error.code]}</h1>
        <p>{error.message}</p>
        <div className="lp-actions">
          <button type="button" className="btn btn-primary" onClick={onRetry}>
            Спробувати ще раз
          </button>
          <a href="/" className="btn btn-outline">
            На головну
          </a>
        </div>
      </div>
    </div>
  )
}
