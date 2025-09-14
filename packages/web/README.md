## Web app

This example contains: 
* `html-webpack-plugin`
* `mini-css-extract-plugin`
* `webpack-plugin-serve`
* `webpack-nano`
* `babel-loader`
* `css-loader`
* `file-loader/url-loader` (for images and fonts)

### Running locally (as part of the self-contained fork)

Preferred: run from the repo root so the server and web start together:
```bash
yarn dev
```

The web dev server will listen on http://localhost:3000 and will fetch data from the GraphQL server at http://localhost:4000/graphql.

Environment variables:
- `WEB_PORT` (default: 3000)
- `GRAPHQL_URL` (default: http://localhost:4000/graphql)

Run web only (not typical):
```bash
yarn workspace @entria/web start
```
