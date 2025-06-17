/**
 * @file huntingStrategy.js
 * @description This file contains helper functions for hunting strategy calculations and move selection.
 * @module src/helper/moves/huntingStrategy
 */

import { getMoves } from "../sets/moves.js";
import { getManhattanDistance } from "../sets/coordinates.js";
import { getValidMovesFromPosition } from "../sets/validation.js";
import { getHuntableSnakes, findClosestTarget } from "../snake/hunting.js";

/**
 * @description Calculates distances for each safe move to the target
 * @param {Object} gameState - The current state of the game
 * @param {Object} targetSnake - The snake we're hunting
 * @param {Object|string[]} safeMoves - Object with direction:boolean pairs or array of safe move directions
 * @returns {Object} Object with move directions and their distances to target
 */
export function calculateSafeMoveDistances(gameState, targetSnake, safeMoves) {
  const moves = getMoves(gameState);
  const moveDistances = {};

  moves.forEach((move) => {
    // Handle both object format {up: true, down: false} and array format ["up", "down"]
    const isSafe = Array.isArray(safeMoves) 
      ? safeMoves.includes(move.direction)
      : safeMoves[move.direction] === true;
      
    if (isSafe) {
      const [x, y] = move.adjacentPosition.split(",").map(Number);
      moveDistances[move.direction] = getManhattanDistance({ x, y }, targetSnake.head);
    }
  });

  return moveDistances;
}

/**
 * @description Gets the move that brings us closest to the target
 * @param {Object} moveDistances - Object with move directions and distances
 * @returns {string|null} The direction that minimizes distance
 */
export function getClosestMove(moveDistances) {
  const entries = Object.entries(moveDistances);
  if (entries.length === 0) return null;

  return entries.reduce(
    (best, [direction, distance]) => {
      return distance < best.distance ? { direction, distance } : best;
    },
    { direction: null, distance: Infinity },
  ).direction;
}

/**
 * @description Determines if we should attempt interception based on distance
 * @param {Object} myHead - Our snake's head position
 * @param {Object} targetHead - Target snake's head position
 * @returns {boolean} True if we should attempt interception
 */
export function shouldAttemptInterception(myHead, targetHead) {
  const distance = getManhattanDistance(myHead, targetHead);
  return distance <= 3; // Slightly more generous range
}

/**
 * @description Calculates the best interception move when close to target
 * @param {Object} gameState - The current state of the game
 * @param {Object} targetSnake - The snake we're hunting
 * @param {Object} safeMoveDistances - Object with safe move directions and distances
 * @returns {string|null} The best interception move or null
 */
export function calculateInterceptionMove(gameState, targetSnake, safeMoveDistances) {
  // For now, just return the closest move - we can enhance this later
  return getClosestMove(safeMoveDistances);
}

/**
 * @description Main hunting strategy function
 * @param {Object} gameState - The current state of the game
 * @returns {string|null} The best move for hunting or null
 */
export function huntingStrategy(gameState) {
  const { you } = gameState;

  // 1. Check if we meet basic hunting criteria
  if (you.health < 30 || you.length < 3) {
    return null; // Not healthy/big enough to hunt
  }

  // 2. Find huntable snakes
  const huntableSnakes = getHuntableSnakes(gameState);
  if (huntableSnakes.length === 0) {
    return null; // No huntable targets
  }

  // 3. Find the closest target
  const targetSnake = findClosestTarget(gameState, huntableSnakes);
  if (!targetSnake) {
    return null; // No suitable target
  }

  // 4. Get valid moves from our current position
  const validMoves = getValidMovesFromPosition(gameState, you.head);
  if (validMoves.length === 0) {
    return null; // No valid moves available
  }

  // 5. Convert valid moves to direction strings
  const moves = getMoves(gameState);
  const safeMoveDirections = moves
    .filter((move) => {
      const [x, y] = move.adjacentPosition.split(",").map(Number);
      return validMoves.some((validMove) => validMove.x === x && validMove.y === y);
    })
    .map((move) => move.direction);

  if (safeMoveDirections.length === 0) {
    return null; // No safe moves towards target
  }

  // 6. Calculate distances for safe moves
  const safeMoveDistances = calculateSafeMoveDistances(gameState, targetSnake, safeMoveDirections);
  if (Object.keys(safeMoveDistances).length === 0) {
    return null; // No safe moves with distances calculated
  }

  // 7. Decide on interception or simple chase
  if (shouldAttemptInterception(you.head, targetSnake.head)) {
    return calculateInterceptionMove(gameState, targetSnake, safeMoveDistances);
  } else {
    return getClosestMove(safeMoveDistances);
  }
}
