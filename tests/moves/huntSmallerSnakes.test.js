import {
  huntSmallerSnakes,
  shouldPrioritizeHunting,
} from "../../src/utils/moves/huntSmallerSnakes.js";
import { expect } from "@jest/globals";

describe("huntSmallerSnakes", () => {
  describe("Basic hunting scenarios", () => {
    test("should return null when no other snakes exist", () => {
      const gameState = {
        you: {
          id: "our-snake",
          head: { x: 5, y: 5 },
          body: [
            { x: 5, y: 5 },
            { x: 5, y: 6 },
            { x: 5, y: 7 },
          ],
          length: 3,
          health: 80,
        },
        board: {
          width: 11,
          height: 11,
          snakes: [
            // Only our snake
            {
              id: "our-snake",
              head: { x: 5, y: 5 },
              body: [
                { x: 5, y: 5 },
                { x: 5, y: 6 },
                { x: 5, y: 7 },
              ],
              length: 3,
            },
          ],
        },
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true,
      };

      const result = huntSmallerSnakes(gameState, isMoveSafe);
      expect(result).toBeNull();
    });

    test("should hunt a smaller snake to the right", () => {
      const gameState = {
        you: {
          id: "our-snake",
          head: { x: 5, y: 5 },
          body: [
            { x: 5, y: 5 },
            { x: 5, y: 6 },
            { x: 5, y: 7 },
            { x: 5, y: 8 },
          ],
          length: 4,
          health: 80,
        },
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
                { x: 5, y: 8 },
              ],
              length: 4,
            },
            {
              id: "smaller-snake",
              head: { x: 8, y: 5 },
              body: [
                { x: 8, y: 5 },
                { x: 9, y: 5 },
              ],
              length: 2,
            },
          ],
        },
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true,
      };

      const result = huntSmallerSnakes(gameState, isMoveSafe);
      expect(result).toBe("right");
    });

    test("should not hunt larger snakes", () => {
      const gameState = {
        you: {
          id: "our-snake",
          head: { x: 5, y: 5 },
          body: [
            { x: 5, y: 5 },
            { x: 5, y: 6 },
          ],
          length: 2,
          health: 80,
        },
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
              ],
              length: 2,
            },
            {
              id: "larger-snake",
              head: { x: 8, y: 5 },
              body: [
                { x: 8, y: 5 },
                { x: 9, y: 5 },
                { x: 10, y: 5 },
              ],
              length: 3,
            },
          ],
        },
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true,
      };

      const result = huntSmallerSnakes(gameState, isMoveSafe);
      expect(result).toBeNull();
    });
  });

  describe("Multiple smaller snakes", () => {
    test("should hunt the closest smaller snake", () => {
      const gameState = {
        you: {
          id: "our-snake",
          head: { x: 5, y: 5 },
          body: [
            { x: 5, y: 5 },
            { x: 5, y: 6 },
            { x: 5, y: 7 },
            { x: 5, y: 8 },
          ],
          length: 4,
          health: 80,
        },
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
                { x: 5, y: 8 },
              ],
              length: 4,
            },
            {
              id: "far-snake",
              head: { x: 10, y: 10 },
              body: [
                { x: 10, y: 10 },
                { x: 10, y: 9 },
              ],
              length: 2,
            },
            {
              id: "close-snake",
              head: { x: 6, y: 5 },
              body: [
                { x: 6, y: 5 },
                { x: 7, y: 5 },
              ],
              length: 2,
            },
          ],
        },
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true,
      };

      const result = huntSmallerSnakes(gameState, isMoveSafe);
      expect(result).toBe("right"); // Should move towards the closer snake
    });
  });

  describe("Safety constraints", () => {
    test("should not suggest unsafe moves", () => {
      const gameState = {
        you: {
          id: "our-snake",
          head: { x: 5, y: 5 },
          body: [
            { x: 5, y: 5 },
            { x: 5, y: 6 },
            { x: 5, y: 7 },
            { x: 5, y: 8 },
          ],
          length: 4,
          health: 80,
        },
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
              ],
              length: 4,
            },
            {
              id: "smaller-snake",
              head: { x: 6, y: 5 },
              body: [
                { x: 6, y: 5 },
                { x: 7, y: 5 },
              ],
              length: 2,
            },
          ],
        },
      };

      const isMoveSafe = {
        up: false, // Blocked by our body
        down: true,
        left: true,
        right: false, // Blocked by wall or other obstacle
      };

      const result = huntSmallerSnakes(gameState, isMoveSafe);
      expect(result).not.toBe("right");
      expect(result).not.toBe("up");
    });

    test("should return null if no safe moves towards target", () => {
      const gameState = {
        you: {
          id: "our-snake",
          head: { x: 5, y: 5 },
          body: [
            { x: 5, y: 5 },
            { x: 5, y: 6 },
            { x: 5, y: 7 },
          ],
          length: 3,
          health: 80,
        },
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
              ],
              length: 3,
            },
            {
              id: "smaller-snake",
              head: { x: 8, y: 8 },
              body: [
                { x: 8, y: 8 },
                { x: 9, y: 8 },
              ],
              length: 2,
            },
          ],
        },
      };

      const isMoveSafe = {
        up: false,
        down: false,
        left: false,
        right: false,
      };

      const result = huntSmallerSnakes(gameState, isMoveSafe);
      expect(result).toBeNull();
    });
  });

  describe("Interception behavior", () => {
    test("should attempt to intercept when very close to target", () => {
      const gameState = {
        you: {
          id: "our-snake",
          head: { x: 5, y: 5 },
          body: [
            { x: 5, y: 5 },
            { x: 5, y: 6 },
            { x: 5, y: 7 },
            { x: 5, y: 8 },
          ],
          length: 4,
          health: 80,
        },
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
                { x: 5, y: 8 },
              ],
              length: 4,
            },
            {
              id: "smaller-snake",
              head: { x: 6, y: 5 }, // Adjacent to us
              body: [
                { x: 6, y: 5 },
                { x: 7, y: 5 },
              ],
              length: 2,
            },
          ],
        },
      };

      const isMoveSafe = {
        up: true,
        down: true,
        left: true,
        right: true,
      };

      const result = huntSmallerSnakes(gameState, isMoveSafe);
      expect(result).toBeTruthy(); // Should return a move
    });
  });
});

