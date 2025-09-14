# Entria FullStack Playground — Self‑contained Fork
![supported version](https://badgen.net/badge/node/18%2B/green) ![platforms](https://badgen.net/badge/platform/macOS%20%7C%20Windows%20%7C%20Linux/blue)

This fork runs the full stack locally with zero external services by default. It’s a practical playground to learn and tinker with GraphQL + Relay: a Koa GraphQL server and a React + Relay client talking to an in‑memory MongoDB.

Original article about Playgrounds: https://medium.com/@sibelius/why-your-company-should-have-an-open-source-playground-4bb93068ce95

---

## What’s included

- GraphQL server (Koa, Relay-compliant schema, JWT auth, subscriptions)
- Web client (React + Relay, webpack dev server)
- In-memory MongoDB for development (no Mongo install required)
- One-command setup and one-command dev

---

## Prerequisites

- Node.js 18 or newer (tested on Node 24.x)
- Yarn Classic 1.x (this repo uses workspaces)
- Git

No MongoDB is required for development. Docker is optional.

---

## TL;DR — Quickstart

1) Install deps, generate schema, and seed demo data (safe to re-run)
```bash
yarn setup
```

2) Start everything (Relay compile → Server → Web)
```bash
yarn dev
```

You now have:
- GraphQL API: http://localhost:4000/graphql
- GraphiQL (browser IDE): http://localhost:4000/graphiql
- Web app (Relay client): http://localhost:3000

Notes
- The server uses an in-memory MongoDB. Restarting the server clears data.
- If you prefer a real MongoDB, set `MONGO_URL` and restart (see Configuration below).

---

## Hands‑on: copy‑paste walkthrough

Open GraphiQL: http://localhost:4000/graphiql

1) List users (empty initially if fresh server)
```graphql
{
	users(first: 10) {
		pageInfo { hasNextPage endCursor }
		edges { cursor node { id name email active } }
	}
}
```

2) Register users
Mutation:
```graphql
mutation Register($input: UserRegisterWithEmailInput!) {
	UserRegisterWithEmail(input: $input) { token error }
}
```
Variables:
```json
{ "input": { "name": "Ada Lovelace", "email": "ada@example.com", "password": "password" } }
```
Run again with different emails (e.g., `alan@example.com`, `grace@example.com`).

3) Subscribe to new users (open a new tab)
```graphql
subscription {
	UserAdded { userEdge { node { id name email } } }
}
```
Keep it running; re-run the Register mutation with a new email to see live updates.

4) Login and query me (auth)
Login:
```graphql
mutation Login($input: UserLoginWithEmailInput!) {
	UserLoginWithEmail(input: $input) { token error }
}
```
Variables:
```json
{ "input": { "email": "ada@example.com", "password": "password" } }
```
Copy the token and set HTTP Headers (per tab) to:
```json
{ "Authorization": "JWT YOUR_TOKEN_HERE" }
```
Me query:
```graphql
{ me { id name email active } }
```

5) See it in the UI
- Open http://localhost:3000 to view the Relay-powered list.

---

## Packages

- `@entria/server` — GraphQL server (Koa, JWT auth, Relay-compliant schema, subscriptions)
- `@entria/web` — React + Relay client

---

## Scripts (root)

- Setup (install → schema → seed)
```bash
yarn setup
```
- Dev (Relay compile once → server → web)
```bash
yarn dev
```
- Generate schema (if you change server schema)
```bash
yarn generate:schema
```
- Seed demo data (idempotent; skips if users exist)
```bash
yarn seed
```
- Start server only (memory DB)
```bash
yarn start:server:memory
```

---

## Configuration

Environment variables are optional—defaults are sensible:

- `MONGO_URL` — database URL
	- Default (dev): `memory` (in-memory MongoDB)
	- Example (real Mongo): `mongodb://localhost/your-db`
- `GRAPHQL_PORT` — GraphQL server port (default: `4000`)
- `JWT_KEY` — JWT signing secret (default: `secret_key`)
- `GRAPHQL_URL` (web) — client GraphQL endpoint (default: `http://localhost:4000/graphql`)
- `WEB_PORT` (web) — web dev server port (default: `3000`)

---

## Troubleshooting

- “Users list is empty after seed”
	- The server uses an in-memory DB per process. If you seeded earlier (a different process), the currently running server starts with a fresh DB. Create users via GraphQL (Register) or re-run `yarn seed` and keep the same server process running.

- macOS port 5000 already in use
	- This fork defaults to port 4000 to avoid macOS Control Center using 5000.

- Node 17+/24 OpenSSL error during web build
	- The web start script sets `NODE_OPTIONS=--openssl-legacy-provider` automatically.

- Auth headers
	- Use `Authorization: JWT <token>` (not Bearer). The login mutation returns the token already prefixed with `JWT `.

---

## What changed vs the original repo

- Self-contained by default: in-memory MongoDB with no external services
- One-command setup (`yarn setup`) and unified dev flow (`yarn dev`)
- Web dev server on port 3000; GraphQL on 4000 (was 5000)
- Schema generation made Node 24–friendly (no `esm`; uses `ts-node` at runtime)
- Removed dev pitfalls (no Relay DevTools dependency, added crypto compatibility for webpack)
- Documentation updated with copy‑paste steps and clear defaults

You can still point to a real MongoDB by setting `MONGO_URL`—the rest of the flow remains the same.

---

## Optional: Docker

Run with a real Mongo via docker-compose (server exposes port 4000):
```bash
docker-compose build && docker-compose up
```

---

## License

MIT
