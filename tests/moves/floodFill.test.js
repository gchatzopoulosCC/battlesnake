import { floodFill } from "../../src/helper/moves/floodFill.js";
import { expect } from "@jest/globals";

describe("floodFill Algorithm", () => {
  describe("Basic functionality", () => {
    test("1. should count all reachable cells in an empty board", () => {
      const gameState = {
        board: {
          width: 3,
          height: 3,
          snakes: [],
          food: []
        },
        you: {
          head: { x: 1, y: 1 },
          body: [{ x: 1, y: 1 }]
        }
      };

      const result = floodFill(gameState);

      // From center position (1,1) in a 3x3 board, each direction should reach the same 8 cells
      // (total 9 cells - 1 occupied by head = 8 reachable cells)
      expect(result.up).toBe(8);
      expect(result.down).toBe(8);
      expect(result.left).toBe(8);
      expect(result.right).toBe(8);
    });

    test("2. should return 0 for moves that would hit walls", () => {
      const gameState = {
        board: {
          width: 3,
          height: 3,
          snakes: [],
          food: []
        },
        you: {
          head: { x: 0, y: 0 }, // Bottom-left corner
          body: [{ x: 0, y: 0 }]
        }
      };

      const result = floodFill(gameState);

      // Moves blocked by walls should return 0
      expect(result.down).toBe(0);
      expect(result.left).toBe(0);
      
      // Valid moves should return accessible cells
      expect(result.up).toBeGreaterThan(0);
      expect(result.right).toBeGreaterThan(0);
    });
  });

  describe("Snake body obstacles", () => {
    test("3. should not count cells occupied by snake bodies", () => {
      const gameState = {
        board: {
          width: 5,
          height: 5,
          snakes: [
            {
              id: "enemy",
              body: [
                { x: 2, y: 3 },
                { x: 2, y: 2 },
                { x: 2, y: 1 }
              ]
            }
          ],
          food: []
        },
        you: {
          id: "me",
          head: { x: 1, y: 2 },
          body: [
            { x: 1, y: 2 },
            { x: 0, y: 2 },
            { x: 0, y: 1 }
          ]
        }
      };

      const result = floodFill(gameState);

      // Right move leads to enemy snake, should have limited space
      expect(result.right).toBeLessThan(result.up);
      expect(result.right).toBeLessThan(result.down);
    });

    test("4. should identify trapped positions", () => {
      const gameState = {
        board: {
          width: 5,
          height: 5,
          snakes: []
        },
        you: {
          head: { x: 2, y: 2 },
          body: [
            { x: 2, y: 2 }, // Head
            { x: 2, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
            { x: 1, y: 3 },
            { x: 2, y: 3 },
            { x: 3, y: 3 },
            { x: 3, y: 2 },
            { x: 3, y: 1 } // Tail - completely surrounds the head
          ]
        }
      };

      const result = floodFill(gameState);

      // All moves should have very limited space due to complete self-encirclement
      expect(result.up).toBe(0);    // Blocked by body
      expect(result.down).toBe(0);  // Blocked by body
      expect(result.left).toBe(0);  // Blocked by body
      expect(result.right).toBe(0); // Blocked by body
    });
  });

  describe("Complex scenarios", () => {
    test("5. should prefer moves with more available space", () => {
      const gameState = {
        board: {
          width: 7,
          height: 7,
          snakes: [
            {
              id: "enemy",
              body: [
                { x: 3, y: 0 },
                { x: 3, y: 1 },
                { x: 3, y: 2 },
                { x: 3, y: 3 },
                { x: 3, y: 4 }
              ]
            }
          ],
          food: []
        },
        you: {
          head: { x: 2, y: 3 },
          body: [{ x: 2, y: 3 }]
        }
      };

      const result = floodFill(gameState);

      // Left side has more space than right (blocked by enemy snake)
      expect(result.left).toBeGreaterThan(result.right);
    });

    test("6. should handle board edges correctly", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          snakes: [],
          food: []
        },
        you: {
          head: { x: 10, y: 10 }, // Top-right corner
          body: [{ x: 10, y: 10 }]
        }
      };

      const result = floodFill(gameState);

      // Should calculate available space for valid moves
      expect(result.down).toBeGreaterThan(0);
      expect(result.left).toBeGreaterThan(0);
      expect(result.up).toBe(0);
      expect(result.right).toBe(0);
    });

    test("7. should consider food as passable cells", () => {
      const gameState = {
        board: {
          width: 5,
          height: 5,
          snakes: [],
          food: [
            { x: 2, y: 2 },
            { x: 3, y: 2 },
            { x: 4, y: 2 }
          ]
        },
        you: {
          head: { x: 1, y: 2 },
          body: [{ x: 1, y: 2 }]
        }
      };

      const result = floodFill(gameState);

      // Food cells should be counted as accessible
      expect(result.right).toBeGreaterThan(20); // Most of the board is accessible
    });
  });

  describe("Performance and edge cases", () => {
    test("8. should handle large boards efficiently", () => {
      const gameState = {
        board: {
          width: 19,
          height: 19,
          snakes: [],
          food: []
        },
        you: {
          head: { x: 9, y: 9 },
          body: [{ x: 9, y: 9 }]
        }
      };

      const startTime = Date.now();
      const result = floodFill(gameState);
      const endTime = Date.now();

      // Should complete within reasonable time (less than 100ms)
      expect(endTime - startTime).toBeLessThan(100);
      
      // Should calculate correct number of accessible cells
      expect(result.up).toBe(360); // 19x19 - 1 (head position) = 360
    });

    test("9. should handle single cell snake correctly", () => {
      const gameState = {
        board: {
          width: 3,
          height: 3,
          snakes: [],
          food: []
        },
        you: {
          head: { x: 1, y: 1 },
          body: [{ x: 1, y: 1 }] // Single cell snake
        }
      };

      const result = floodFill(gameState);

      // All moves should have same accessible space (8 cells in 3x3 grid minus head position)
      expect(result.up).toBe(8);
      expect(result.down).toBe(8);
      expect(result.left).toBe(8);
      expect(result.right).toBe(8);
    });
  });
}); 