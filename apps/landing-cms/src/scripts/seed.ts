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
  slug: 'common',
  data: {
    siteName: 'Internship Tracker',
    menu: [
      { label: 'Можливості', link: '#features' },
      { label: 'Як це працює', link: '#steps' },
      { label: 'FAQ', link: '#faq' },
    ],
    footer: { text: 'Відстежуйте стажування легко' },
  },
})

const data = {
  path: '/',
  title: 'Головна',
  blocks: [
    {
      blockType: 'hero' as const,
      anchor: 'top',
      badge: 'Для студентів і початківців в IT',
      title: 'Усі ваші стажування в одному місці',
      subtitle:
        'Завантажуйте актуальні вакансії, відстежуйте етапи відбору та дізнавайтеся, яких навичок вам бракує для кожної позиції.',
      buttons: [
        { text: 'Можливості', link: '#features', variant: 'primary' as const },
        { text: 'Як це працює', link: '#steps', variant: 'secondary' as const },
      ],
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
      anchor: 'features',
      title: 'Що вміє трекер',
      items: [
        { icon: 'search' as const, title: 'Вакансії з API', text: 'Після входу вакансії всіх напрямків автоматично завантажуються з Jobicy разом із вимогами.' },
        { icon: 'puzzle' as const, title: 'Режим прогалин', text: 'Відмітьте свої навички в профілі, і для кожної вакансії буде видно, чого бракує.' },
        { icon: 'chart' as const, title: 'Воронка відбору', text: 'Змінюйте статус від «Знайдено» до «Зацікавило» і дивіться статистику за період.' },
      ],
    },
    {
      blockType: 'steps' as const,
      anchor: 'steps',
      title: 'Як це працює',
      items: [
        { title: 'Зареєструйтесь', text: 'Створіть акаунт за хвилину або спробуйте сайт як гість.' },
        { title: 'Отримайте вакансії', text: 'Вакансії всіх напрямків підтягнуться самі.' },
        { title: 'Ведіть відбір', text: 'Відмічайте навички, змінюйте статуси й слідкуйте за прогресом.' },
      ],
    },
    {
      blockType: 'faq' as const,
      anchor: 'faq',
      title: 'Часті запитання',
      items: [
        { question: 'Чи потрібна реєстрація?', answer: 'Ні, можна увійти як гість і переглянути список вакансій. Для заявок, нагадувань і статистики потрібен акаунт.' },
        { question: 'Звідки беруться вакансії?', answer: 'З відкритого Jobicy API за 9 категоріями: Python, QA, JavaScript, Java, DevOps, Data Science, .NET, PHP та C++.' },
        { question: 'Як рахується збіг навичок?', answer: 'Вимоги вакансії порівнюються з навичками вашого профілю; відсоток показує, скільки вимог ви вже закриваєте.' },
      ],
    },
    {
      blockType: 'cta' as const,
      title: 'Почніть відстежувати стажування',
      text: 'Створіть акаунт і зберіть усі вакансії в одному списку.',
      buttonText: 'Створити акаунт',
      buttonLink: '#top',
    },
  ],
}

const existing = await payload.find({ collection: 'pages', where: { path: { equals: '/' } }, limit: 1 })

if (existing.docs[0]) {
  await payload.update({ collection: 'pages', id: existing.docs[0].id, data })
  payload.logger.info('Сторінку / оновлено')
} else {
  await payload.create({ collection: 'pages', data })
  payload.logger.info('Сторінку / створено')
}

process.exit(0)
