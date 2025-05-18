/**
 * @file snake.js
 * @description This file contains the main logic for the Battlesnake's movement.
 * @module src/core/snake
 */


import { avoidGoingBackwards } from "../lib/moves/avoidGoingBackwards.js";
import { avoidWalls } from "../lib/moves/avoidWalls.js";
import { avoidSelf } from "../lib/moves/avoidSelf.js";
import { avoidOthers } from "../lib/moves/avoidOthers.js";

/**
 * @typedef {"up" | "down" | "left" | "right"} MoveDirection
 * @description Represents the valid directions the snake can move.
 * @param {Object} gameState
 * @param {Object} gameState.board - The board object
 * @param {Object} gameState.turn - The current turn number
 * @param {Object} gameState.you - The snake object
 * @returns {{ move: MoveDirection }} - The next move for the snake
 * @example
 * const gameState = {
 *   board: {
 *     width: 11,
 *     height: 11,
 *     food: [{ x: 5, y: 5 }],
 *     snakes: [{ id: "1", body: [{ x: 1, y: 1 }, { x: 1, y: 2 }] }]
 *   },
 *   turn: 1,
 *   you: {
 *     id: "1",
 *     body: [{ x: 1, y: 1 }, { x: 1, y: 2 }],
 *     health: 100,
 *     length: 2,
 *     head: { x: 1, y: 1 },
 *     tail: { x: 1, y: 2 }
 *   }
 * };
 * move(gameState); // Returns the next move for the snake
 */
function move(gameState) {
  const isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  // Moves to avoid
  avoidGoingBackwards(gameState, isMoveSafe);
  avoidWalls(gameState, isMoveSafe);
  avoidSelf(gameState, isMoveSafe);
  avoidOthers(gameState, isMoveSafe);

  // Are there any safe moves left?
  const safeMoves = Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);
  if (safeMoves.length === 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    return { move: "down" };
  }

  // Choose a random move from the safe moves
  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

  // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
  // food = gameState.board.food;

  console.log(`MOVE ${gameState.turn}: ${nextMove}`);
  return { move: nextMove };
}

export { move };
