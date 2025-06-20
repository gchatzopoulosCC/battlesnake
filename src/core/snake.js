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
import { enhancedHuntingStrategy } from "../utils/moves/astarHunting.js";
import { smartFoodStrategy, shouldPrioritizeFood } from "../utils/moves/astarFood.js";
import { floodFill } from "../helper/moves/floodFill.js";

/**
 * @typedef {"up" | "down" | "left" | "right"} MoveDirection
 * @description Represents the valid directions the snake can move.
 */

/**
 * @description Finds the moves with the most available space from safe moves
 * @param {string[]} safeMoves - Array of safe move directions
 * @param {Object} floodFillResults - Results from flood fill algorithm
 * @returns {Object} Object containing bestMoves array and maxSpace value
 */
function findBestMoves(safeMoves, floodFillResults) {
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

  return { bestMoves, maxSpace };
}

/**
 * @description Evaluates if a move is space-safe (has sufficient accessible cells)
 * @param {string} move - The move direction to evaluate
 * @param {Object} floodFillResults - Results from flood fill algorithm
 * @param {number} minSpace - Minimum required space (default: 15)
 * @returns {boolean} True if move has sufficient space
 */
function isSpaceSafe(move, floodFillResults, minSpace = 15) {
  return floodFillResults[move] >= minSpace;
}



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

  // First, determine which moves are safe
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

  // HYBRID APPROACH: Combine A* pathfinding with flood fill space evaluation
  
  // Step 1: Perform flood fill analysis for space evaluation
  const floodFillResults = floodFill(gameState);
  
  // Log all safe moves and their accessible space
  for (const move of safeMoves) {
    const space = floodFillResults[move];
    console.log(`MOVE ${gameState.turn}: ${move} has ${space} accessible cells`);
  }
  
  // Find moves with the most available space
  const { bestMoves, maxSpace } = findBestMoves(safeMoves, floodFillResults);
  
  // Warn if all moves have very limited space
  if (maxSpace < 10) {
    console.log(`MOVE ${gameState.turn}: WARNING - Limited space available (${maxSpace} cells)`);
  }

  // Step 2: Try A* strategies but validate them with flood fill
  
  // Priority 1: Enhanced A* hunting (only if space-safe)
  const astarHuntingMove = enhancedHuntingStrategy(gameState, isMoveSafe);
  if (astarHuntingMove && isSpaceSafe(astarHuntingMove, floodFillResults, 20)) {
    console.log(`MOVE ${gameState.turn}: A* Hunting (space-validated)! Moving ${astarHuntingMove} with ${floodFillResults[astarHuntingMove]} accessible cells`);
    return { move: astarHuntingMove };
  }

  // Priority 2: Traditional hunting (only if space-safe)
  const huntingMove = huntingStrategy(gameState);
  if (huntingMove && isMoveSafe[huntingMove] && isSpaceSafe(huntingMove, floodFillResults, 20)) {
    console.log(`MOVE ${gameState.turn}: Traditional Hunting (space-validated)! Moving ${huntingMove} with ${floodFillResults[huntingMove]} accessible cells`);
    return { move: huntingMove };
  }

  // Priority 3: Smart food seeking with space validation
  if (shouldPrioritizeFood(gameState)) {
    const foodMove = smartFoodStrategy(gameState, isMoveSafe);
    if (foodMove && isSpaceSafe(foodMove, floodFillResults, 15)) {
      console.log(`MOVE ${gameState.turn}: A* Food Seeking (space-validated)! Moving ${foodMove} with ${floodFillResults[foodMove]} accessible cells`);
      return { move: foodMove };
    }
  }

  // Step 3: Fall back to flood fill space-based decision making
  
  // If we have moves with good space, prefer hunting among them
  if (maxSpace >= 30) {
    // Try hunting moves that are among the best space moves
    if (astarHuntingMove && bestMoves.includes(astarHuntingMove)) {
      console.log(`MOVE ${gameState.turn}: A* Hunting (best space)! Moving ${astarHuntingMove} with ${floodFillResults[astarHuntingMove]} accessible cells`);
      return { move: astarHuntingMove };
    }
    
    if (huntingMove && isMoveSafe[huntingMove] && bestMoves.includes(huntingMove)) {
      console.log(`MOVE ${gameState.turn}: Traditional Hunting (best space)! Moving ${huntingMove} with ${floodFillResults[huntingMove]} accessible cells`);
      return { move: huntingMove };
    }
  }
  
  // Choose intelligently from best space moves
  let finalMove = bestMoves[0];
  
  if (bestMoves.length > 1) {
    // Prefer moves towards food if health is low and we have good space
    if (gameState.you.health < 50 && gameState.board.food.length > 0 && maxSpace >= 20) {
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
          finalMove = move;
          console.log(`MOVE ${gameState.turn}: Moving towards food (flood fill guided) with ${floodFillResults[finalMove]} accessible cells`);
          break;
        }
      }
    } else {
      // Add some randomness to avoid predictable patterns
      finalMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    }
  }
  
  console.log(`MOVE ${gameState.turn}: Flood fill decision - Moving ${finalMove} with ${maxSpace} accessible cells`);
  return { move: finalMove };
}

export { move };
