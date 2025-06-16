/**
 * @file huntSmallerSnakes.js
 * @description This file contains logic to hunt and eliminate smaller snakes.
 * The snake will actively pursue snakes that are smaller than itself.
 * @module src/utils/moves/huntSmallerSnakes
 * @requires module:src/helper/snake/hunting
 * @requires module:src/helper/moves/huntingStrategy
 * @requires module:src/helper/snake/body
 */

import { getHuntableSnakes, findClosestTarget } from "../../helper/snake/hunting.js";
import {
  calculateInterceptionMove,
  getClosestMove,
  calculateSafeMoveDistances,
  shouldAttemptInterception,
} from "../../helper/moves/huntingStrategy.js";
import { getHead } from "../../helper/snake/body.js";

/**
 * @description Main function that implements hunting behavior for smaller snakes
 * @param {Object} gameState - The current state of the game
 * @param {Object} isMoveSafe - Object indicating which moves are safe
 * @returns {string|null} The recommended move direction or null if no hunting opportunity
 */
export function huntSmallerSnakes(gameState, isMoveSafe) {
  // Find all huntable snakes
  const huntableSnakes = getHuntableSnakes(gameState);
  if (huntableSnakes.length === 0) {
    return null;
  }

  // Find the closest target
  const targetSnake = findClosestTarget(gameState, huntableSnakes);
  if (!targetSnake) return null;

  // Calculate distances for each safe move
  const safeMoveDistances = calculateSafeMoveDistances(gameState, targetSnake, isMoveSafe);
  if (Object.keys(safeMoveDistances).length === 0) {
    return null;
  }

  // Determine hunting strategy based on distance
  const myHead = getHead(gameState);
  let huntingMove = null;

  if (shouldAttemptInterception(myHead, targetSnake.head)) {
    // Close range: attempt interception
    huntingMove = calculateInterceptionMove(gameState, targetSnake, safeMoveDistances);
  }

  // If no interception move or not close enough, just move closer
  if (!huntingMove) {
    huntingMove = getClosestMove(safeMoveDistances);
  }

  return huntingMove;
}

/**
 * @description Checks if hunting is a good strategy given current game state
 * @param {Object} gameState - The current state of the game
 * @returns {boolean} Whether hunting should be prioritized
 */
export function shouldPrioritizeHunting(gameState) {
  // Health check
  if (gameState.you.health < 30) {
    return false;
  }

  // Size check
  if (gameState.you.length < 3) {
    return false;
  }

  // Check if there are worthwhile targets
  const huntableSnakes = getHuntableSnakes(gameState);
  return huntableSnakes.length > 0;
}
