import { describe, it, expect } from 'vitest';
import { slugify, formatCurrency } from '../../../src/lib/utils';

describe('General Helper Utilities', () => {
  it('should format currency correctly', () => {
    const formatted = formatCurrency(4200, 'USD');
    expect(formatted).toContain('4,200');
  });

  it('should slugify title cleanly', () => {
    const slug = slugify('Tectonic Vessel No. 04');
    expect(slug).toBe('tectonic-vessel-no-04');
  });
});
