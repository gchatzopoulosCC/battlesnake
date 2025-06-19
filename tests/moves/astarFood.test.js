import {
  findClosestFood,
  seekFoodWithAstar,
  chainFoodWithAstar,
  smartFoodStrategy,
  shouldPrioritizeFood
} from "../../src/utils/moves/astarFood.js";
import { expect } from "@jest/globals";

describe("A* Food Seeking Strategies", () => {
  describe("findClosestFood function", () => {
    test("should find closest reachable food", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          food: [
            { x: 8, y: 8 }, // Far food
            { x: 2, y: 2 }  // Close food
          ],
          snakes: []
        },
        you: {
          head: { x: 0, y: 0 }
        }
      };

      const result = findClosestFood(gameState);

      expect(result).toBeTruthy();
      expect(result.target).toEqual({ x: 2, y: 2 });
      expect(result.path).toBeTruthy();
      expect(result.distance).toBeGreaterThan(0);
    });

    test("should return null when no food available", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          food: [],
          snakes: []
        },
        you: {
          head: { x: 0, y: 0 }
        }
      };

      const result = findClosestFood(gameState);
      expect(result).toBeNull();
    });

    test("should handle obstacles between snake and food", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          food: [{ x: 3, y: 0 }],
          snakes: [
            {
              body: [
                { x: 1, y: 0 }, // Block direct path
                { x: 1, y: 1 },
                { x: 1, y: 2 }
              ]
            }
          ]
        },
        you: {
          head: { x: 0, y: 0 }
        }
      };

      const result = findClosestFood(gameState);

      expect(result).toBeTruthy();
      expect(result.target).toEqual({ x: 3, y: 0 });
      // Path should be longer than direct route due to obstacle
      expect(result.distance).toBeGreaterThan(3);
    });
  });

  describe("seekFoodWithAstar function", () => {
    test("should seek food when health is low", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          food: [{ x: 1, y: 0 }],
          snakes: []
        },
        you: {
          head: { x: 0, y: 0 },
          health: 50 // Low health
        }
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true
      };

      const result = seekFoodWithAstar(gameState, isMoveSafe);
      expect(result).toBe("right");
    });

    test("should not seek food when health is high", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          food: [{ x: 1, y: 0 }],
          snakes: []
        },
        you: {
          head: { x: 0, y: 0 },
          health: 90 // High health
        }
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true
      };

      const result = seekFoodWithAstar(gameState, isMoveSafe);
      expect(result).toBeNull();
    });

    test("should respect safety constraints", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          food: [{ x: 1, y: 0 }],
          snakes: []
        },
        you: {
          head: { x: 0, y: 0 },
          health: 50
        }
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: false // Right is unsafe
      };

      const result = seekFoodWithAstar(gameState, isMoveSafe);
      expect(result).toBeNull(); // Should not suggest unsafe move
    });
  });

  describe("chainFoodWithAstar function", () => {
    test("should chain multiple food items when health is moderate", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          food: [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 }
          ],
          snakes: []
        },
        you: {
          head: { x: 0, y: 0 },
          health: 65 // Moderate health
        }
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true
      };

      const result = chainFoodWithAstar(gameState, isMoveSafe, 3);
      expect(result).toBe("right");
    });

    test("should not chain when health is too low", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          food: [
            { x: 1, y: 0 },
            { x: 2, y: 0 }
          ],
          snakes: []
        },
        you: {
          head: { x: 0, y: 0 },
          health: 40 // Too low for chaining
        }
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true
      };

      const result = chainFoodWithAstar(gameState, isMoveSafe);
      expect(result).toBeNull();
    });

    test("should not chain when health is too high", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          food: [
            { x: 1, y: 0 },
            { x: 2, y: 0 }
          ],
          snakes: []
        },
        you: {
          head: { x: 0, y: 0 },
          health: 95 // Too high for chaining
        }
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true
      };

      const result = chainFoodWithAstar(gameState, isMoveSafe);
      expect(result).toBeNull();
    });
  });

  describe("smartFoodStrategy function", () => {
    test("should prioritize immediate food when health is critical", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          food: [{ x: 1, y: 0 }],
          snakes: []
        },
        you: {
          head: { x: 0, y: 0 },
          health: 20 // Critical health
        }
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true
      };

      const result = smartFoodStrategy(gameState, isMoveSafe);
      expect(result).toBe("right");
    });

    test("should try chaining with moderate health and multiple food", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          food: [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 }
          ],
          snakes: []
        },
        you: {
          head: { x: 0, y: 0 },
          health: 60 // Moderate health
        }
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true
      };

      const result = smartFoodStrategy(gameState, isMoveSafe);
      expect(result).toBe("right");
    });

    test("should return null when health is high", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          food: [{ x: 1, y: 0 }],
          snakes: []
        },
        you: {
          head: { x: 0, y: 0 },
          health: 90 // High health
        }
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true
      };

      const result = smartFoodStrategy(gameState, isMoveSafe);
      expect(result).toBeNull();
    });
  });

  describe("shouldPrioritizeFood function", () => {
    test("should prioritize food when health is low and food is available", () => {
      const gameState = {
        board: {
          food: [{ x: 1, y: 0 }]
        },
        you: {
          health: 60
        }
      };

      expect(shouldPrioritizeFood(gameState)).toBe(true);
    });

    test("should not prioritize food when health is high", () => {
      const gameState = {
        board: {
          food: [{ x: 1, y: 0 }]
        },
        you: {
          health: 90
        }
      };

      expect(shouldPrioritizeFood(gameState)).toBe(false);
    });

    test("should not prioritize food when no food available", () => {
      const gameState = {
        board: {
          food: []
        },
        you: {
          health: 60
        }
      };

      expect(shouldPrioritizeFood(gameState)).toBe(false);
    });
  });
}); 