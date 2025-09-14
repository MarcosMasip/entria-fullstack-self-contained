/* eslint-disable no-console */
// Make this script Node 24–friendly by using CommonJS and ts-node to import the TypeScript schema
require('ts-node/register/transpile-only');
try {
  require('tsconfig-paths/register');
} catch (_) {
  // optional
}

const fs = require('fs');
const path = require('path');
const { graphql, getIntrospectionQuery, printSchema } = require('graphql');
const { schema } = require('../src/schema');

async function main() {
  // Write human-readable schema SDL
  const sdlPath = path.join(__dirname, '../data/schema.graphql');
  fs.writeFileSync(sdlPath, printSchema(schema));

  // Write introspection JSON for Relay, etc.
  const result = await graphql({ schema, source: getIntrospectionQuery() });
  if (result.errors) {
    console.error('ERROR introspecting schema: ', JSON.stringify(result.errors, null, 2));
    process.exitCode = 1;
    return;
  }
  const jsonPath = path.join(__dirname, '../data/schema.json');
  fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
