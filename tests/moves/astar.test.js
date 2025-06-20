import { 
  findPath, 
  findMultipleFoodPath,
  findBestHuntingPath,
  heuristic,
  getNeighbors,
  reconstructPath
} from "../../src/utils/pathfinding/astar.js";
import { expect } from "@jest/globals";

describe("A* Pathfinding Algorithm", () => {
  describe("heuristic function", () => {
    test("should calculate Manhattan distance correctly", () => {
      const start = { x: 0, y: 0 };
      const goal = { x: 3, y: 4 };
      expect(heuristic(start, goal)).toBe(7);
    });

    test("should return 0 for same position", () => {
      const pos = { x: 5, y: 5 };
      expect(heuristic(pos, pos)).toBe(0);
    });
  });

  describe("getNeighbors function", () => {
    test("should return valid neighbors within board bounds", () => {
      const gameState = {
        board: { 
          width: 11, 
          height: 11,
          snakes: []
        }
      };
      const position = { x: 5, y: 5 };
      const neighbors = getNeighbors(position, gameState);
      
      expect(neighbors).toHaveLength(4);
      expect(neighbors).toContainEqual({ x: 4, y: 5 });
      expect(neighbors).toContainEqual({ x: 6, y: 5 });
      expect(neighbors).toContainEqual({ x: 5, y: 4 });
      expect(neighbors).toContainEqual({ x: 5, y: 6 });
    });

    test("should exclude neighbors outside board bounds", () => {
      const gameState = {
        board: { 
          width: 11, 
          height: 11,
          snakes: []
        }
      };
      const position = { x: 0, y: 0 }; // Corner position
      const neighbors = getNeighbors(position, gameState);
      
      expect(neighbors).toHaveLength(2);
      expect(neighbors).toContainEqual({ x: 1, y: 0 });
      expect(neighbors).toContainEqual({ x: 0, y: 1 });
    });

    test("should exclude neighbors that contain snake bodies", () => {
      const gameState = {
        board: { 
          width: 11, 
          height: 11,
          snakes: [
            {
              body: [
                { x: 4, y: 5 }, // Block left neighbor
                { x: 6, y: 5 }  // Block right neighbor
              ]
            }
          ]
        }
      };
      const position = { x: 5, y: 5 };
      const neighbors = getNeighbors(position, gameState);
      
      expect(neighbors).toHaveLength(2);
      expect(neighbors).toContainEqual({ x: 5, y: 4 });
      expect(neighbors).toContainEqual({ x: 5, y: 6 });
    });
  });

  describe("reconstructPath function", () => {
    test("should reconstruct path correctly", () => {
      const cameFrom = new Map();
      cameFrom.set("1,1", { x: 0, y: 1 });
      cameFrom.set("0,1", { x: 0, y: 0 });
      
      const path = reconstructPath(cameFrom, { x: 1, y: 1 });
      
      expect(path).toEqual([
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
      ]);
    });
  });

  describe("findPath function", () => {
    test("should find direct path when no obstacles", () => {
      const gameState = {
        board: { 
          width: 11, 
          height: 11,
          snakes: []
        }
      };
      const start = { x: 0, y: 0 };
      const goal = { x: 2, y: 0 };
      
      const path = findPath(start, goal, gameState);
      
      expect(path).toBeTruthy();
      expect(path[0]).toEqual(start);
      expect(path[path.length - 1]).toEqual(goal);
      expect(path).toHaveLength(3);
    });

    test("should return null when no path exists", () => {
      // Create a scenario where goal is completely surrounded
      const gameState = {
        board: { 
          width: 11, 
          height: 11,
          snakes: [
            {
              body: [
                { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 },
                { x: 4, y: 5 }, { x: 6, y: 5 },
                { x: 4, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 }
              ]
            }
          ]
        }
      };
      const start = { x: 0, y: 0 };
      const goal = { x: 5, y: 5 }; // Completely surrounded
      
      const path = findPath(start, goal, gameState);
      expect(path).toBeNull();
    });

    test("should find path around obstacles", () => {
      const gameState = {
        board: { 
          width: 11, 
          height: 11,
          snakes: [
            {
              body: [
                { x: 1, y: 0 }, // Block direct path
                { x: 1, y: 1 },
                { x: 1, y: 2 }
              ]
            }
          ]
        }
      };
      const start = { x: 0, y: 1 };
      const goal = { x: 2, y: 1 };
      
      const path = findPath(start, goal, gameState);
      
      expect(path).toBeTruthy();
      expect(path[0]).toEqual(start);
      expect(path[path.length - 1]).toEqual(goal);
      // Should go around the obstacle
      expect(path.length).toBeGreaterThan(3);
    });
  });

  describe("findMultipleFoodPath function", () => {
    test("should find optimal path to visit multiple food items", () => {
      const gameState = {
        board: { 
          width: 11, 
          height: 11,
          food: [
            { x: 2, y: 2 },
            { x: 5, y: 5 },
            { x: 8, y: 8 }
          ],
          snakes: []
        },
        you: {
          head: { x: 0, y: 0 }
        }
      };
      
      const result = findMultipleFoodPath(gameState, 3);
      
      expect(result).toBeTruthy();
      expect(result.path).toBeTruthy();
      expect(result.foodOrder).toHaveLength(3);
      expect(result.totalDistance).toBeGreaterThan(0);
    });

    test("should handle case with no food on board", () => {
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
      
      const result = findMultipleFoodPath(gameState, 3);
      expect(result).toBeNull();
    });

    test("should limit food targets when requested", () => {
      const gameState = {
        board: { 
          width: 11, 
          height: 11,
          food: [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
            { x: 4, y: 4 },
            { x: 5, y: 5 }
          ],
          snakes: []
        },
        you: {
          head: { x: 0, y: 0 }
        }
      };
      
      const result = findMultipleFoodPath(gameState, 2);
      
      expect(result).toBeTruthy();
      expect(result.foodOrder).toHaveLength(2);
    });
  });

  describe("findBestHuntingPath function", () => {
    test("should find path to hunt smaller snake", () => {
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
              head: { x: 5, y: 5 },
              body: [
                { x: 5, y: 5 },
                { x: 5, y: 6 }
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
      
      const result = findBestHuntingPath(gameState);
      
      expect(result).toBeTruthy();
      expect(result.path).toBeTruthy();
      expect(result.target).toBeTruthy();
      expect(result.target.id).toBe("target-snake");
    });

    test("should return null when no huntable targets", () => {
      const gameState = {
        board: { 
          width: 11, 
          height: 11,
          snakes: [
            {
              id: "our-snake",
              head: { x: 0, y: 0 },
              body: [{ x: 0, y: 0 }, { x: 0, y: 1 }],
              length: 2
            },
            {
              id: "larger-snake",
              head: { x: 5, y: 5 },
              body: [
                { x: 5, y: 5 },
                { x: 5, y: 6 },
                { x: 5, y: 7 },
                { x: 5, y: 8 }
              ],
              length: 4
            }
          ]
        },
        you: {
          id: "our-snake",
          head: { x: 0, y: 0 },
          length: 2
        }
      };
      
      const result = findBestHuntingPath(gameState);
      expect(result).toBeNull();
    });

    test("should prefer closer targets when multiple options exist", () => {
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
              body: [{ x: 6, y: 5 }, { x: 7, y: 5 }],
              length: 2
            },
            {
              id: "far-target",
              head: { x: 10, y: 10 },
              body: [{ x: 10, y: 10 }, { x: 10, y: 9 }],
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
      
      const result = findBestHuntingPath(gameState);
      
      expect(result).toBeTruthy();
      expect(result.target.id).toBe("close-target");
    });
  });

  describe("Integration with existing moves", () => {
    test("should provide safe moves that avoid walls and bodies", () => {
      const gameState = {
        board: { 
          width: 5, 
          height: 5,
          snakes: [
            {
              id: "our-snake",
              head: { x: 1, y: 1 },
              body: [
                { x: 1, y: 1 },
                { x: 1, y: 2 },
                { x: 1, y: 3 }
              ],
              length: 3
            }
          ]
        },
        you: {
          id: "our-snake",
          head: { x: 1, y: 1 }
        }
      };
      
      const neighbors = getNeighbors({ x: 1, y: 1 }, gameState);
      
      // Should not include positions with our own body
      expect(neighbors).not.toContainEqual({ x: 1, y: 2 });
      // Should not include positions outside board
      expect(neighbors.every(pos => 
        pos.x >= 0 && pos.x < 5 && pos.y >= 0 && pos.y < 5
      )).toBe(true);
    });
  });
}); 