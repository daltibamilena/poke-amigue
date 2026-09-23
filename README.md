# PokeAmigue

A lightweight monorepo for a Pokémon encounter app with:

- NestJS API in `apps/api`
- React + Vite frontend in `apps/web`
- SQLite database with Prisma ORM
- JWT authentication with username/password login
- Protected encounter endpoint tied to the authenticated user

## Stack

- Backend: NestJS + TypeScript
- Database: SQLite + Prisma
- Frontend: React + Vite
- Auth: JWT + bcrypt password hashing

## Prerequisites

- Node.js 18+
- npm

## Setup

From the repo root:

```bash
npm install
```

### API setup

The API already includes the local SQLite config in `apps/api/.env`:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="dev-jwt-secret-change-me"
```

Generate Prisma client and apply the schema in one command:

```bash
npm run db:init
```

This script will:

- create an empty `apps/api/prisma/dev.db` file if it does not exist
- run `prisma generate`
- run `prisma migrate dev --name init`

## Running locally

Start both apps in separate terminals:

```bash
npm run dev:api
npm run dev:web
```

- API: http://localhost:3000
- Frontend: http://localhost:5173

## Auth flow

The frontend starts on the login page. Users can:

- login
- register a new account
- access the encounter page only after successful authentication

The backend exposes:

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (protected)
- `GET /pokemon/encounter/:environmentId` (protected)

## Encounter behavior

When a user triggers an encounter:

- a random encounter is generated
- the result is returned to the client
- the logged-in user id is saved with the encounter in the database

## Production build

```bash
npm run build
```

## Notes

- The frontend stores the JWT in localStorage.
- The API runs its SQLite database at `apps/api/prisma/dev.db`.
- Prisma migrations live under `apps/api/prisma/migrations`.
