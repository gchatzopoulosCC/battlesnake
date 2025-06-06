import { avoidSelf } from "../../src/utils/moves/avoidSelf.js";
import { expect } from "@jest/globals";

describe("avoidSelf Points of Interest", () => {
  // POI #1: Snake with no risk of self-collision
  test("POI: Snake with straight body - all directions should be safe", () => {
    const gameState = {
      you: {
        head: { x: 5, y: 5 },
        body: [
          { x: 4, y: 5},
          { x: 4, y: 6},
          { x: 4, y: 7},
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    avoidSelf(gameState, isMoveSafe);

    // All directions should still be safe (no self-collision risk)
    expect(isMoveSafe.up).toBe(false);
    expect(isMoveSafe.down).toBe(true);
    expect(isMoveSafe.left).toBe(true);
    expect(isMoveSafe.right).toBe(true);
  });

  // POI #2: Snake with body to the right
  test("POI: Snake with body part to the right - right should be unsafe", () => {
    const gameState = {
      you: {
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // head
          { x: 6, y: 5 }, // body to the right
          { x: 7, y: 5 }, // more body
          { x: 7, y: 6 }, // tail
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    avoidSelf(gameState, isMoveSafe);

    // Right should now be unsafe
    expect(isMoveSafe.right).toBe(false);

    // Other directions should still be safe
    expect(isMoveSafe.up).toBe(true);
    expect(isMoveSafe.down).toBe(true);
    expect(isMoveSafe.left).toBe(true);
  });

  // POI #3: Snake with body to the left
  test("POI: Snake with body part to the left - left should be unsafe", () => {
    const gameState = {
      you: {
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // head
          { x: 4, y: 5 }, // body to the left
          { x: 3, y: 5 }, // more body
          { x: 3, y: 6 }, // tail
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    avoidSelf(gameState, isMoveSafe);

    // Left should now be unsafe
    expect(isMoveSafe.left).toBe(false);

    // Other directions should still be safe
    expect(isMoveSafe.up).toBe(true);
    expect(isMoveSafe.down).toBe(true);
    expect(isMoveSafe.right).toBe(true);
  });

  // POI #4: Snake with body below
  test("POI: Snake with body part below - down should be unsafe", () => {
    const gameState = {
      you: {
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // head
          { x: 5, y: 4 }, // body below
          { x: 5, y: 3 }, // more body
          { x: 6, y: 3 }, // tail
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    avoidSelf(gameState, isMoveSafe);

    // Down should now be unsafe
    expect(isMoveSafe.down).toBe(false);

    // Other directions should still be safe
    expect(isMoveSafe.up).toBe(true);
    expect(isMoveSafe.left).toBe(true);
    expect(isMoveSafe.right).toBe(true);
  });

  // POI #5: Snake about to create a loop - complex case
  test("POI: Snake about to create a loop - multiple directions unsafe", () => {
    const gameState = {
      you: {
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // head
          { x: 6, y: 5 }, // body right
          { x: 6, y: 6 }, // body up-right
          { x: 5, y: 6 }, // body up
          { x: 4, y: 6 }, // body up-left
          { x: 4, y: 5 }, // body left (forms almost a loop)
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    avoidSelf(gameState, isMoveSafe);

    // Multiple directions should be unsafe
    expect(isMoveSafe.up).toBe(false);
    expect(isMoveSafe.left).toBe(false);
    expect(isMoveSafe.right).toBe(false);

    // Only down should be safe
    expect(isMoveSafe.down).toBe(true);
  });

  // POI #6: Adjacent state - tail in adjacent cell (collision expected)
  test("POI: Snake with tail in adjacent cell - should be unsafe to move there", () => {
    // When the tail is in an adjacent cell, moving there is a self-collision.
    const gameState = {
      you: {
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // head
          { x: 6, y: 5 }, // body
          { x: 7, y: 5 }, // more body
          { x: 7, y: 6 }, // more body
          { x: 6, y: 6 }, // more body
          { x: 5, y: 6 }, // tail (just above head)
        ],
      },
    };

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true,
    };

    avoidSelf(gameState, isMoveSafe);

    // Up should be UNSAFE because it's a collision with the tail.
    expect(isMoveSafe.up).toBe(false);

    // Right shouldn't be safe (body is there)
    expect(isMoveSafe.right).toBe(false);

    // Other directions remain safe from these specific obstacles
    expect(isMoveSafe.down).toBe(true);
    expect(isMoveSafe.left).toBe(true);
  });

  // POI #7: Snake of length 2 (head and neck) - moving to neck is collision
  test("POI: Snake of length 2 - moving to neck should be unsafe", () => {
    const gameState = {
      you: {
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // head
          { x: 5, y: 4 }, // neck (below head)
        ],
      },
    };
    const isMoveSafe = { up: true, down: true, left: true, right: true };
    avoidSelf(gameState, isMoveSafe);

    // avoidSelf should mark moving to the neck (any body part) as unsafe.
    // avoidGoingBackwards provides the more specific semantic meaning.
    expect(isMoveSafe.up).toBe(true);
    expect(isMoveSafe.down).toBe(false);
    expect(isMoveSafe.left).toBe(true);
    expect(isMoveSafe.right).toBe(true);
  });

  // POI #8: Snake of length 3, tail not adjacent - moving to neck is collision
  test("POI: Snake of length 3, tail not adjacent - moving to neck should be unsafe", () => {
    const gameState = {
      you: {
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // head
          { x: 5, y: 4 }, // neck (below)
          { x: 5, y: 3 }, // tail (further below, not adjacent for a move from head)
        ],
      },
    };
    const isMoveSafe = { up: true, down: true, left: true, right: true };
    avoidSelf(gameState, isMoveSafe);

    expect(isMoveSafe.up).toBe(true);
    // Moving to neck (5,4) is a collision from avoidSelf's perspective
    expect(isMoveSafe.down).toBe(false);
    expect(isMoveSafe.left).toBe(true);
    expect(isMoveSafe.right).toBe(true);
  });

  // POI #9: Head adjacent to non-neck/non-tail body part after turn of snake (u-turn) - collision expected
  test("POI: Head adjacent to non-neck/non-tail body part after u-turn - collision expected", () => {
    const gameState = {
      you: {
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // head
          { x: 5, y: 4 }, // neck (P1)
          { x: 6, y: 4 }, // (P2)
          { x: 6, y: 5 }, // (P3) - this is adjacent to head, to the right!
          { x: 6, y: 6 }, // (P4) - tail
        ],
      },
    };
    const isMoveSafe = { up: true, down: true, left: true, right: true };
    avoidSelf(gameState, isMoveSafe);

    expect(isMoveSafe.right).toBe(false); // Moving right from (5,5) to (6,5) collides with P3
    expect(isMoveSafe.up).toBe(true);
    // Moving to neck (5,4) is a collision
    expect(isMoveSafe.down).toBe(false);
    expect(isMoveSafe.left).toBe(true);
  });

  // POI #10: Snake trapped, only exit is tail - move to tail should be unsafe
  test("POI: Snake trapped, only exit is tail - move to tail should be unsafe", () => {
    const gameState = {
      you: {
        head: { x: 5, y: 5 }, // Head
        body: [
          // Snake encloses the spot (5,6)
          { x: 5, y: 5 }, // Head H(5,5)
          { x: 4, y: 5 }, // Neck N(4,5) (to the left)
          { x: 4, y: 4 }, // B1(4,4)
          { x: 5, y: 4 }, // B2(5,4) (below head)
          { x: 6, y: 4 }, // B3(6,4)
          { x: 6, y: 5 }, // B4(6,5) (to the right of head)
          { x: 6, y: 6 }, // B5(6,6)
          { x: 5, y: 6 }, // Tail T(5,6) (above head - this is the target escape square)
        ],
      },
    };

    const isMoveSafe = { up: true, down: true, left: true, right: true };
    avoidSelf(gameState, isMoveSafe);

    // Moving "up" from H(5,5) to T(5,6) should be UNSAFE because T(5,6) is the tail.
    expect(isMoveSafe.up).toBe(false);

    // Moving "down" from H(5,5) to B2(5,4) should be UNSAFE.
    expect(isMoveSafe.down).toBe(false);

    // Moving "left" from H(5,5) to N(4,5) should be UNSAFE as it collides with neck segment.
    expect(isMoveSafe.left).toBe(false);

    // Moving "right" from H(5,5) to B4(6,5) should be UNSAFE.
    expect(isMoveSafe.right).toBe(false);
  });

  // POI #11: After eating, after eating, the old tail position becomes a mid-body segment that stays put, making it a collision hazard.
  test("POI: After eating, former tail spot (now mid-body) is a collision", () => {
    const gameState = {
      you: {
        head: { x: 5, y: 5 }, // Current head position
        body: [
          // This body array represents the snake AFTER it ate and grew.
          // Let's say its head WAS at (5,4) and moved UP to (5,5) to eat food.
          // Its body before eating might have been: H(5,4), B1(6,4), OldTail(6,5)
          // After eating at (5,5):
          { x: 5, y: 5 }, // New Head (was food location)
          { x: 5, y: 4 }, // Former Head, now Neck
          { x: 6, y: 4 }, // Former B1
          { x: 6, y: 5 }, // This is the segment that was OldTail. It's now a regular body part.
          // The snake has grown, so a new actual tail would be added if it was longer.
          // For this test, we assume length 4 after eating.
        ],
      },
    };
    const isMoveSafe = { up: true, down: true, left: true, right: true };
    avoidSelf(gameState, isMoveSafe);

    // If the snake at H(5,5) tries to move RIGHT to (6,5):
    // (6,5) is occupied by a current body segment (the one that used to be the tail).
    // This MUST be a collision.
    expect(isMoveSafe.right).toBe(false);

    // Check other directions based on this specific body config:
    expect(isMoveSafe.up).toBe(true); // (5,6) is clear
    expect(isMoveSafe.down).toBe(false); // Collides with neck at (5,4)
    expect(isMoveSafe.left).toBe(true); // (4,5) is clear
  });

  // POI #12: After eating, snake becomes self-trapped by new length
  test("POI: After eating, snake becomes self-trapped by new length", () => {
    const gameState = {
      you: {
        head: { x: 5, y: 5 },
        body: [
          // snake was shorter, ate, and grew into this configuration:
          { x: 5, y: 5 }, // Head
          { x: 5, y: 4 }, // Neck (Down)
          { x: 6, y: 4 }, // Body
          { x: 6, y: 5 }, // Body (Right)
          { x: 6, y: 6 }, // Body
          { x: 5, y: 6 }, // Body (Up) - After eating, this segment was added
          { x: 4, y: 6 }, // Body
          { x: 4, y: 5 }, // Body (Left) - And this is the new tail
        ],
      },
    };

    const isMoveSafe = { up: true, down: true, left: true, right: true };
    avoidSelf(gameState, isMoveSafe);

    expect(isMoveSafe.up).toBe(false); // Collision with (5,6)
    expect(isMoveSafe.down).toBe(false); // Collision with (5,4)
    expect(isMoveSafe.left).toBe(false); // Collision with (4,5)
    expect(isMoveSafe.right).toBe(false); // Collision with (6,5)
  });

  // POI #12: Multiple consecutive eating creating a complex body
  test("POI: Multiple consecutive eating creates complex collision risks", () => {
    const gameState = {
      you: {
        head: { x: 5, y: 5 }, // Current head position
        body: [
          // This represents a snake that has eaten multiple times and grown considerably
          // The snake has a spiral-like shape due to movement patterns after multiple feedings
          { x: 5, y: 5 }, // Head
          { x: 6, y: 5 }, // Neck - moved from right
          { x: 6, y: 4 }, // Body - moved from below
          { x: 5, y: 4 }, // Body - moved from left
          { x: 4, y: 4 }, // Body
          { x: 4, y: 5 }, // Body - Left of head
          { x: 4, y: 6 }, // Body
          { x: 5, y: 6 }, // Body - Above head
          { x: 6, y: 6 }, // Body - was a tail before eating
          { x: 7, y: 6 }, // Body - was added after eating
          { x: 7, y: 5 }, // Tail - was added after second eating
        ],
      },
    };

    const isMoveSafe = { up: true, down: true, left: true, right: true };
    avoidSelf(gameState, isMoveSafe);

    // The snake's body is now completely surrounding its head on all sides
    expect(isMoveSafe.left).toBe(false); // Collides with body at (4,5)
    expect(isMoveSafe.up).toBe(false); // Collides with body at (5,6)
    expect(isMoveSafe.right).toBe(false); // Collides with neck at (6,5)
    expect(isMoveSafe.down).toBe(false); // Collides with body at (5,4)
  });
});
