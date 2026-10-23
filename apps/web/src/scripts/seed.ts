import { getPayload } from 'payload'
import config from '../payload.config'

const payload = await getPayload({ config })

const email = process.env.SEED_ADMIN_EMAIL
const password = process.env.SEED_ADMIN_PASSWORD
if (email && password) {
  const users = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
  if (users.totalDocs === 0) {
    await payload.create({ collection: 'users', data: { email, password, name: 'Адміністратор' } })
    payload.logger.info(`Створено редактора ${email}`)
  }
}

await payload.updateGlobal({
  slug: 'site-settings',
  data: {
    brandName: 'Internship Tracker',
    nav: [
      { label: 'Можливості', href: '#features' },
      { label: 'Як це працює', href: '#steps' },
      { label: 'FAQ', href: '#faq' },
    ],
    socials: [
      { platform: 'telegram' as const, url: 'https://t.me/' },
      { platform: 'instagram' as const, url: 'https://www.instagram.com/' },
    ],
    footerText: '© 2026 Internship Tracker · Відстежуйте стажування легко',
    contactEmail: 'hello@example.com',
  },
})

const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1 })

const data = {
  title: 'Головна',
  slug: 'home',
  published: true,
  seo: {
    title: 'Internship Tracker — відстежуйте стажування',
    description: 'Усі IT-стажування в одному місці: вакансії з API, воронка відбору та збіг навичок.',
  },
  layout: [
    {
      blockType: 'hero' as const,
      label: 'Для студентів і початківців в IT',
      heading: 'Усі ваші стажування в одному місці',
      lead: 'Завантажуйте актуальні вакансії, відстежуйте етапи відбору та дізнавайтеся, яких навичок вам бракує для кожної позиції.',
      primaryCta: { label: 'Створити акаунт', href: '#contacts' },
      secondaryCta: { label: 'Як це працює', href: '#steps' },
      preview: {
        company: 'SoftServe',
        title: 'Python Internship',
        status: 'applied' as const,
        matchPercent: 67,
        skills: [
          { name: 'python', matched: true },
          { name: 'sql', matched: true },
          { name: 'docker', matched: false },
        ],
      },
    },
    {
      blockType: 'stats' as const,
      items: [
        { value: '9', label: 'категорій вакансій' },
        { value: '4', label: 'статуси відбору' },
        { value: '100%', label: 'без дублікатів' },
      ],
    },
    {
      blockType: 'features' as const,
      title: 'Що вміє трекер',
      items: [
        { title: 'Вакансії з API', text: 'Після входу вакансії всіх напрямків автоматично завантажаться з Jobicy та збережуться у вашому списку разом із вимогами.', accent: 'blue' as const },
        { title: 'Режим прогалин', text: 'Відмітьте свої навички в профілі, і для кожної вакансії буде видно, що вже збігається, а чого бракує.', accent: 'green' as const },
        { title: 'Воронка відбору', text: 'Змінюйте статус від «Знайдено» до «Зацікавило» і дивіться статистику та діаграму за потрібний період.', accent: 'violet' as const },
      ],
    },
    {
      blockType: 'steps' as const,
      title: 'Як це працює',
      items: [
        { title: 'Зареєструйтесь', text: 'Створіть акаунт за хвилину або спробуйте сайт як гість.' },
        { title: 'Отримайте вакансії', text: 'Вакансії всіх напрямків підтягнуться самі. Відсортуйте їх кнопкою «Сортувати».' },
        { title: 'Ведіть відбір', text: 'Відмічайте навички, змінюйте статуси й слідкуйте за прогресом.' },
      ],
    },
    {
      blockType: 'faq' as const,
      title: 'Часті запитання',
      items: [
        { question: 'Чи потрібна реєстрація?', answer: 'Ні, можна увійти як гість і переглянути автозавантажений список вакансій. Для заявок, нагадувань і статистики потрібен акаунт.' },
        { question: 'Звідки беруться вакансії?', answer: 'З відкритого Jobicy API за 9 категоріями: Python, QA, JavaScript, Java, DevOps, Data Science, .NET, PHP та C++.' },
        { question: 'Як рахується збіг навичок?', answer: 'Вимоги вакансії порівнюються з навичками вашого профілю; відсоток збігу показує, скільки вимог ви вже закриваєте.' },
      ],
    },
  ],
}

if (existing.docs[0]) {
  await payload.update({ collection: 'pages', id: existing.docs[0].id, data })
  payload.logger.info('Сторінку home оновлено')
} else {
  await payload.create({ collection: 'pages', data })
  payload.logger.info('Сторінку home створено')
}

process.exit(0)
