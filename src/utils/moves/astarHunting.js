/**
 * @file astarHunting.js
 * @description Enhanced hunting strategy using A* pathfinding algorithm
 * @module src/utils/moves/astarHunting
 */

import { findBestHuntingPath, getNextMoveFromPath } from "../pathfinding/astar.js";
import {
  getHuntableSnakes,
  findClosestTarget,
} from "../../helper/snake/hunting.js";

/**
 * @description Enhanced hunting function using A* pathfinding
 * @param {Object} gameState - The current state of the game
 * @returns {string|null} The recommended move direction or null if no hunting opportunity
 */
export function huntWithAstar(gameState) {
  // Check basic hunting criteria first
  if (gameState.you.health < 30 || gameState.you.length < 3) {
    return null; // Not healthy/big enough to hunt
  }

  // Find the best hunting path using A*
  const huntingResult = findBestHuntingPath(gameState);
  
  if (!huntingResult || !huntingResult.path) {
    return null; // No valid hunting path found
  }

  // Get the next move from the path
  const nextMove = getNextMoveFromPath(huntingResult.path, gameState.you.head);
  
  if (nextMove) {
    console.log(`A* HUNT: Targeting ${huntingResult.target.id} with path length ${huntingResult.distance}`);
  }

  return nextMove;
}

/**
 * @description Check if A* hunting should be prioritized over other strategies
 * @param {Object} gameState - The current state of the game
 * @returns {boolean} True if A* hunting should be used
 */
export function shouldUseAstarHunting(gameState) {
  // Health requirements
  if (gameState.you.health < 30) {
    return false;
  }

  // Size requirements
  if (gameState.you.length < 3) {
    return false;
  }

  // Prioritize hunting the single closest target
  const huntableSnakes = getHuntableSnakes(gameState);
  const closestTarget = findClosestTarget(gameState, huntableSnakes);

  if (!closestTarget) {
    return false;
  }

  // Additional logic: prefer A* hunting when there are obstacles
  // that would make Manhattan distance ineffective
  return true;
}

/**
 * @description Enhanced hunting strategy that combines A* pathfinding with tactical decisions
 * @param {Object} gameState - The current state of the game
 * @param {Object} isMoveSafe - Object indicating which moves are safe from existing checks
 * @returns {string|null} The recommended move direction or null
 */
export function enhancedHuntingStrategy(gameState, isMoveSafe) {
  if (!shouldUseAstarHunting(gameState)) {
    return null;
  }

  const huntingMove = huntWithAstar(gameState);
  
  // Ensure the A* suggested move is also considered safe by our existing safety checks
  if (huntingMove && isMoveSafe[huntingMove] === true) {
    return huntingMove;
  }

  // If A* suggests an unsafe move, return null to let other strategies take over
  return null;
} 