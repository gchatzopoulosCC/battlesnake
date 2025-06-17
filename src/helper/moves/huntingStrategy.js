/**
 * @file huntingStrategy.js
 * @description This file contains helper functions for hunting strategy calculations and move selection.
 * @module src/helper/moves/huntingStrategy
 */

import { getMoves } from "../sets/moves.js";
import { getManhattanDistance } from "../sets/coordinates.js";
import { getValidMovesFromPosition } from "../sets/validation.js";
import { getHuntableSnakes, findClosestTarget, isWorthwhileTarget } from "../snake/hunting.js";

/**
 * @description Calculates the best interception move when close to target
 * @param {Object} gameState - The current state of the game
 * @param {Object} targetSnake - The snake we're hunting
 * @param {Object} safeMoveDistances - Object with safe move directions and distances
 * @returns {string|null} The best interception move or null
 */
export function calculateInterceptionMove(gameState, targetSnake, safeMoveDistances) {
  // Get possible moves for the target snake
  const targetPossibleMoves = getValidMovesFromPosition(gameState, targetSnake.head);

  if (targetPossibleMoves.length === 0) {
    // Target is trapped, just move closer
    return getClosestMove(safeMoveDistances);
  }

  // Find the move that minimizes average distance to all possible target positions
  let bestMove = null;
  let minAvgDistance = Infinity;

  Object.entries(safeMoveDistances).forEach(([direction, _]) => {
    const move = getMoves(gameState).find((m) => m.direction === direction);
    const [x, y] = move.adjacentPosition.split(",").map(Number);
    const myNextPos = { x, y };

    const avgDistance =
      targetPossibleMoves.reduce((sum, targetPos) => {
        return sum + getManhattanDistance(myNextPos, targetPos);
      }, 0) / targetPossibleMoves.length;

    if (avgDistance < minAvgDistance) {
      minAvgDistance = avgDistance;
      bestMove = direction;
    }
  });

  return bestMove;
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
 * @description Calculates distances for each safe move to the target
 * @param {Object} gameState - The current state of the game
 * @param {Object} targetSnake - The snake we're hunting
 * @param {Object} isMoveSafe - Object indicating which moves are safe
 * @returns {Object} Object with move directions and their distances to target
 */
export function calculateSafeMoveDistances(gameState, targetSnake, isMoveSafe) {
  const moves = getMoves(gameState);
  const moveDistances = {};

  moves.forEach((move) => {
    if (isMoveSafe[move.direction]) {
      const [x, y] = move.adjacentPosition.split(",").map(Number);
      moveDistances[move.direction] = getManhattanDistance({ x, y }, targetSnake.head);
    }
  });

  return moveDistances;
}

/**
 * @description Determines if we should attempt interception based on distance
 * @param {Object} myHead - Our snake's head position
 * @param {Object} targetHead - Target snake's head position
 * @returns {boolean} True if we should attempt interception
 */
export function shouldAttemptInterception(myHead, targetHead) {
  const distance = getManhattanDistance(myHead, targetHead);
  return distance <= 2;
}

/**
 * @description Main hunting strategy function
 * @param {Object} gameState - The current state of the game
 * @returns {string|null} The best move for hunting or null
 */
export function huntingStrategy(gameState) {
  const { you, board } = gameState;

  // 1. Find huntable snakes
  const huntableSnakes = getHuntableSnakes(gameState);
  if (huntableSnakes.length === 0) {
    return null; // No huntable targets
  }

  // 2. Find the closest target
  const targetSnake = findClosestTarget(gameState, huntableSnakes);
  if (!targetSnake) {
    return null; // No suitable target
  }

  // 3. Determine safe moves
  const isMoveSafe = getValidMovesFromPosition(gameState, you.head, true);

  // 4. Calculate distances for safe moves
  const safeMoveDistances = calculateSafeMoveDistances(gameState, targetSnake, isMoveSafe);
  if (Object.keys(safeMoveDistances).length === 0) {
    return null; // No safe moves towards target
  }

  // 5. Decide on interception or simple chase
  if (shouldAttemptInterception(you.head, targetSnake.head)) {
    return calculateInterceptionMove(gameState, targetSnake, safeMoveDistances);
  } else {
    return getClosestMove(safeMoveDistances);
  }
}