describe("shouldPrioritizeHunting", () => {
  test("should not hunt when health is low", () => {
    const gameState = {
      you: {
        health: 25, // Low health
        length: 5,
      },
      board: {
        snakes: [
          { id: "our-snake", length: 5 },
          { id: "smaller-snake", length: 2 },
        ],
      },
    };

    expect(shouldPrioritizeHunting(gameState)).toBe(false);
  });

  test("should not hunt when snake is too small", () => {
    const gameState = {
      you: {
        health: 80,
        length: 2, // Too small
      },
      board: {
        snakes: [
          { id: "our-snake", length: 2 },
          { id: "smaller-snake", length: 1 },
        ],
      },
    };

    expect(shouldPrioritizeHunting(gameState)).toBe(false);
  });

  test("should hunt when conditions are favorable", () => {
    const gameState = {
      you: {
        id: "our-snake",
        health: 80,
        length: 5,
      },
      board: {
        snakes: [
          { id: "our-snake", length: 5 },
          { id: "smaller-snake", length: 2 }, // Significantly smaller
        ],
      },
    };

    expect(shouldPrioritizeHunting(gameState)).toBe(true);
  });

  test("should not hunt when size difference is too small", () => {
    const gameState = {
      you: {
        id: "our-snake",
        health: 80,
        length: 5,
      },
      board: {
        snakes: [
          { id: "our-snake", length: 5 },
          { id: "smaller-snake", length: 4 }, // Only 1 size difference
        ],
      },
    };

    expect(shouldPrioritizeHunting(gameState)).toBe(false);
  });
});

