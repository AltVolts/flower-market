# AGENTS.md

## Project

Russian-language flower/berry/mushroom shop storefront. Two independent apps with no shared tooling, no monorepo config, no CI, no tests, no linter, no typechecker.

## Structure

```
backend/    FastAPI + SQLAlchemy + SQLite (Python 3.11)
frontend/   React 18 + Vite + Tailwind CSS (plain JSX, not TypeScript)
```

No root `package.json` scripts. Each app is managed independently.

## Running locally

**Backend** (port 8000):
```bash
cd backend && source venv/bin/activate && uvicorn main:app --reload
```

**Frontend** (port 3000):
```bash
cd frontend && yarn dev
```

Frontend proxies `/api` to `http://localhost:8000` via Vite config (`frontend/vite.config.js`).

## Database

SQLite at `backend/flower_shop.db`. Tables are auto-created on backend startup (`Base.metadata.create_all`). No migration tool — schema changes require manual DB resets or ALTER TABLE. The `.db` file is gitignored.

## File uploads

Product images upload to `backend/uploads/` (gitignored). The uploads router (`backend/routers/products.py:57`) saves to disk with the original filename — no dedup, no validation, no virus scan.

## Admin panel

- URL: `/admin/login`
- Password: `admin123`
- Hardcoded — no env var, no auth library, no session tokens.

## Backend API

All routes prefixed `/api/`. Routers in `backend/routers/`:
- `products` — CRUD + image upload
- `categories` — CRUD + sort reordering
- `orders` — list, create, status update
- `settings` — key-value store (GET/PUT)

Pydantic v2 style (`model_dump()`, `from_attributes = True`). CORS is wide open (`allow_origins=["*"]`).

## Frontend

- React Router v6 with nested `<Routes>` — admin routes have a sidebar layout separate from public pages.
- Tailwind config adds custom colors (`primary`, `cream`, `warm`) and font families (`heading`, `body`).
- No state library — all data fetched via `frontend/src/api/client.js` using plain `fetch`.
- API base URL configured via `VITE_API_URL` env var (defaults to `/api` for local dev with Vite proxy).
- SPA routing: `frontend/public/_redirects` for Render static site.

## Gotchas

- No test suite exists. There is no `test`, `lint`, or `typecheck` script anywhere.
- `python-multipart` is required for FastAPI file uploads — it's in `requirements.txt` but easy to miss if adding new upload endpoints.
- Backend uses `shutil.copyfileobj` for uploads — no streaming, loads file into memory.
- `SiteSettings` router accepts raw `dict` input (not a Pydantic model) — unusual pattern.
- The root `package-lock.json` is empty (lockfileVersion 3 with no packages). Ignore it.
- `docker-compose` does not exist — only a `Dockerfile` in `backend/`.

## Deployment

Both services deploy to Render. Config in `render.yaml`:
- **Backend:** Docker service from `backend/Dockerfile`. Env var `FRONTEND_URL` for CORS.
- **Frontend:** Static site, built with `cd frontend && yarn install && yarn build`, served from `frontend/dist`. Env var `VITE_API_URL` points to backend.

After backend deploys, set `FRONTEND_URL` in Render dashboard. Then deploy frontend with `VITE_API_URL` set to backend URL.
