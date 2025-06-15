import { avoidWalls } from "../../src/utils/moves/avoidWalls.js";
import { expect } from "@jest/globals";

describe("avoidWalls Points of Interest", () => {
  // POI #1: Snake at bottom-left corner - two wall constraints
  test("POI: Snake at bottom-left corner - down and left should be unsafe", () => {
    // Sample board with a snake at the bottom-left corner
    const gameState = {
      board: {
        width: 11,
        height: 11,
      },
      you: {
        head: { x: 0, y: 0 },
        body: [{ x: 0, y: 0 }],
      },
    };

    // Initial possible moves, all moves(directions) are allowed
    const possibleMoves = { up: true, down: true, left: true, right: true };

    // Apply the avoidWalls function to the game state and possible moves
    const safeMoves = avoidWalls(gameState, possibleMoves);

    // The snake would hit the wall if it moves left or down from bottom-left corner (0,0)
    expect(safeMoves.down).toBe(false);
    expect(safeMoves.left).toBe(false);

    // Up and right should still be safe
    expect(safeMoves.up).toBe(true);
    expect(safeMoves.right).toBe(true);
  });

  // POI #2: Snake in the middle - no wall constraints
  test("POI: Snake in the middle of the board - all directions should be safe", () => {
    // Snake is in the middle of the board
    const gameState = {
      board: {
        width: 11,
        height: 11,
      },
      you: {
        head: { x: 5, y: 5 },
        body: [{ x: 5, y: 5 }],
      },
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };

    const safeMoves = avoidWalls(gameState, possibleMoves);

    // If there is no wall collision, the possible moves should not be modified
    expect(safeMoves.up).toBe(true);
    expect(safeMoves.down).toBe(true);
    expect(safeMoves.left).toBe(true);
    expect(safeMoves.right).toBe(true);
  });

  // POI #3: Snake at top-right corner - two wall constraints
  test("POI: Snake at top-right corner - up and right should be unsafe", () => {
    // Snake is at the top-right corner
    const gameState = {
      board: {
        width: 11,
        height: 11,
      },
      you: {
        head: { x: 10, y: 10 },
        body: [{ x: 10, y: 10 }],
      },
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };

    const safeMoves = avoidWalls(gameState, possibleMoves);

    // The snake will hit the wall if it moves up or right when it is at the top-right corner
    expect(safeMoves.up).toBe(false);
    expect(safeMoves.right).toBe(false);

    // Down and left should still be safe
    expect(safeMoves.down).toBe(true);
    expect(safeMoves.left).toBe(true);
  });

  // POI #4: Snake at top edge - one wall constraint
  test("POI: Snake at top edge - up should be unsafe", () => {
    const gameState = {
      board: {
        width: 11,
        height: 11,
      },
      you: {
        head: { x: 5, y: 10 },
        body: [{ x: 5, y: 10 }],
      },
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };

    const safeMoves = avoidWalls(gameState, possibleMoves);

    // The snake will hit the wall if it moves up when at the top edge
    expect(safeMoves.up).toBe(false);

    // Other directions should be safe
    expect(safeMoves.down).toBe(true);
    expect(safeMoves.left).toBe(true);
    expect(safeMoves.right).toBe(true);
  });

  // POI #5: Snake at right edge - one wall constraint
  test("POI: Snake at right edge - right should be unsafe", () => {
    const gameState = {
      board: {
        width: 11,
        height: 11,
      },
      you: {
        head: { x: 10, y: 5 },
        body: [{ x: 10, y: 5 }],
      },
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };

    const safeMoves = avoidWalls(gameState, possibleMoves);

    // The snake will hit the wall if it moves right when at the right edge
    expect(safeMoves.right).toBe(false);

    // Other directions should be safe
    expect(safeMoves.up).toBe(true);
    expect(safeMoves.down).toBe(true);
    expect(safeMoves.left).toBe(true);
  });

  // POI #6: Snake at bottom edge - one wall constraint
  test("POI: Snake at bottom edge - down should be unsafe", () => {
    const gameState = {
      board: {
        width: 11,
        height: 11,
      },
      you: {
        head: { x: 5, y: 0 },
        body: [{ x: 5, y: 0 }],
      },
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };

    const safeMoves = avoidWalls(gameState, possibleMoves);

    // The snake will hit the wall if it moves down when at the bottom edge
    expect(safeMoves.down).toBe(false);

    // Other directions should be safe
    expect(safeMoves.up).toBe(true);
    expect(safeMoves.left).toBe(true);
    expect(safeMoves.right).toBe(true);
  });

  // POI #7: Snake at left edge - one wall constraint
  test("POI: Snake at left edge - left should be unsafe", () => {
    const gameState = {
      board: {
        width: 11,
        height: 11,
      },
      you: {
        head: { x: 0, y: 5 },
        body: [{ x: 0, y: 5 }],
      },
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };

    const safeMoves = avoidWalls(gameState, possibleMoves);

    // The snake will hit the wall if it moves left when at the left edge
    expect(safeMoves.left).toBe(false);

    // Other directions should be safe
    expect(safeMoves.up).toBe(true);
    expect(safeMoves.down).toBe(true);
    expect(safeMoves.right).toBe(true);
  });

  // POI #8: Snake one cell away from left wall - left should be safe
  test("POI: Snake one cell away from left wall - left should be safe", () => {
    const gameState = {
      board: { width: 11, height: 11 },
      you: { head: { x: 1, y: 5 }, body: [{ x: 1, y: 5 }] },
    };
    const possibleMoves = { up: true, down: true, left: true, right: true };
    const safeMoves = avoidWalls(gameState, possibleMoves);
    expect(safeMoves.left).toBe(true); // Still safe
  });
});
