/**
 * @file validation.js
 * @description This file contains helper functions for position and move validation.
 * @module src/helper/sets/validation
 */

import { parseCoordinates } from "./coordinates.js";
import {
  getLeftAdjacentPosition,
  getRightAdjacentPosition,
  getUpAdjacentPosition,
  getDownAdjacentPosition,
} from "./adjacentPositions.js";

/**
 * @description Gets adjacent positions for a given position
 * @param {Object} position - Position with x and y coordinates
 * @returns {Object[]} Array of adjacent positions with directions
 */
export function getAdjacentPositions(position) {
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
export function isValidPosition(gameState, positionStr) {
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
export function getValidMovesFromPosition(gameState, position) {
  return getAdjacentPositions(position)
    .filter(({ position: pos }) => isValidPosition(gameState, pos))
    .map(({ position: pos }) => {
      const [x, y] = pos.split(",").map(Number);
      return { x, y };
    });
}