describe("Board Boundary Edge Cases", () => {
  test("POI: Target snake near board edge - hunting should consider boundaries", () => {
    const gameState = {
      you: {
        id: "our-snake",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 },
          { x: 5, y: 6 },
          { x: 5, y: 7 },
          { x: 5, y: 8 },
        ],
        length: 4,
        health: 80,
      },
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
              { x: 5, y: 8 },
            ],
            length: 4,
          },
          {
            id: "target-near-edge",
            head: { x: 10, y: 5 }, // At right edge
            body: [
              { x: 10, y: 5 },
              { x: 9, y: 5 },
            ],
            length: 2,
          },
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    const result = huntSmallerSnakes(gameState, isMoveSafe);
    expect(result).toBe("right"); // Should still pursue towards edge
  });

  test("POI: Our snake near edge while hunting - boundary constraints", () => {
    const gameState = {
      you: {
        id: "our-snake",
        head: { x: 0, y: 5 }, // At left edge
        body: [
          { x: 0, y: 5 },
          { x: 1, y: 5 },
          { x: 2, y: 5 },
          { x: 3, y: 5 },
        ],
        length: 4, // Changed from 3 to 4 to make target worthwhile
        health: 80,
      },
      board: {
        width: 11,
        height: 11,
        snakes: [
          {
            id: "our-snake",
            head: { x: 0, y: 5 },
            body: [
              { x: 0, y: 5 },
              { x: 1, y: 5 },
              { x: 2, y: 5 },
              { x: 3, y: 5 },
            ],
            length: 4, // Changed from 3 to 4
          },
          {
            id: "smaller-target",
            head: { x: 3, y: 6 },
            body: [
              { x: 3, y: 6 },
              { x: 4, y: 6 },
            ],
            length: 2,
          },
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: false, // Wall
      right: true,
    };

    const result = huntSmallerSnakes(gameState, isMoveSafe);
    expect(result).toBeTruthy(); // Should find a valid hunt move despite boundary
    expect(result).not.toBe("left"); // Should not suggest wall move
  });

  test("POI: Target in corner - limited escape routes", () => {
    const gameState = {
      you: {
        id: "our-snake",
        head: { x: 2, y: 2 },
        body: [
          { x: 2, y: 2 },
          { x: 3, y: 2 },
          { x: 4, y: 2 },
          { x: 5, y: 2 },
        ],
        length: 4, // Changed from 3 to 4 to make target worthwhile
        health: 80,
      },
      board: {
        width: 11,
        height: 11,
        snakes: [
          {
            id: "our-snake",
            head: { x: 2, y: 2 },
            body: [
              { x: 2, y: 2 },
              { x: 3, y: 2 },
              { x: 4, y: 2 },
              { x: 5, y: 2 },
            ],
            length: 4, // Changed from 3 to 4
          },
          {
            id: "cornered-target",
            head: { x: 0, y: 0 }, // In corner
            body: [
              { x: 0, y: 0 },
              { x: 0, y: 1 },
            ],
            length: 2,
          },
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    const result = huntSmallerSnakes(gameState, isMoveSafe);
    expect(["left", "down"]).toContain(result); // Should move towards corner
  });
});

describe("Complex Multi-Snake Scenarios", () => {
  test("POI: Hunting while avoiding larger snakes - priority conflicts", () => {
    const gameState = {
      you: {
        id: "our-snake",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 },
          { x: 5, y: 6 },
          { x: 5, y: 7 },
          { x: 5, y: 8 },
        ],
        length: 4, // Changed from 3 to 4 to make target worthwhile
        health: 80,
      },
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
              { x: 5, y: 8 },
            ],
            length: 4, // Changed from 3 to 4
          },
          {
            id: "larger-threat",
            head: { x: 4, y: 5 },
            body: [
              { x: 4, y: 5 },
              { x: 4, y: 6 },
              { x: 4, y: 7 },
              { x: 4, y: 8 },
            ],
            length: 4,
          },
          {
            id: "smaller-target",
            head: { x: 6, y: 5 },
            body: [
              { x: 6, y: 5 },
              { x: 7, y: 5 },
            ],
            length: 2,
          },
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: false, // Blocked by larger snake
      right: true,
    };

    const result = huntSmallerSnakes(gameState, isMoveSafe);
    expect(result).toBe("right"); // Should hunt but avoid larger snake
  });

  test("POI: Multiple smaller targets with different threat levels", () => {
    const gameState = {
      you: {
        id: "our-snake",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 },
          { x: 5, y: 6 },
          { x: 5, y: 7 },
          { x: 5, y: 8 },
          { x: 5, y: 9 },
        ],
        length: 5,
        health: 80,
      },
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
              { x: 5, y: 8 },
              { x: 5, y: 9 },
            ],
            length: 5,
          },
          {
            id: "safe-target",
            head: { x: 7, y: 5 },
            body: [
              { x: 7, y: 5 },
              { x: 8, y: 5 },
            ],
            length: 2,
          },
          {
            id: "risky-target",
            head: { x: 3, y: 5 },
            body: [
              { x: 3, y: 5 },
              { x: 2, y: 5 },
              { x: 1, y: 5 },
            ],
            length: 3, // Bigger but still huntable
          },
          {
            id: "medium-close",
            head: { x: 6, y: 6 },
            body: [
              { x: 6, y: 6 },
              { x: 7, y: 6 },
            ],
            length: 2,
          },
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    const result = huntSmallerSnakes(gameState, isMoveSafe);
    expect(result).toBeTruthy(); // Should pick a target
  });
});

