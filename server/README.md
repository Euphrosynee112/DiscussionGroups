# Pulse Fly Server

This backend serves the existing static HTML app and exposes a minimal Neon-backed API.

## Local development

1. Copy `server/.env.example` to `server/.env`
2. Put your Neon `DATABASE_URL` into `server/.env`
3. Install dependencies:
   - `cd server && npm install`
4. Start the server:
   - `npm run dev`

The app will be available at:

- `http://localhost:3000/`
- `http://localhost:3000/api/health`

## Current API

- `GET /api/health`
- `GET /api/storage/bootstrap`
- `GET /api/storage/:key`
- `PUT /api/storage/:key`
- `POST /api/storage/import`

## Fly.io deployment

Fly Launch can detect the root `Dockerfile`, create the app, and generate `fly.toml`.

Recommended first deploy flow:

1. Install `flyctl`
2. `fly auth login`
3. From the project root, run `fly launch`
4. Choose a region close to your users, for example Singapore
5. Skip Fly Postgres, Redis, and volumes because Neon is already the database
6. Set the secret:
   - `fly secrets set DATABASE_URL="your-neon-url"`
7. Deploy:
   - `fly deploy`

After deploy, the static pages and API will share the same Fly hostname, which avoids cross-origin issues for the first deployment.
