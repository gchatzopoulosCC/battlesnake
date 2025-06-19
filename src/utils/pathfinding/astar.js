/**
 * @file astar.js
 * @description Implementation of A* pathfinding algorithm for Battlesnake
 * @module src/utils/pathfinding/astar
 */

import { parseCoordinates } from "../../helper/sets/coordinates.js";
import {
  getHuntableSnakes,
  findClosestTarget,
} from "../../helper/snake/hunting.js";
import { getValidMovesFromPosition } from "../../helper/sets/validation.js";
import { getCollisionSet } from "../../helper/sets/collisionSet.js";
import { getBodySet } from "../../helper/sets/bodySet.js";

/**
 * @description Priority queue implementation for A* algorithm
 */
class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  put(item, priority) {
    this.elements.push({ item, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  get() {
    return this.elements.shift()?.item;
  }

  empty() {
    return this.elements.length === 0;
  }
}

/**
 * @description Calculate Manhattan distance heuristic
 * @param {Object} a - Start position with x, y coordinates
 * @param {Object} b - Goal position with x, y coordinates
 * @returns {number} Manhattan distance between positions
 */
export function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

/**
 * @description Get valid neighboring positions
 * @param {Object} position - Current position with x, y coordinates
 * @param {Object} gameState - Current game state
 * @returns {Array} Array of valid neighbor positions
 */
export function getNeighbors(position, gameState) {
  // Use the existing validation function which already handles:
  // - Board boundaries
  // - Collision with all snake bodies
  return getValidMovesFromPosition(gameState, position);
}

/**
 * @description Reconstruct path from came_from map
 * @param {Map} cameFrom - Map of position to previous position
 * @param {Object} current - Current position
 * @returns {Array} Complete path from start to goal
 */
export function reconstructPath(cameFrom, current) {
  const path = [current];
  let currentKey = parseCoordinates(current.x, current.y);
  
  while (cameFrom.has(currentKey)) {
    const previousPosition = cameFrom.get(currentKey);
    if (previousPosition === null) {
      // We've reached the start position
      break;
    }
    current = previousPosition;
    path.unshift(current);
    currentKey = parseCoordinates(current.x, current.y);
  }
  
  return path;
}

/**
 * @description Find path using A* algorithm
 * @param {Object} start - Start position with x, y coordinates
 * @param {Object} goal - Goal position with x, y coordinates  
 * @param {Object} gameState - Current game state
 * @returns {Array|null} Path array or null if no path exists
 */
export function findPath(start, goal, gameState) {
  const frontier = new PriorityQueue();
  frontier.put(start, 0);
  
  const cameFrom = new Map();
  const costSoFar = new Map();
  
  const startKey = parseCoordinates(start.x, start.y);
  const goalKey = parseCoordinates(goal.x, goal.y);
  
  cameFrom.set(startKey, null);
  costSoFar.set(startKey, 0);
  
  while (!frontier.empty()) {
    const current = frontier.get();
    const currentKey = parseCoordinates(current.x, current.y);
    
    if (currentKey === goalKey) {
      return reconstructPath(cameFrom, current);
    }
    
    for (const neighbor of getNeighbors(current, gameState)) {
      const neighborKey = parseCoordinates(neighbor.x, neighbor.y);
      const newCost = costSoFar.get(currentKey) + 1; // Each move costs 1
      
      if (!costSoFar.has(neighborKey) || newCost < costSoFar.get(neighborKey)) {
        costSoFar.set(neighborKey, newCost);
        const priority = newCost + heuristic(neighbor, goal);
        frontier.put(neighbor, priority);
        cameFrom.set(neighborKey, current);
      }
    }
  }
  
  return null; // No path found
}

/**
 * @description Calculate the total distance of visiting food in given order
 * @param {Object} start - Starting position
 * @param {Array} foodOrder - Order to visit food items
 * @param {Object} gameState - Current game state
 * @returns {number|null} Total distance or null if any path segment fails
 */
function calculateTotalFoodDistance(start, foodOrder, gameState) {
  let totalDistance = 0;
  let currentPos = start;
  
  for (const food of foodOrder) {
    const path = findPath(currentPos, food, gameState);
    if (!path) return null; // No path to this food
    
    totalDistance += path.length - 1; // Subtract 1 because path includes start position
    currentPos = food;
  }
  
  return totalDistance;
}

/**
 * @description Generate all permutations of an array
 * @param {Array} arr - Array to permute
 * @returns {Array} Array of all permutations
 */
function getPermutations(arr) {
  if (arr.length <= 1) return [arr];
  
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    const perms = getPermutations(rest);
    for (const perm of perms) {
      result.push([arr[i]].concat(perm));
    }
  }
  return result;
}

/**
 * @description Find optimal path to visit multiple food items
 * @param {Object} gameState - Current game state
 * @param {number} maxFood - Maximum number of food items to target
 * @returns {Object|null} Result with path, foodOrder, and totalDistance or null
 */
export function findMultipleFoodPath(gameState, maxFood = 3) {
  const { board, you } = gameState;
  
  if (!board.food || board.food.length === 0) {
    return null;
  }
  
  // Limit food items to consider
  const foodToConsider = board.food.slice(0, Math.min(maxFood, board.food.length));
  
  if (foodToConsider.length === 1) {
    // Simple case: only one food item
    const path = findPath(you.head, foodToConsider[0], gameState);
    return path ? {
      path,
      foodOrder: foodToConsider,
      totalDistance: path.length - 1
    } : null;
  }
  
  // Find best order to visit multiple food items (Traveling Salesman Problem)
  const permutations = getPermutations(foodToConsider);
  let bestResult = null;
  let bestDistance = Infinity;
  
  for (const foodOrder of permutations) {
    const distance = calculateTotalFoodDistance(you.head, foodOrder, gameState);
    if (distance !== null && distance < bestDistance) {
      bestDistance = distance;
      bestResult = {
        foodOrder,
        totalDistance: distance
      };
    }
  }
  
  if (bestResult) {
    // Build the complete path for the best order
    let completePath = [];
    let currentPos = you.head;
    
    for (const food of bestResult.foodOrder) {
      const segmentPath = findPath(currentPos, food, gameState);
      if (!segmentPath) return null;
      
      // Add segment to complete path (skip first element to avoid duplication)
      if (completePath.length === 0) {
        completePath = completePath.concat(segmentPath);
      } else {
        completePath = completePath.concat(segmentPath.slice(1));
      }
      currentPos = food;
    }
    
    return {
      path: completePath,
      foodOrder: bestResult.foodOrder,
      totalDistance: bestResult.totalDistance
    };
  }
  
  return null;
}

/**
 * @description Find best hunting path to smaller snakes
 * @param {Object} gameState - Current game state
 * @returns {Object|null} Result with path and target or null
 */
export function findBestHuntingPath(gameState) {
  const { you } = gameState;

  // 1. Basic hunting criteria
  if (you.health < 30 || you.length < 3) {
    return null;
  }

  // 2. Find all huntable snakes
  const huntableSnakes = getHuntableSnakes(gameState);
  if (huntableSnakes.length === 0) {
    return null;
  }

  // 3. Find the single closest huntable snake
  const closestTarget = findClosestTarget(gameState, huntableSnakes);
  if (!closestTarget) {
    return null;
  }

  // 4. Find the path to an attack square next to the ONLY the closest target's head
  const attackGoals = getValidMovesFromPosition(
    gameState,
    closestTarget.head
  );
  if (attackGoals.length === 0) {
    return null; // Target is boxed in
  }

  let bestPath = null;
  let shortestDistance = Infinity;

  // 5. Find the shortest A* path to one of the attack goals
  for (const goal of attackGoals) {
    const path = findPath(you.head, goal, gameState);
    if (path && path.length < shortestDistance) {
      shortestDistance = path.length;
      bestPath = path;
    }
  }

  // 6. Return the result
  return bestPath
    ? {
        path: bestPath,
        target: closestTarget,
        distance: shortestDistance - 1,
      }
    : null;
}

/**
 * @description Get next move direction from path
 * @param {Array} path - Path array with positions
 * @param {Object} currentHead - Current head position
 * @returns {string|null} Direction string or null
 */
export function getNextMoveFromPath(path, currentHead) {
  if (!path || path.length < 2) return null;
  
  const nextPosition = path[1]; // Next position in path
  const dx = nextPosition.x - currentHead.x;
  const dy = nextPosition.y - currentHead.y;
  
  if (dx === 1) return "right";
  if (dx === -1) return "left";
  if (dy === 1) return "up";    // In your coordinate system, y increases going up
  if (dy === -1) return "down";  // y decreases going down
  
  return null;
} 