describe("Food and Growth Edge Cases", () => {
  test("POI: Target snake just ate food and grew - size changes mid-hunt", () => {
    const gameState = {
      you: {
        id: "our-snake",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 },
          { x: 5, y: 6 },
          { x: 5, y: 7 },
          { x: 5, y: 8 },
        ],
        length: 4, // Changed from 3 to 4 to make target worthwhile
        health: 80,
      },
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
              { x: 5, y: 8 },
            ],
            length: 4, // Changed from 3 to 4
          },
          {
            id: "growing-snake",
            head: { x: 7, y: 5 },
            body: [
              { x: 7, y: 5 },
              { x: 8, y: 5 },
            ],
            length: 2, // Still smaller, but might grow
          },
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    const result = huntSmallerSnakes(gameState, isMoveSafe);
    expect(result).toBe("right"); // Should still hunt based on current size
  });

  test("POI: Food between us and target - hunger vs hunting priority", () => {
    const gameState = {
      you: {
        id: "our-snake",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 },
          { x: 5, y: 6 },
          { x: 5, y: 7 },
        ],
        length: 3,
        health: 25, // Low health, near threshold
      },
      board: {
        width: 11,
        height: 11,
        food: [
          { x: 6, y: 5 }, // Food between us and target
        ],
        snakes: [
          {
            id: "our-snake",
            head: { x: 5, y: 5 },
            body: [
              { x: 5, y: 5 },
              { x: 5, y: 6 },
              { x: 5, y: 7 },
            ],
            length: 3,
          },
          {
            id: "smaller-target",
            head: { x: 8, y: 5 },
            body: [
              { x: 8, y: 5 },
              { x: 9, y: 5 },
            ],
            length: 2,
          },
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    expect(shouldPrioritizeHunting(gameState)).toBe(false);
    const result = huntSmallerSnakes(gameState, isMoveSafe);
    expect(result).toBeNull(); // Should not hunt when health is too low
  });
});

describe("Tail and Body Dynamics", () => {
  test("POI: Target tail movement - safe to occupy after move", () => {
    const gameState = {
      you: {
        id: "our-snake",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 },
          { x: 5, y: 6 },
          { x: 5, y: 7 },
        ],
        length: 3,
        health: 80,
      },
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
            ],
            length: 3,
          },
          {
            id: "target-snake",
            head: { x: 6, y: 5 },
            body: [
              { x: 6, y: 5 },
              { x: 7, y: 5 },
              { x: 8, y: 5 }, // Tail will move
            ],
            length: 3,
          },
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    const result = huntSmallerSnakes(gameState, isMoveSafe);
    expect(result).toBeNull(); // Corrected: Should not hunt an equal-sized snake
  });

  test("POI: Our own tail considerations during hunt", () => {
    const gameState = {
      you: {
        id: "our-snake",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 },
          { x: 4, y: 5 },
          { x: 3, y: 5 },
          { x: 3, y: 6 },
          { x: 4, y: 6 },
        ],
        length: 5,
        health: 80,
      },
      board: {
        width: 11,
        height: 11,
        snakes: [
          {
            id: "our-snake",
            head: { x: 5, y: 5 },
            body: [
              { x: 5, y: 5 },
              { x: 4, y: 5 },
              { x: 3, y: 5 },
              { x: 3, y: 6 },
              { x: 4, y: 6 },
            ],
            length: 5,
          },
          {
            id: "smaller-target",
            head: { x: 6, y: 5 },
            body: [
              { x: 6, y: 5 },
              { x: 7, y: 5 },
            ],
            length: 2,
          },
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: false,
      left: false,
      right: true,
    };

    const result = huntSmallerSnakes(gameState, isMoveSafe);
    expect(["up", "right"]).toContain(result);
  });
});

