import { connectToDatabase } from '../src/lib/db';

async function migrate() {
  console.log('🔄 Running migrations...');
  try {
    await connectToDatabase();
    console.log('✅ Connected to MongoDB. Schemas and indexes ensured.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

migrate();
