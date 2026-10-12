/**
 * User / Creator Model for MongoDB
 */

export interface IUserDocument {
  name: string;
  username: string;
  email: string;
  passwordHash?: string;
  bio?: string;
  discipline?: string;
  location?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  acceptingCommissions: boolean;
  socials?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  customization?: {
    theme?: string;
    fontPrimary?: string;
    accentColor?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// Fallback dynamic model loader for Next.js environments
let UserModel: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mongoose = require('mongoose');
  const UserSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      username: { type: String, required: true, unique: true, index: true },
      email: { type: String, required: true, unique: true, index: true },
      passwordHash: { type: String },
      bio: { type: String },
      discipline: { type: String },
      location: { type: String },
      avatarUrl: { type: String },
      bannerUrl: { type: String },
      acceptingCommissions: { type: Boolean, default: true },
      socials: {
        instagram: { type: String },
        twitter: { type: String },
        website: { type: String },
      },
      customization: {
        theme: { type: String, default: 'monograph' },
        fontPrimary: { type: String, default: 'Newsreader' },
        accentColor: { type: String, default: '#C25E3E' },
      },
    },
    { timestamps: true }
  );

  UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
} catch (e) {
  // Mongoose not yet installed, provide dummy interface
  UserModel = {
    find: async () => [],
    findOne: async () => null,
    create: async (data: any) => ({ ...data, _id: 'mock_id' }),
    deleteMany: async () => {},
  };
}

export const User = UserModel;
export default User;
