/**
 * @file floodFill.js
 * @description This file contains a flood fill algorithm implementation to calculate
 * the number of reachable cells from each possible move direction. This helps the snake
 * avoid getting trapped in small spaces.
 * @module src/utils/moves/floodFill
 * @requires module:src/helper/snake/body
 * @requires module:src/helper/sets/collisionSet
 * @requires module:src/helper/sets/bodySet
 * @requires module:src/helper/sets/validation
 * @requires module:src/helper/sets/coordinates
 */

import { getHead } from "../../helper/snake/body.js";
import { getCollisionSet } from "../../helper/sets/collisionSet.js";
import { getBodySet } from "../../helper/sets/bodySet.js";
import { getAdjacentPositions } from "../../helper/sets/validation.js";
import { parseCoordinates } from "../../helper/sets/coordinates.js";

/**
 * @description Calculates the number of reachable cells from each possible move direction
 * using a flood fill algorithm. This helps determine which moves lead to more open space
 * and avoid getting trapped.
 *
 * @param {Object} gameState - The current state of the game.
 * @param {Object} gameState.board - The board object containing game board information.
 * @param {number} gameState.board.width - The width of the game board.
 * @param {number} gameState.board.height - The height of the game board.
 * @param {Object[]} gameState.board.snakes - Array of all snakes on the board.
 * @param {Object[]} gameState.board.food - Array of food positions on the board.
 * @param {Object} gameState.you - The player's snake object.
 * @param {Object[]} gameState.you.body - An array of objects representing the snake's body segments.
 * @param {Object} possibleMoves - An object representing which moves are valid.
 * @param {boolean} possibleMoves.left - Indicates if moving left is possible.
 * @param {boolean} possibleMoves.right - Indicates if moving right is possible.
 * @param {boolean} possibleMoves.up - Indicates if moving up is possible.
 * @param {boolean} possibleMoves.down - Indicates if moving down is possible.
 *
 * @returns {Object} An object with the count of reachable cells for each direction.
 * @returns {number} returns.up - Number of cells reachable if moving up.
 * @returns {number} returns.down - Number of cells reachable if moving down.
 * @returns {number} returns.left - Number of cells reachable if moving left.
 * @returns {number} returns.right - Number of cells reachable if moving right.
 *
 * @example
 * const gameState = {
 *   board: {
 *     width: 11,
 *     height: 11,
 *     snakes: [],
 *     food: []
 *   },
 *   you: {
 *     body: [{ x: 5, y: 5 }]
 *   }
 * };
 * 
 * const possibleMoves = { up: true, down: true, left: true, right: true };
 * const result = floodFill(gameState, possibleMoves);
 * // result = { up: 120, down: 120, left: 120, right: 120 }
 */
export function floodFill(gameState, possibleMoves) {
  const { width: boardWidth, height: boardHeight } = gameState.board;
  const head = getHead(gameState);
  
  // Get all blocked positions
  const blockedPositions = getBlockedPositions(gameState);
  
  // Calculate reachable cells for each direction
  const result = {
    up: 0,
    down: 0,
    left: 0,
    right: 0
  };

  // Get adjacent positions using existing function
  const adjacentPositions = getAdjacentPositions(head);

  // For each possible move direction, calculate reachable cells
  for (const [direction, isPossible] of Object.entries(possibleMoves)) {
    if (!isPossible) {
      result[direction] = 0;
      continue;
    }

    // Find the adjacent position for this direction
    const adjacentPos = adjacentPositions.find(adj => adj.direction === direction);
    if (!adjacentPos) {
      result[direction] = 0;
      continue;
    }

    const [x, y] = adjacentPos.position.split(',').map(Number);

    // Check if the new position is valid
    if (x < 0 || x >= boardWidth || y < 0 || y >= boardHeight) {
      result[direction] = 0;
      continue;
    }

    // Perform flood fill from the new position
    result[direction] = performFloodFill(blockedPositions, x, y, boardWidth, boardHeight);
  }

  return result;
}

/**
 * @description Creates a Set of all blocked positions on the board including snake bodies.
 * @private
 * 
 * @param {Object} gameState - The current game state.
 * @returns {Set<string>} A Set containing string representations of blocked positions.
 */
function getBlockedPositions(gameState) {
  // Get positions occupied by other snakes
  const otherSnakesPositions = getCollisionSet(gameState);
  
  // Get our own body positions, excluding head
  // For now, we include the tail in blocked positions to be more conservative
  // This helps detect self-encirclement scenarios
  const ourBodyPositions = getBodySet(gameState);
  
  // Combine all blocked positions
  const allBlocked = new Set([...otherSnakesPositions, ...ourBodyPositions]);
  
  return allBlocked;
}

/**
 * @description Performs a flood fill algorithm from a starting position to count reachable cells.
 * @private
 * 
 * @param {Set<string>} blockedPositions - Set of blocked positions in "x,y" format.
 * @param {number} startX - Starting X coordinate.
 * @param {number} startY - Starting Y coordinate.
 * @param {number} width - Board width.
 * @param {number} height - Board height.
 * @returns {number} The number of reachable cells.
 */
function performFloodFill(blockedPositions, startX, startY, width, height) {
  const startPos = parseCoordinates(startX, startY);
  
  // If starting position is blocked, return 0
  if (blockedPositions.has(startPos)) {
    return 0;
  }

  const visited = new Set();
  const queue = [{ x: startX, y: startY }];
  visited.add(startPos);
  let count = 0;

  while (queue.length > 0) {
    const current = queue.shift();
    count++;

    // Get adjacent positions using existing function
    const adjacentPositions = getAdjacentPositions(current);

    // Check all four directions
    for (const adj of adjacentPositions) {
      const [newX, newY] = adj.position.split(',').map(Number);

      // Check if the new position is valid and not visited
      if (newX >= 0 && newX < width && 
          newY >= 0 && newY < height && 
          !visited.has(adj.position) && 
          !blockedPositions.has(adj.position)) {
        visited.add(adj.position);
        queue.push({ x: newX, y: newY });
      }
    }
  }

  // Don't count the starting position
  return count - 1;
} 