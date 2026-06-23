# Цветы Марий Эл

Сайт-витрина для микробизнеса по продаже цветов, ягод и грибов.

## Стек технологий

- **Фронтенд:** React 18, Tailwind CSS
- **Бэкенд:** FastAPI, SQLAlchemy, SQLite
- **Деплой:** Vercel (фронтенд), Render (бэкенд)

## Запуск локально

### Бэкенд

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Фронтенд

```bash
cd frontend
yarn install
yarn dev
```

## Админ-панель

- URL: `/admin/login`
- Пароль: `admin123`

## Деплой

### Render (бэкенд)

1. Создайте аккаунт на render.com
2. Создайте новый Web Service
3. Подключите GitHub репозиторий
4. Настройте:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Vercel (фронтенд)

1. Создайте аккаунт на vercel.com
2. Импортируйте GitHub репозиторий
3. Настройте:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `yarn build`
   - Output Directory: `dist`
