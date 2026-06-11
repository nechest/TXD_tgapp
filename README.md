# PostgreSQL Exam Prep

Мобильный MVP Telegram Mini App для подготовки к экзамену по PostgreSQL.

## Что внутри

- 8 учебных модулей по материалам лекций `01.pdf`–`12.pdf`
- краткая теория, термины, синтаксис, SQL-примеры и типичные ошибки
- 24 практических задания с объяснениями
- общий тест на 10 вопросов
- экзамен на 10 вопросов с тремя уровнями сложности
- прогресс, результаты и избранные ошибки в `localStorage`

## Стек

- Vite
- React
- TypeScript
- React Router
- Vitest
- ESLint

Backend в MVP не используется.

Telegram-бот запускается отдельным Node.js сервером из `bot/server.mjs`. На `/start`
он отправляет кнопку открытия Mini App и настраивает постоянную кнопку меню бота.

Для контейнерного хостинга используйте `Dockerfile`: он собирает frontend и запускает
HTTP-сервер вместе с Telegram long polling на порту `3000`.

Для изменения внутреннего порта используйте `APP_PORT`. Переменная `PORT` намеренно
не используется, поскольку некоторые бот-хостинги подставляют в неё служебное значение.

## Запуск

```bash
npm install
npm run dev
```

Запуск Mini App и Telegram-бота:

```bash
cp .env.example .env
# заполните BOT_TOKEN и APP_BASE_URL
npm run start:telegram
```

Проверки:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Структура

- `src/data/course.ts` — учебный контент
- `src/types/course.ts` — типы курса и прогресса
- `src/context/ProgressContext.tsx` — localStorage и действия пользователя
- `src/pages` — основные экраны
- `src/components` — общие UI-компоненты
- `src/styles.css` — мобильная тёмная тема
