/**
 * @file snake.js
 * @description This file contains the main logic for the Battlesnake's movement decisions.
 * It analyzes the game state and determines the next move by avoiding dangerous positions.
 * @module src/core/snake
 * @requires module:src/lib/moves/avoidGoingBackwards
 * @requires module:src/lib/moves/avoidWalls
 * @requires module:src/lib/moves/avoidSelf
 * @requires module:src/lib/moves/avoidOthers
 */

import { avoidGoingBackwards } from "../utils/moves/avoidGoingBackwards.js";
import { avoidWalls } from "../utils/moves/avoidWalls.js";
import { avoidSelf } from "../utils/moves/avoidSelf.js";
import { avoidOthers } from "../utils/moves/avoidOthers.js";
import { huntingStrategy } from "../helper/moves/huntingStrategy.js";
import { floodFill } from "../utils/moves/floodFill.js";

/**
 * @typedef {"up" | "down" | "left" | "right"} MoveDirection
 * @description Represents the valid directions the snake can move.
 */

/**
 * @description Determines the next move for the Battlesnake based on the current game state.
 * The function evaluates possible moves and avoids unsafe options such as walls, the snake's own body, and other snakes.
 * If no safe moves are available, it defaults to moving "down".
 *
 * @param {Object} gameState - The current state of the game.
 * @param {Object} gameState.board - The board object containing the game board's dimensions, food, and snakes.
 * @param {number} gameState.board.width - The width of the game board.
 * @param {number} gameState.board.height - The height of the game board.
 * @param {Object[]} gameState.board.food - An array of food positions, each represented as an object with `x` and `y` coordinates.
 * @param {Object[]} gameState.board.snakes - An array of snakes on the board, including their positions and properties.
 * @param {number} gameState.turn - The current turn number of the game.
 * @param {Object} gameState.you - The player's snake object.
 * @param {string} gameState.you.id - The unique identifier for the player's snake.
 * @param {Object[]} gameState.you.body - An array of objects representing the snake's body segments, starting with the head.
 * @param {number} gameState.you.health - The current health of the player's snake.
 * @param {Object} gameState.you.head - The position of the snake's head, represented as an object with `x` and `y` coordinates.
 * @param {Object} gameState.you.tail - The position of the snake's tail, represented as an object with `x` and `y` coordinates.
 *
 * @returns {{ move: MoveDirection }} - The next move for the snake, represented as an object with a `move` property.
 *
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
 *
 * move(gameState);
 * // Returns { move: "right" } or another safe direction
 *
 * // If no safe moves are available:
 * // Returns { move: "down" }
 */
function move(gameState) {
  // Try to hunt smaller snakes first
  const huntingMove = huntingStrategy(gameState);
  if (huntingMove) {
    console.log(`MOVE ${gameState.turn}: Hunting! Moving ${huntingMove}`);
    return { move: huntingMove };
  }

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

  // Use flood fill to determine which safe move gives us the most space
  const floodFillResults = floodFill(gameState, isMoveSafe);
  
  // Find the safe move with the most available space
  let bestMove = safeMoves[0];
  let maxSpace = floodFillResults[bestMove];
  
  for (const move of safeMoves) {
    const space = floodFillResults[move];
    console.log(`MOVE ${gameState.turn}: ${move} has ${space} accessible cells`);
    
    if (space > maxSpace) {
      maxSpace = space;
      bestMove = move;
    }
  }

  // If all moves have very limited space, warn about potential trap
  if (maxSpace < 10) {
    console.log(`MOVE ${gameState.turn}: WARNING - Limited space available (${maxSpace} cells)`);
  }

  // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
  // food = gameState.board.food;

  console.log(`MOVE ${gameState.turn}: Choosing ${bestMove} with ${maxSpace} accessible cells`);
  return { move: bestMove };
}

export { move };
