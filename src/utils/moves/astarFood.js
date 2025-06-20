/**
 * @file astarFood.js
 * @description A* pathfinding based food seeking strategy
 * @module src/utils/moves/astarFood
 */

import { findPath, findMultipleFoodPath, getNextMoveFromPath } from "../pathfinding/astar.js";

/**
 * @description Find the closest food using A* pathfinding
 * @param {Object} gameState - The current state of the game
 * @returns {Object|null} Result with path and target food or null
 */
export function findClosestFood(gameState) {
  const { board, you } = gameState;
  
  if (!board.food || board.food.length === 0) {
    return null;
  }

  let closestFood = null;
  let shortestPath = null;
  let shortestDistance = Infinity;

  // Find the closest reachable food
  for (const food of board.food) {
    const path = findPath(you.head, food, gameState);
    if (path && path.length < shortestDistance) {
      shortestDistance = path.length;
      closestFood = food;
      shortestPath = path;
    }
  }

  return closestFood ? {
    path: shortestPath,
    target: closestFood,
    distance: shortestDistance - 1
  } : null;
}

/**
 * @description A* food seeking strategy
 * @param {Object} gameState - The current state of the game
 * @param {Object} isMoveSafe - Object indicating which moves are safe
 * @returns {string|null} The recommended move direction or null
 */
export function seekFoodWithAstar(gameState, isMoveSafe) {
  // Basic health check - seek food when health is getting low
  if (gameState.you.health > 80) {
    return null; // Don't prioritize food when health is high
  }

  const foodResult = findClosestFood(gameState);
  
  if (!foodResult || !foodResult.path) {
    return null; // No reachable food found
  }

  // Get the next move from the path
  const nextMove = getNextMoveFromPath(foodResult.path, gameState.you.head);
  
  // Ensure the A* suggested move is also considered safe
  if (nextMove && isMoveSafe[nextMove] === true) {
    console.log(`A* FOOD: Moving ${nextMove} towards food at (${foodResult.target.x}, ${foodResult.target.y})`);
    return nextMove;
  }

  return null;
}

/**
 * @description Multi-food chaining strategy using A*
 * @param {Object} gameState - The current state of the game
 * @param {Object} isMoveSafe - Object indicating which moves are safe
 * @param {number} maxFood - Maximum number of food items to chain
 * @returns {string|null} The recommended move direction or null
 */
export function chainFoodWithAstar(gameState, isMoveSafe, maxFood = 3) {
  // Use food chaining when health is moderate and we want to grow efficiently
  if (gameState.you.health < 50 || gameState.you.health > 90) {
    return null;
  }

  const multipleResult = findMultipleFoodPath(gameState, maxFood);
  
  if (!multipleResult || !multipleResult.path) {
    // Fall back to single food seeking
    return seekFoodWithAstar(gameState, isMoveSafe);
  }

  // Get the next move from the optimized multi-food path
  const nextMove = getNextMoveFromPath(multipleResult.path, gameState.you.head);
  
  // Ensure the A* suggested move is also considered safe
  if (nextMove && isMoveSafe[nextMove] === true) {
    console.log(`A* CHAIN: Moving ${nextMove} towards ${multipleResult.foodOrder.length} food items (total distance: ${multipleResult.totalDistance})`);
    return nextMove;
  }

  return null;
}

/**
 * @description Intelligent food seeking that adapts strategy based on game state
 * @param {Object} gameState - The current state of the game
 * @param {Object} isMoveSafe - Object indicating which moves are safe
 * @returns {string|null} The recommended move direction or null
 */
export function smartFoodStrategy(gameState, isMoveSafe) {
  const { you, board } = gameState;
  
  // No food available
  if (!board.food || board.food.length === 0) {
    return null;
  }

  // Critical health - seek any food immediately
  if (you.health < 30) {
    return seekFoodWithAstar(gameState, isMoveSafe);
  }

  // Moderate health and multiple food available - try chaining
  if (you.health < 70 && board.food.length > 1) {
    const chainMove = chainFoodWithAstar(gameState, isMoveSafe);
    if (chainMove) {
      return chainMove;
    }
  }

  // Default to single food seeking
  if (you.health < 80) {
    return seekFoodWithAstar(gameState, isMoveSafe);
  }

  // High health - don't prioritize food
  return null;
}

/**
 * @description Check if food seeking should be prioritized
 * @param {Object} gameState - The current state of the game
 * @returns {boolean} True if food seeking should be prioritized
 */
export function shouldPrioritizeFood(gameState) {
  return gameState.you.health < 80 && 
         gameState.board.food && 
         gameState.board.food.length > 0;
} 