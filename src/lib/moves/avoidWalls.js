/**
 * @file avoidWalls.js
 * @description This file contains a function to check if the snake is at the
 * edge of the board and update the isMoveSafe object accordingly to prevent wall collisions.
 * @module src/lib/moves/avoidWalls
 */

import { getHead } from "../../common/snake/body";

/**
 * @description This function checks if the snake's head is at the edge of the game board
 * and updates the isMoveSafe object to prevent the snake from moving off the board.
 * Hitting the boundary of the game board results in an immediate game over.
 *
 * @param {Object} gameState - The current state of the game.
 * @param {Object} gameState.board - The board object containing game board information.
 * @param {number} gameState.board.width - The width of the game board.
 * @param {number} gameState.board.height - The height of the game board.
 * @param {Object} gameState.you - The player's snake object.
 * @param {Object[]} gameState.you.body - An array of objects representing the snake's body segments.
 * @param {Object} isMoveSafe - An object representing the safety of each move.
 * @param {boolean} isMoveSafe.left - Indicates if moving left is safe.
 * @param {boolean} isMoveSafe.right - Indicates if moving right is safe.
 * @param {boolean} isMoveSafe.up - Indicates if moving up is safe.
 * @param {boolean} isMoveSafe.down - Indicates if moving down is safe.
 *
 * @returns {Object} The updated isMoveSafe object.
 *
 * @example
 * const gameState = {
 *   board: {
 *     width: 11,
 *     height: 11,
 *   },
 *   you: {
 *     body: [
 *       { x: 0, y: 5 },  // Head at left edge of board
 *       { x: 1, y: 5 },
 *       { x: 2, y: 5 },
 *     ],
 *   },
 * };
 *
 * const isMoveSafe = {
 *   left: true,
 *   right: true,
 *   up: true,
 *   down: true,
 * };
 *
 * avoidWalls(gameState, isMoveSafe);
 * // After calling this function:
 * // isMoveSafe = {
 * //   left: false,  // Moving left would hit the wall
 * //   right: true,
 * //   up: true,
 * //   down: true,
 * // }
 */
export function avoidWalls(gameState, isMoveSafe) {
  const { width: boardWidth, height: boardHeight } = gameState.board;
  const { x, y } = getHead(gameState);

  if (x === 0) isMoveSafe.left = false;
  if (x === boardWidth - 1) isMoveSafe.right = false;
  if (y === 0) isMoveSafe.down = false;
  if (y === boardHeight - 1) isMoveSafe.up = false;

  return isMoveSafe;
}
