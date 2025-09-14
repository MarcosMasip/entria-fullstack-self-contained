import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { databaseConfig } from './config';

let mongoServer: MongoMemoryServer | null = null;

export async function connectDatabase() {
  return new Promise(async (resolve, reject) => {
    try {
      mongoose.Promise = global.Promise as any;
      mongoose.connection
        .on('error', error => reject(error))
        .on('close', () => console.log('Database connection closed.'))
        .once('open', () => resolve(mongoose.connections[0]));

      if (
        databaseConfig === 'memory' ||
        process.env.USE_IN_MEMORY_DB === 'true' ||
        process.env.USE_IN_MEMORY_DB === '1'
      ) {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri, {
          useNewUrlParser: true as any,
          useCreateIndex: true as any,
          useUnifiedTopology: true as any,
        } as any);
      } else {
        await mongoose.connect(databaseConfig as string, {
          useNewUrlParser: true as any,
          useCreateIndex: true as any,
          useUnifiedTopology: true as any,
        } as any);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
    mongoServer = null;
  }
}
