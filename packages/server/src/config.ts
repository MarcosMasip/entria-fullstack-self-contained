import path from 'path';
import fs from 'fs';
import dotenvSafe from 'dotenv-safe';

const root = path.join.bind(this, __dirname, '../');

// Attempt to load environment from .env if present, but don't require it
try {
  const envPath = root('.env');
  const examplePath = root('.env.example');
  if (fs.existsSync(envPath) && fs.existsSync(examplePath)) {
    dotenvSafe.config({
      path: envPath,
      sample: examplePath,
    });
  }
} catch (err) {
  // ignore dotenv errors and proceed with sane defaults
}

const ENV = process.env;

// Database Settings
// Default to in-memory DB for development if MONGO_URL is not provided
const dBdevelopment = ENV.MONGO_URL || 'memory';
const dBproduction = ENV.MONGO_URL || 'mongodb://localhost/database';

// Test Database Settings
// const test = 'mongodb://localhost/awesome-test';

// Export DB Settings
export const databaseConfig = ENV.NODE_ENV === 'production' ? dBproduction : dBdevelopment;

// Export GraphQL Server settings (default to 4000 to avoid macOS using 5000)
export const graphqlPort = Number(ENV.GRAPHQL_PORT) || 4000;
export const jwtSecret = ENV.JWT_KEY || 'secret_key';
