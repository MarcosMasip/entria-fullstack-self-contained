import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../src/database';
import UserModel from '../src/modules/user/UserModel';

async function run() {
  try {
    await connectDatabase();

    const count = await UserModel.countDocuments({});
    if (count > 0) {
      console.log(`Seed skipped: found ${count} users.`);
      await disconnectDatabase();
      process.exit(0);
    }

    const users = [
      { name: 'Ada Lovelace', email: 'ada@example.com', password: 'password' },
      { name: 'Alan Turing', email: 'alan@example.com', password: 'password' },
      { name: 'Grace Hopper', email: 'grace@example.com', password: 'password' },
    ];

    await UserModel.insertMany(users);

    const inserted = await UserModel.countDocuments({});
    console.log(`Seed complete: inserted ${inserted} users.`);

    await disconnectDatabase();
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    try { await disconnectDatabase(); } catch {}
    process.exit(1);
  }
}

run();
