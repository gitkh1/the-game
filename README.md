# Necromancer

![GitHub language count](https://img.shields.io/github/languages/count/gitkh1/the-game) ![GitHub top language](https://img.shields.io/github/languages/top/gitkh1/the-game) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/gitkh1/the-game)

Браузерная игра о борьбе добра со злом

## Технологиии, которые использованы в проекте

- React
- Redux Toolkit
- Canvas
- Material UI
- SASS modules
- Service Worker
- Lerna

## Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn setup-hosts` - для пользователей windows запустить терминал от имени администратора
4. Выполните команду `yarn dev` чтобы запустить клиент и server
5. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
6. Выполните команду `yarn dev --scope=server` чтобы запустить только server

## Как запускать в режиме разработки?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn run database:start` чтобы запустить только базу данных
3. Выполните команду `yarn dev --scope=server` чтобы запустить только server

## Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

## Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

## Линтинг

`yarn lint`

## Форматирование prettier

`yarn format`

## Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify`

## Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере

Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса

1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`
