import { describe, it, expect } from 'vitest';
import { User } from '../../../src/models/User';

describe('User Model Schema', () => {
  it('should define required fields', () => {
    expect(User.schema.paths.name).toBeDefined();
    expect(User.schema.paths.email).toBeDefined();
    expect(User.schema.paths.username).toBeDefined();
  });
});
