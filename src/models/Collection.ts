/**
 * Collection Model for MongoDB
 */

export interface ICollectionDocument {
  title: string;
  slug: string;
  description?: string;
  creator: {
    id: any;
    username: string;
  };
  artworks: any[];
  coverImageUrl?: string;
  isPublic: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

let CollectionModel: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mongoose = require('mongoose');
  const CollectionSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      slug: { type: String, required: true, unique: true, index: true },
      description: { type: String, default: '' },
      creator: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        username: { type: String, required: true },
      },
      artworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }],
      coverImageUrl: { type: String },
      isPublic: { type: Boolean, default: true },
    },
    { timestamps: true }
  );

  CollectionModel = mongoose.models.Collection || mongoose.model('Collection', CollectionSchema);
} catch (e) {
  CollectionModel = {
    find: async () => [],
    findOne: async () => null,
    create: async (data: any) => ({ ...data, _id: 'mock_collection_id' }),
    deleteMany: async () => {},
  };
}

export const Collection = CollectionModel;
export default Collection;
