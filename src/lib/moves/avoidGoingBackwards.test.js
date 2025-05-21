import { avoidGoingBackwards } from "./avoidGoingBackwards.js";
import { expect } from "@jest/globals";

describe("avoidGoingBackwards Points of Interest", () => {
  // POI #1: Snake moving right - shouldn't go left
  test("POI: Snake moving right - left should be unsafe", () => {
    // Snake moving right (neck is behind, to the left of head)
    const gameState = {
      you: {
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // Head
          { x: 4, y: 5 }, // Neck is to the left
          { x: 3, y: 5 }, // Rest of body
        ],
      },
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };

    // Apply avoidGoingBackwards function
    avoidGoingBackwards(gameState, possibleMoves);

    // Should not be able to move left, to its neck
    expect(possibleMoves.left).toBe(false);

    // Other directions should still be safe
    expect(possibleMoves.up).toBe(true);
    expect(possibleMoves.down).toBe(true);
    expect(possibleMoves.right).toBe(true);
  });

  // POI #2: Snake moving left - shouldn't go right
  test("POI: Snake moving left - right should be unsafe", () => {
    // Snake moving left (neck is behind, to the right of head)
    const gameState = {
      you: {
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // Head
          { x: 6, y: 5 }, // Neck is to the right
          { x: 7, y: 5 }, // Rest of body
        ],
      },
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };

    // Apply avoidGoingBackwards function
    avoidGoingBackwards(gameState, possibleMoves);

    // Should not be able to move right, to its neck
    expect(possibleMoves.right).toBe(false);

    // Other directions should still be safe
    expect(possibleMoves.up).toBe(true);
    expect(possibleMoves.down).toBe(true);
    expect(possibleMoves.left).toBe(true);
  });

  // POI #3: Snake moving up - shouldn't go down
  test("POI: Snake moving up - down should be unsafe", () => {
    // Snake moving up (neck is below head)
    const gameState = {
      you: {
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // Head
          { x: 5, y: 4 }, // Neck is below
          { x: 5, y: 3 }, // Rest of body
        ],
      },
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };

    // Apply avoidGoingBackwards function
    avoidGoingBackwards(gameState, possibleMoves);

    // Should not be able to move down, to its neck
    expect(possibleMoves.down).toBe(false);

    // Other directions should still be safe
    expect(possibleMoves.up).toBe(true);
    expect(possibleMoves.left).toBe(true);
    expect(possibleMoves.right).toBe(true);
  });

  // POI #4: Snake moving down - shouldn't go up
  test("POI: Snake moving down - up should be unsafe", () => {
    // Snake moving down (neck is above head)
    const gameState = {
      you: {
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // Head
          { x: 5, y: 6 }, // Neck is above
          { x: 5, y: 7 }, // Rest of body
        ],
      },
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };

    // Apply avoidGoingBackwards function
    avoidGoingBackwards(gameState, possibleMoves);

    // Should not be able to move up, to its neck
    expect(possibleMoves.up).toBe(false);

    // Other directions should still be safe
    expect(possibleMoves.down).toBe(true);
    expect(possibleMoves.left).toBe(true);
    expect(possibleMoves.right).toBe(true);
  });

  // POI #5: First turn - no backwards constraint
  test("POI: First turn - all directions should be safe (no backwards constraint)", () => {
    // On the first turn, the snake has only head and one body segment,
    // so there's no "direction" yet
    const gameState = {
      turn: 0, // First turn
      you: {
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // Head
          { x: 5, y: 5 }, // Body starts at same position on first turn
        ],
      },
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };

    // Apply avoidGoingBackwards function
    avoidGoingBackwards(gameState, possibleMoves);

    // All directions should be safe on the first turn
    expect(possibleMoves.up).toBe(true);
    expect(possibleMoves.down).toBe(true);
    expect(possibleMoves.left).toBe(true);
    expect(possibleMoves.right).toBe(true);
  });

  // POI #6: Snake meets corner - diagonal neck
  test("POI: Snake meets corner - backwards direction should be unsafe", () => {
    const gameState = {
      you: {
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // Head
          { x: 4, y: 5 }, // Neck is to the left
          { x: 4, y: 4 }, // Body turns at a corner
          { x: 3, y: 4 },
        ],
      },
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };

    // Apply avoidGoingBackwards function
    avoidGoingBackwards(gameState, possibleMoves);

    // Should not be able to move left (to the neck)
    expect(possibleMoves.left).toBe(false);

    // Other directions should still be safe
    expect(possibleMoves.up).toBe(true);
    expect(possibleMoves.down).toBe(true);
    expect(possibleMoves.right).toBe(true);
  });

  // POI #7: Snake at left border, neck to the right - left (wall) and right (backwards) should be unsafe
  test("POI: Snake at left border, neck to the right - left (wall) and right (backwards) should be unsafe", () => {
    const gameState = {
      you: {
        head: { x: 0, y: 5 },
        body: [
          { x: 0, y: 5 }, // Head at left border
          { x: 1, y: 5 }, // Neck to the right
          { x: 2, y: 5 },
        ],
      },
    };
    const possibleMoves = { up: true, down: true, left: true, right: true };
    avoidGoingBackwards(gameState, possibleMoves);
    // Wall logic would block left, avoidGoingBackwards blocks right
    expect(possibleMoves.left).toBe(true); // This test only checks avoidGoingBackwards, not wall logic
    expect(possibleMoves.right).toBe(false); // Backwards
    expect(possibleMoves.up).toBe(true);
    expect(possibleMoves.down).toBe(true);
  });

  // POI #8: Snake at top border, neck below - up (wall) and down (backwards) should be unsafe
  test("POI: Snake at top border, neck below - up (wall) and down (backwards) should be unsafe", () => {
    const gameState = {
      you: {
        head: { x: 5, y: 10 },
        body: [
          { x: 5, y: 10 }, // Head at top border
          { x: 5, y: 9 }, // Neck below
          { x: 5, y: 8 },
        ],
      },
    };
    const possibleMoves = { up: true, down: true, left: true, right: true };
    avoidGoingBackwards(gameState, possibleMoves);
    expect(possibleMoves.down).toBe(false); // Backwards
    expect(possibleMoves.up).toBe(true); // Wall logic would block this, not avoidGoingBackwards
    expect(possibleMoves.left).toBe(true);
    expect(possibleMoves.right).toBe(true);
  });

  // POI #9: Snake at bottom border, neck above - down (wall) and up (backwards) should be unsafe
  test("POI: Snake at bottom border, neck above - down (wall) and up (backwards) should be unsafe", () => {
    const gameState = {
      you: {
        head: { x: 5, y: 0 },
        body: [
          { x: 5, y: 0 }, // Head at bottom border
          { x: 5, y: 1 }, // Neck above
          { x: 5, y: 2 },
        ],
      },
    };
    const possibleMoves = { up: true, down: true, left: true, right: true };
    avoidGoingBackwards(gameState, possibleMoves);
    expect(possibleMoves.up).toBe(false); // Backwards
    expect(possibleMoves.down).toBe(true); // Wall logic would block this, not avoidGoingBackwards
    expect(possibleMoves.left).toBe(true);
    expect(possibleMoves.right).toBe(true);
  });

  // POI #10: Snake at right border, neck to the left - right (wall) and left (backwards) should be unsafe
  test("POI: Snake at right border, neck to the left - right (wall) and left (backwards) should be unsafe", () => {
    const gameState = {
      you: {
        head: { x: 10, y: 5 },
        body: [
          { x: 10, y: 5 }, // Head at right border
          { x: 9, y: 5 }, // Neck to the left
          { x: 8, y: 5 },
        ],
      },
    };
    const possibleMoves = { up: true, down: true, left: true, right: true };
    avoidGoingBackwards(gameState, possibleMoves);
    expect(possibleMoves.left).toBe(false); // Backwards
    expect(possibleMoves.right).toBe(true); // Wall logic would block this, not avoidGoingBackwards
    expect(possibleMoves.up).toBe(true);
    expect(possibleMoves.down).toBe(true);
  });
});
