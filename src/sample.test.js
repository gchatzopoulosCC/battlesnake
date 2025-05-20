import { move } from '../src/core/snake.js';

describe('Battlesnake Move Logic', () => {
  test('should return a valid move', () => {
    const gameState = {
      game: { id: "game-id" },
      turn: 1,
      board: {
        height: 11,
        width: 11,
        food: [],
        snakes: [],
      },
      you: {
        id: "snake-id",
        body: [{ x: 5, y: 5 }],
        head: { x: 5, y: 5 },
        health: 100,
      },
    };

    const response = move(gameState);
    expect(["up", "down", "left", "right"]).toContain(response.move);
  });
});
