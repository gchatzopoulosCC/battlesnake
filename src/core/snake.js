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
  
  // Log all safe moves and their space
  for (const move of safeMoves) {
    const space = floodFillResults[move];
    console.log(`MOVE ${gameState.turn}: ${move} has ${space} accessible cells`);
  }
  
  // Find moves with the most available space
  let maxSpace = 0;
  const bestMoves = [];
  
  for (const move of safeMoves) {
    const space = floodFillResults[move];
    if (space > maxSpace) {
      maxSpace = space;
      bestMoves.length = 0; // Clear array
      bestMoves.push(move);
    } else if (space === maxSpace) {
      bestMoves.push(move);
    }
  }

  // Check if we should hunt, but only if the hunting move is safe and has enough space
  const huntingMove = huntingStrategy(gameState);
  if (huntingMove && isMoveSafe[huntingMove] && floodFillResults[huntingMove] >= 30) {
    console.log(`MOVE ${gameState.turn}: Hunting! Moving ${huntingMove} with ${floodFillResults[huntingMove]} accessible cells`);
    return { move: huntingMove };
  }

  // If all moves have very limited space, warn about potential trap
  if (maxSpace < 10) {
    console.log(`MOVE ${gameState.turn}: WARNING - Limited space available (${maxSpace} cells)`);
  }

  // When multiple moves have equal space, add some intelligence
  let bestMove = bestMoves[0];
  
  if (bestMoves.length > 1) {
    // Prefer moves towards food if health is low
    if (gameState.you.health < 50 && gameState.board.food.length > 0) {
      const head = gameState.you.head;
      const nearestFood = gameState.board.food.reduce((closest, food) => {
        const dist = Math.abs(food.x - head.x) + Math.abs(food.y - head.y);
        const closestDist = Math.abs(closest.x - head.x) + Math.abs(closest.y - head.y);
        return dist < closestDist ? food : closest;
      });
      
      // Choose move that gets us closer to food
      for (const move of bestMoves) {
        const newPos = {
          up: { x: head.x, y: head.y + 1 },
          down: { x: head.x, y: head.y - 1 },
          left: { x: head.x - 1, y: head.y },
          right: { x: head.x + 1, y: head.y }
        }[move];
        
        const currentDist = Math.abs(nearestFood.x - head.x) + Math.abs(nearestFood.y - head.y);
        const newDist = Math.abs(nearestFood.x - newPos.x) + Math.abs(nearestFood.y - newPos.y);
        
        if (newDist < currentDist) {
          bestMove = move;
          console.log(`MOVE ${gameState.turn}: Moving towards food`);
          break;
        }
      }
    } else {
      // Otherwise, add some randomness to avoid predictable patterns
      bestMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    }
  }

  console.log(`MOVE ${gameState.turn}: Choosing ${bestMove} with ${maxSpace} accessible cells`);
  return { move: bestMove };
}

export { move };
