import { avoidGoingBackwards, avoidWalls, avoidOthers } from './move.js';
import { describe, it, expect } from '@jest/globals';

describe('avoidGoingBackwards', () => {
  test('should block the move that would go backwards', () => {
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 },
          { x: 4, y: 5 }, 
        ]
      }
    };
    const isMoveSafe = { up: true, down: true, left: true, right: true };
    avoidGoingBackwards(gameState, isMoveSafe);
    expect(isMoveSafe.left).toBe(false);
  });
});

describe('avoidWalls', () => {
  test('should mark moves that hit walls as unsafe', () => {
    const gameState = {
      board: { width: 11, height: 11 },
      you: { body: [{ x: 0, y: 0 }] }
    };
    const isMoveSafe = { up: true, down: true, left: true, right: true };
    avoidWalls(gameState, isMoveSafe);
    expect(isMoveSafe.left).toBe(false);
    expect(isMoveSafe.down).toBe(false);
  });
});

describe('avoidOthers', () => {
  test('should mark moves that hit other snakes as unsafe', () => {
    const gameState = {
      board: {
        snakes: [
          { id: 'me', body: [{ x: 5, y: 5 }] },
          { id: 'other', body: [{ x: 6, y: 5 }] }
        ]
      },
      you: {
        id: 'me',
        body: [{ x: 5, y: 5 }]
      }
    };
    const isMoveSafe = { up: true, down: true, left: true, right: true };
    avoidOthers(gameState, isMoveSafe);
    expect(isMoveSafe.right).toBe(false);
  });
});
