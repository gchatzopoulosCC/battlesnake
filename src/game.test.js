import { info } from './game.js';
import { describe, it, expect } from '@jest/globals';

describe('Game API', () => {
  it('returns correct snake configuration', () => {
    const result = info();
    expect(result).toHaveProperty('apiversion');
    expect(result).toHaveProperty('author');
    expect(result).toHaveProperty('color');
    expect(result).toHaveProperty('head');
    expect(result).toHaveProperty('tail');
  });
});