describe("Turn-Based Prediction Edge Cases", () => {
  test("POI: Target has multiple escape routes - prediction complexity", () => {
    const gameState = {
      you: {
        id: "our-snake",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 },
          { x: 5, y: 6 },
          { x: 5, y: 7 },
          { x: 5, y: 8 },
        ],
        length: 4,
        health: 80,
      },
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
              { x: 5, y: 8 },
            ],
            length: 4,
          },
          {
            id: "elusive-target",
            head: { x: 7, y: 5 },
            body: [
              { x: 7, y: 5 },
              { x: 8, y: 5 },
            ],
            length: 2,
          },
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    const result = huntSmallerSnakes(gameState, isMoveSafe);
    expect(result).toBeTruthy(); // Should attempt interception
  });

  test("POI: Simultaneous movement conflicts - close proximity", () => {
    const gameState = {
      you: {
        id: "our-snake",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 },
          { x: 5, y: 6 },
          { x: 5, y: 7 },
          { x: 5, y: 8 },
        ],
        length: 4, // Changed from 3 to 4 to make target worthwhile
        health: 80,
      },
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
              { x: 5, y: 8 },
            ],
            length: 4, // Changed from 3 to 4
          },
          {
            id: "adjacent-target",
            head: { x: 6, y: 5 },
            body: [
              { x: 6, y: 5 },
              { x: 7, y: 5 },
            ],
            length: 2,
          },
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    const result = huntSmallerSnakes(gameState, isMoveSafe);
    expect(result).toBeTruthy(); // Should predict interception
  });
});

describe("Health and Survival Edge Cases", () => {
  test("POI: Health dropping during hunt - threshold conditions", () => {
    const gameState = {
      you: {
        id: "our-snake",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 },
          { x: 5, y: 6 },
          { x: 5, y: 7 },
          { x: 5, y: 8 },
        ],
        length: 4, // Changed from 3 to 4 to make target worthwhile
        health: 31, // Just above threshold
      },
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
              { x: 5, y: 8 },
            ],
            length: 4, // Changed from 3 to 4
          },
          {
            id: "smaller-target",
            head: { x: 7, y: 5 },
            body: [
              { x: 7, y: 5 },
              { x: 8, y: 5 },
            ],
            length: 2,
          },
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    expect(shouldPrioritizeHunting(gameState)).toBe(true);
    const result = huntSmallerSnakes(gameState, isMoveSafe);
    expect(result).toBe("right");

    // Test at threshold
    gameState.you.health = 30;
    expect(shouldPrioritizeHunting(gameState)).toBe(true); // At threshold
  });

  test("POI: Multiple hunting opportunities - optimal target selection", () => {
    const gameState = {
      you: {
        id: "our-snake",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 },
          { x: 5, y: 6 },
          { x: 5, y: 7 },
          { x: 5, y: 8 },
          { x: 5, y: 9 },
        ],
        length: 5,
        health: 80,
      },
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
              { x: 5, y: 8 },
              { x: 5, y: 9 },
            ],
            length: 5,
          },
          {
            id: "far-easy-target",
            head: { x: 10, y: 10 },
            body: [
              { x: 10, y: 10 },
              { x: 10, y: 9 },
            ],
            length: 2,
          },
          {
            id: "close-harder-target",
            head: { x: 6, y: 5 },
            body: [
              { x: 6, y: 5 },
              { x: 7, y: 5 },
              { x: 8, y: 5 },
            ],
            length: 3,
          },
          {
            id: "medium-close",
            head: { x: 7, y: 7 },
            body: [
              { x: 7, y: 7 },
              { x: 8, y: 7 },
            ],
            length: 2,
          },
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    const result = huntSmallerSnakes(gameState, isMoveSafe);
    expect(result).toBe("right"); // Should choose closest huntable target
  });
});
