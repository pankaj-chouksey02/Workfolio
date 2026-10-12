import { describe, it, expect } from 'vitest';
import { getOptimizedImageUrl } from '../../../src/lib/cloudinary';

describe('Cloudinary Service & Utilities', () => {
  it('should generate transformation url correctly', () => {
    const url = getOptimizedImageUrl('test-sample', { width: 400, height: 300, quality: 'auto' });
    expect(url).toContain('upload/w_400,h_300,q_auto,f_auto/test-sample');
  });
});
