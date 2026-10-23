# Internship Tracker — лендинг (Payload CMS + Next.js + Neon + Vercel)

Fullstack-застосунок для розділу 2 звіту. Лендинг продукту «Internship Tracker» (Django-застосунок з розділу 1): контент редагується в Payload CMS, зберігається в Neon Postgres, розгортається на Vercel.

## Структура монорепозиторію (npm workspaces)

```
apps/web            Next.js 16 + Payload 3 (адмінка /admin, REST /api, клієнт /)
  src/collections   Pages, Media, Leads, Users
  src/blocks        hero, features, steps, stats, faq, cta
  src/globals       SiteSettings (бренд, навігація, футер)
  src/endpoints     кастомні API: GET /api/landing/:slug, POST /api/subscribe, GET /api/health
  src/components    рендер блоків, LeadForm, стани loading/error/ready
  src/migrations    SQL-міграції Postgres
packages/shared     спільні TypeScript-типи та type guards
```

## Локальний запуск

```bash
npm install
cp apps/web/.env.example apps/web/.env     # заповніть DATABASE_URL, PAYLOAD_SECRET
cd apps/web
npx payload migrate                        # застосувати міграції до Neon
npm run seed                               # адмін + сторінка home
cd ../.. && npm run dev                    # http://localhost:3000, адмінка /admin
```

## Деплой

1. **Neon**: створіть проєкт, у Connect скопіюйте *pooled* connection string -> `DATABASE_URL`.
2. **GitHub**: запуште репозиторій.
3. **Vercel**: Import Project, **Root Directory = `apps/web`**, Framework = Next.js.
   Змінні середовища: `DATABASE_URL`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN` (Storage -> Blob -> Create, підключіть до проєкту).
   Build Command: `npm run build` (виконує `payload migrate`, потім `next build`).
4. Один раз виконайте seed проти Neon локально: `npm run seed` з `.env`, що вказує на Neon.

## API

| Метод | Шлях | Опис |
|---|---|---|
| GET | `/api/landing/:slug` | сторінка з блоками + налаштування сайту (`ApiResult<LandingPage>`) |
| POST | `/api/subscribe` | збереження email (400 / 409 дубль / 201) |
| GET | `/api/health` | перевірка БД |

## Оновлення типів

Після зміни колекцій: `npm run generate:types`, `npm run generate:importmap`, `npx payload migrate:create <name>` (з каталогу `apps/web`).
