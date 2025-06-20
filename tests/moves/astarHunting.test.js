import {
  huntWithAstar,
  shouldUseAstarHunting,
  enhancedHuntingStrategy
} from "../../src/utils/moves/astarHunting.js";
import { expect } from "@jest/globals";

describe("A* Hunting Strategies", () => {
  describe("huntWithAstar function", () => {
    test("should hunt smaller snake when conditions are met", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          snakes: [
            {
              id: "our-snake",
              head: { x: 0, y: 0 },
              body: [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 },
                { x: 0, y: 3 }
              ],
              length: 4
            },
            {
              id: "target-snake",
              head: { x: 2, y: 0 },
              body: [
                { x: 2, y: 0 },
                { x: 3, y: 0 }
              ],
              length: 2
            }
          ]
        },
        you: {
          id: "our-snake",
          head: { x: 0, y: 0 },
          body: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 }
          ],
          length: 4,
          health: 80
        }
      };

      const result = huntWithAstar(gameState);
      expect(result).toBe("right");
    });

    test("should not hunt when health is too low", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          snakes: [
            {
              id: "our-snake",
              head: { x: 0, y: 0 },
              body: [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 },
                { x: 0, y: 3 }
              ],
              length: 4
            },
            {
              id: "target-snake",
              head: { x: 2, y: 0 },
              body: [
                { x: 2, y: 0 },
                { x: 3, y: 0 }
              ],
              length: 2
            }
          ]
        },
        you: {
          id: "our-snake",
          head: { x: 0, y: 0 },
          body: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 }
          ],
          length: 4,
          health: 20 // Too low
        }
      };

      const result = huntWithAstar(gameState);
      expect(result).toBeNull();
    });

    test("should not hunt when snake is too small", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          snakes: [
            {
              id: "our-snake",
              head: { x: 0, y: 0 },
              body: [
                { x: 0, y: 0 },
                { x: 0, y: 1 }
              ],
              length: 2
            },
            {
              id: "target-snake",
              head: { x: 2, y: 0 },
              body: [
                { x: 2, y: 0 },
                { x: 3, y: 0 }
              ],
              length: 2
            }
          ]
        },
        you: {
          id: "our-snake",
          head: { x: 0, y: 0 },
          body: [
            { x: 0, y: 0 },
            { x: 0, y: 1 }
          ],
          length: 2, // Too small
          health: 80
        }
      };

      const result = huntWithAstar(gameState);
      expect(result).toBeNull();
    });

    test("should handle obstacles in hunting path", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          snakes: [
            {
              id: "our-snake",
              head: { x: 0, y: 0 },
              body: [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 },
                { x: 0, y: 3 }
              ],
              length: 4
            },
            {
              id: "target-snake",
              head: { x: 2, y: 0 },
              body: [
                { x: 2, y: 0 },
                { x: 3, y: 0 }
              ],
              length: 2
            },
            {
              id: "obstacle",
              head: { x: 4, y: 6 },
              body: [
                { x: 4, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 }
              ],
              length: 3,
            },
          ]
        },
        you: {
          id: "our-snake",
          head: { x: 0, y: 0 },
          body: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 }
          ],
          length: 4,
          health: 80
        }
      };

      const result = huntWithAstar(gameState);
      // Should find a path around the obstacle
      expect(result).toBeTruthy();
      expect(typeof result).toBe("string");
    });
  });

  describe("shouldUseAstarHunting function", () => {
    test("should return true when conditions are favorable", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          snakes: [
            {
              id: "our-snake",
              health: 100,
              length: 5,
              head: { x: 1, y: 1 },
              body: [{ x: 1, y: 1 }],
            },
            {
              id: "target-snake",
              health: 100,
              length: 3,
              head: { x: 3, y: 3 },
              body: [{ x: 3, y: 3 }],
            },
          ],
        },
        you: {
          id: "our-snake",
          health: 100,
          length: 5,
          head: { x: 1, y: 1 },
          body: [{ x: 1, y: 1 }],
        },
      };
      expect(shouldUseAstarHunting(gameState)).toBe(true);
    });

    test("should return false when health is too low", () => {
      const gameState = {
        board: {
          snakes: [
            {
              id: "our-snake",
              length: 5
            },
            {
              id: "target-snake",
              length: 2
            }
          ]
        },
        you: {
          id: "our-snake",
          health: 20, // Too low
          length: 5
        }
      };

      expect(shouldUseAstarHunting(gameState)).toBe(false);
    });

    test("should return false when snake is too small", () => {
      const gameState = {
        board: {
          snakes: [
            {
              id: "our-snake",
              length: 2
            },
            {
              id: "target-snake",
              length: 1
            }
          ]
        },
        you: {
          id: "our-snake",
          health: 80,
          length: 2 // Too small
        }
      };

      expect(shouldUseAstarHunting(gameState)).toBe(false);
    });

    test("should return false when no huntable targets", () => {
      const gameState = {
        board: {
          snakes: [
            {
              id: "our-snake",
              length: 3
            },
            {
              id: "larger-snake",
              length: 5 // Larger than us
            }
          ]
        },
        you: {
          id: "our-snake",
          health: 80,
          length: 3
        }
      };

      expect(shouldUseAstarHunting(gameState)).toBe(false);
    });
  });

  describe("enhancedHuntingStrategy function", () => {
    test("should return hunting move when safe", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          snakes: [
            {
              id: "our-snake",
              head: { x: 0, y: 0 },
              body: [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 },
                { x: 0, y: 3 }
              ],
              length: 4
            },
            {
              id: "target-snake",
              head: { x: 2, y: 0 },
              body: [
                { x: 2, y: 0 },
                { x: 3, y: 0 }
              ],
              length: 2
            }
          ]
        },
        you: {
          id: "our-snake",
          head: { x: 0, y: 0 },
          body: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 }
          ],
          length: 4,
          health: 80
        }
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true
      };

      const result = enhancedHuntingStrategy(gameState, isMoveSafe);
      expect(result).toBe("right");
    });

    test("should return null when A* suggests unsafe move", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          snakes: [
            {
              id: "our-snake",
              head: { x: 0, y: 0 },
              body: [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 },
                { x: 0, y: 3 }
              ],
              length: 4
            },
            {
              id: "target-snake",
              head: { x: 2, y: 0 },
              body: [
                { x: 2, y: 0 },
                { x: 3, y: 0 }
              ],
              length: 2
            }
          ]
        },
        you: {
          id: "our-snake",
          head: { x: 0, y: 0 },
          body: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 }
          ],
          length: 4,
          health: 80
        }
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: false // A* might suggest right, but it's unsafe
      };

      const result = enhancedHuntingStrategy(gameState, isMoveSafe);
      expect(result).toBeNull();
    });

    test("should return null when hunting conditions not met", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          snakes: [
            {
              id: "our-snake",
              head: { x: 0, y: 0 },
              body: [
                { x: 0, y: 0 },
                { x: 0, y: 1 }
              ],
              length: 2
            }
          ]
        },
        you: {
          id: "our-snake",
          head: { x: 0, y: 0 },
          body: [
            { x: 0, y: 0 },
            { x: 0, y: 1 }
          ],
          length: 2,
          health: 20 // Low health and no targets
        }
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true
      };

      const result = enhancedHuntingStrategy(gameState, isMoveSafe);
      expect(result).toBeNull();
    });
  });

  describe("Edge cases and integration", () => {


    test("should prioritize closest target when multiple targets available", () => {
      const gameState = {
        board: {
          width: 11,
          height: 11,
          snakes: [
            {
              id: "our-snake",
              head: { x: 5, y: 5 },
              body: [
                { x: 5, y: 5 },
                { x: 5, y: 6 },
                { x: 5, y: 7 },
                { x: 5, y: 8 }
              ],
              length: 4
            },
            {
              id: "close-target",
              head: { x: 6, y: 5 },
              body: [
                { x: 6, y: 5 },
                { x: 7, y: 5 }
              ],
              length: 2
            },
            {
              id: "far-target",
              head: { x: 10, y: 10 },
              body: [
                { x: 10, y: 10 },
                { x: 10, y: 9 }
              ],
              length: 2
            }
          ]
        },
        you: {
          id: "our-snake",
          head: { x: 5, y: 5 },
          body: [
            { x: 5, y: 5 },
            { x: 5, y: 6 },
            { x: 5, y: 7 },
            { x: 5, y: 8 }
          ],
          length: 4,
          health: 80
        }
      };

      const result = huntWithAstar(gameState);
      expect(result).toBe("down"); // A* correctly finds that going down is the start of the shortest path
    });
  });
}); 