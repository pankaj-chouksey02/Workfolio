import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { Artwork } from '@/models/Artwork';
import { Collection } from '@/models/Collection';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    await connectToDatabase();

    // Clean existing seed records if in development
    if (process.env.NODE_ENV !== 'production') {
      await User.deleteMany({ email: 'elena@workfolio.art' });
      await Artwork.deleteMany({ 'creator.username': 'elenavance' });
      await Collection.deleteMany({ 'creator.username': 'elenavance' });
      console.log('🧹 Purged test seed data.');
    }

    // 1. Create Default Artist
    const artist = await User.create({
      name: 'Elena Vance',
      username: 'elenavance',
      email: 'elena@workfolio.art',
      bio: 'Contemporary ceramicist and sculptress exploring textural memory and archaic mineral glazes.',
      discipline: 'Ceramics & Sculpture',
      location: 'Kyoto / Berlin',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1600&q=80',
      acceptingCommissions: true,
      socials: {
        instagram: 'elenavance_art',
        twitter: 'elenavance',
        website: 'https://elenavance.studio',
      },
    });

    console.log(`✅ Seeded Artist: ${artist.name} (@${artist.username})`);

    // 2. Create Artworks
    const artworks = await Artwork.create([
      {
        title: 'Vessel of Ash & Quartz',
        slug: 'vessel-of-ash-and-quartz',
        creator: {
          id: artist._id,
          name: artist.name,
          username: artist.username,
        },
        description: 'Hand-thrown stoneware vessel treated with high-fire wood ash glaze and crushed quartz veins.',
        category: 'Sculpture',
        medium: 'Wood-fired Stoneware, Ash Glaze, Quartz',
        year: 2024,
        dimensions: { height: 42, width: 28, depth: 28, unit: 'cm' },
        price: 2400,
        currency: 'USD',
        status: 'available',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
            publicId: 'seed/vessel_1',
            isPrimary: true,
          },
        ],
        tags: ['Ceramics', 'Sculptural Vessel', 'Wood-fired'],
      },
      {
        title: 'Geological Memory Plate No. 4',
        slug: 'geological-memory-plate-no-4',
        creator: {
          id: artist._id,
          name: artist.name,
          username: artist.username,
        },
        description: 'Slab-built decorative plate displaying natural thermal fissures and raw basalt speckles.',
        category: 'Ceramics',
        medium: 'Basalt Clay & Feldspathic Glaze',
        year: 2024,
        dimensions: { height: 4, width: 38, depth: 38, unit: 'cm' },
        price: 1100,
        currency: 'USD',
        status: 'sold',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
            publicId: 'seed/plate_4',
            isPrimary: true,
          },
        ],
        tags: ['Plate', 'Basalt Clay', 'Feldspathic'],
      },
    ]);

    console.log(`✅ Seeded ${artworks.length} Artworks`);

    // 3. Create Collection
    await Collection.create({
      title: 'Lithic Resonances',
      slug: 'lithic-resonances',
      description: 'A study of tectonic forms, earthen patinas, and mineral decay.',
      creator: {
        id: artist._id,
        username: artist.username,
      },
      artworks: artworks.map((a: any) => a._id),
      coverImageUrl: artworks[0].images[0].url,
      isPublic: true,
    });

    console.log('✅ Seeded Collection: Lithic Resonances');
    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  }
}

seed();
