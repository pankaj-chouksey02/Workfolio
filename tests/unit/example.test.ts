import { formatCurrency, slugify } from '../../src/lib/utils';

describe('Utility functions', () => {
  it('formats currency correctly', () => {
    expect(formatCurrency(2400, 'USD')).toBe('$2,400');
  });

  it('generates URL-friendly slugs', () => {
    expect(slugify('Vessel of Ash & Quartz')).toBe('vessel-of-ash-and-quartz');
  });
});
