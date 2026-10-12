/**
 * MongoDB Connection Handler with Global Connection Caching
 * Optimized for Next.js App Router & Serverless environments
 */

type MongoConnection = {
  conn: any | null;
  promise: Promise<any> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: MongoConnection | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/workfolio';

let cached: MongoConnection = global.mongooseConnection || {
  conn: null,
  promise: null,
};

if (!global.mongooseConnection) {
  global.mongooseConnection = cached;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Dynamically attempt mongoose connection if installed, otherwise provide client interface
    cached.promise = import('mongoose')
      .then((mongoose) => {
        return mongoose.default.connect(MONGODB_URI, opts).then((m) => m);
      })
      .catch((err) => {
        console.warn('Mongoose package not installed yet. Please run: npm install mongoose');
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export const connectDB = connectToDatabase;
export default connectToDatabase;
