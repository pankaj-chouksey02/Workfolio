import { describe, it, expect } from 'vitest';
import { Artwork } from '../../../src/models/Artwork';

describe('Artwork Model Schema', () => {
  it('should define required artwork properties', () => {
    expect(Artwork.schema.paths.title).toBeDefined();
    expect(Artwork.schema.paths.slug).toBeDefined();
    expect(Artwork.schema.paths.price).toBeDefined();
  });
});
