/**
 * @file huntSmallerSnakes.js
 * @description This file contains logic to hunt and eliminate smaller snakes.
 * The snake will actively pursue snakes that are smaller than itself.
 * @module src/utils/moves/huntSmallerSnakes
 * @requires module:src/helper/sets/moves
 * @requires module:src/helper/snake/body
 * @requires module:src/helper/sets/adjacentPositions
 * @requires module:src/helper/sets/coordinates
 */

import { getMoves } from "../../helper/sets/moves.js";
import { getHead } from "../../helper/snake/body.js";
import {
  getLeftAdjacentPosition,
  getRightAdjacentPosition,
  getUpAdjacentPosition,
  getDownAdjacentPosition,
} from "../../helper/sets/adjacentPositions.js";
import { parseCoordinates } from "../../helper/sets/coordinates.js";

/**
 * @description Calculates the Manhattan distance between two points
 * @param {Object} point1 - First point with x and y coordinates
 * @param {Object} point2 - Second point with x and y coordinates
 * @returns {number} The Manhattan distance between the two points
 */
function getManhattanDistance(point1, point2) {
  return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}

/**
 * @description Checks if a snake is smaller than our snake
 * @param {Object} ourSnake - Our snake object
 * @param {Object} otherSnake - The other snake to compare
 * @returns {boolean} True if the other snake is smaller
 */
function isSmallerSnake(ourSnake, otherSnake) {
  return otherSnake.id !== ourSnake.id && otherSnake.length < ourSnake.length;
}

/**
 * @description Filters out snakes that are not worth hunting
 * @param {Object} ourSnake - Our snake object
 * @param {Object} targetSnake - The potential target snake
 * @returns {boolean} True if the snake is worth hunting
 */
function isWorthwhileTarget(ourSnake, targetSnake) {
  const sizeDifference = ourSnake.length - targetSnake.length;
  return sizeDifference >= 2; // Only hunt if we're at least 2 segments larger
}

/**
 * @description Finds all snakes that are smaller and worth hunting
 * @param {Object} gameState - The current state of the game
 * @returns {Object[]} Array of smaller snake objects worth hunting
 */
function getHuntableSnakes(gameState) {
  return gameState.board.snakes
    .filter((snake) => isSmallerSnake(gameState.you, snake))
    .filter((snake) => isWorthwhileTarget(gameState.you, snake));
}

/**
 * @description Finds the closest huntable snake
 * @param {Object} gameState - The current state of the game
 * @param {Object[]} huntableSnakes - Array of huntable snakes
 * @returns {Object|null} The closest huntable snake or null if none found
 */
function findClosestTarget(gameState, huntableSnakes) {
  if (huntableSnakes.length === 0) return null;

  const myHead = getHead(gameState);

  return huntableSnakes.reduce((closest, snake) => {
    const distance = getManhattanDistance(myHead, snake.head);
    const closestDistance = closest ? getManhattanDistance(myHead, closest.head) : Infinity;
    return distance < closestDistance ? snake : closest;
  }, null);
}

/**
 * @description Gets adjacent positions for a given position
 * @param {Object} position - Position with x and y coordinates
 * @returns {Object[]} Array of adjacent positions with directions
 */
function getAdjacentPositions(position) {
  return [
    { direction: "left", position: getLeftAdjacentPosition(position) },
    { direction: "right", position: getRightAdjacentPosition(position) },
    { direction: "up", position: getUpAdjacentPosition(position) },
    { direction: "down", position: getDownAdjacentPosition(position) },
  ];
}

/**
 * @description Checks if a position is valid (within bounds and not occupied)
 * @param {Object} gameState - The current state of the game
 * @param {string} positionStr - Position string in "x,y" format
 * @returns {boolean} True if the position is valid
 */
function isValidPosition(gameState, positionStr) {
  const [x, y] = positionStr.split(",").map(Number);

  // Check boundaries
  if (x < 0 || x >= gameState.board.width || y < 0 || y >= gameState.board.height) {
    return false;
  }

  // Check collision with any snake body
  return !gameState.board.snakes.some((snake) =>
    snake.body.some((segment) => parseCoordinates(segment.x, segment.y) === positionStr),
  );
}

/**
 * @description Gets valid moves for a snake from a given position
 * @param {Object} gameState - The current state of the game
 * @param {Object} position - The position to check moves from
 * @returns {Object[]} Array of valid adjacent positions
 */
function getValidMovesFromPosition(gameState, position) {
  return getAdjacentPositions(position)
    .filter(({ position: pos }) => isValidPosition(gameState, pos))
    .map(({ position: pos }) => {
      const [x, y] = pos.split(",").map(Number);
      return { x, y };
    });
}

/**
 * @description Calculates the best interception move when close to target
 * @param {Object} gameState - The current state of the game
 * @param {Object} targetSnake - The snake we're hunting
 * @param {Object} safeMoveDistances - Object with safe move directions and distances
 * @returns {string|null} The best interception move or null
 */
function calculateInterceptionMove(gameState, targetSnake, safeMoveDistances) {
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
function getClosestMove(moveDistances) {
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
function calculateSafeMoveDistances(gameState, targetSnake, isMoveSafe) {
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
function shouldAttemptInterception(myHead, targetHead) {
  const distance = getManhattanDistance(myHead, targetHead);
  return distance <= 2;
}

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
