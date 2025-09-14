# Entria FullStack Playground (Self‑contained)
![supported version](https://badgen.net/badge/node/lts/green)

This fork focuses on being fully self-contained for local development on macOS, Windows, and Linux. No external APIs or services are needed by default.

Read more about Playgrounds: https://medium.com/@sibelius/why-your-company-should-have-an-open-source-playground-4bb93068ce95

## Quickstart

1) Install deps, generate schema, and seed demo data
```
yarn setup
```

2) Start everything (GraphQL server + Web app)
```
yarn dev
```

What you get:
- GraphQL server on http://localhost:4000/graphql (in-memory MongoDB by default)
- Web app on http://localhost:3000 (webpack dev server), already pointing to the local GraphQL endpoint

If you prefer a real MongoDB, set `MONGO_URL` accordingly and use the standard server start.

## Packages

- `@entria/server`: GraphQL server (Koa, Relay-compliant schema)
- `@entria/web`: Web client (React + Relay)

## Useful scripts

- Server memory mode (no external DB):
```
yarn start:server:memory
```

- Generate GraphQL schema files:
```
yarn generate:schema
```

- Seed demo data:
```
yarn seed
```

## Configuration

Environment variables are optional; sensible defaults are used if not provided.

- `MONGO_URL`: Database connection string
	- Default (dev): `memory` (uses in-memory MongoDB)
	- Example (real Mongo): `mongodb://localhost/your-db`
- `GRAPHQL_PORT`: Server port (default: `4000`)
- `JWT_KEY`: Secret for signing tokens (default: `secret_key`)
- `GRAPHQL_URL` (web only): URL for the client to reach the server GraphQL endpoint
	- Default: `http://localhost:4000/graphql`
- `WEB_PORT` (web only): Port for the webpack dev server (default: `3000`)

## Optional: Docker

You can still use the provided `docker-compose.yml` to run with a real MongoDB if desired:

```
docker-compose build && docker-compose up
```

## Notes

- The original structure and purpose are preserved; we've only added a dev-friendly memory DB, seeding, and one‑command startup.
- React Native app scripts remain but are outside of this self-contained flow.
