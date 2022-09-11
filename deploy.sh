#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка приложения
npm run build

cd dist

# инициализация репо и загрузка кода в github
git init
git add -A
git commit -m 'deploy'
git remote add origin https://github.com/cillic33/vue2-app.git
git push -f origin master:gh-pages

cd -

cmd /k
