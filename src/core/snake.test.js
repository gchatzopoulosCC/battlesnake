import { move } from './snake.js';
import { describe, it, expect } from '@jest/globals';

describe('Snake Movement', () => {
  const createGameState = (snakeBody) => ({
    game: { id: "game-id" },
    turn: 0,
    board: {
      height: 11,
      width: 11,
      food: [],
      snakes: []
    },
    you: {
      id: "snake-id",
      name: "test-snake",
      health: 100,
      body: snakeBody
    }
  });

  it('returns a valid move', () => {
    const gameState = createGameState([{ x: 5, y: 5 }]);
    const result = move(gameState);
    expect(result).toHaveProperty('move');
    expect(['up', 'down', 'left', 'right']).toContain(result.move);
  });
});