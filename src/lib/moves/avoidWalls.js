/**
 * @file avoidWalls.js
 * @description This module contains a function to check if the snake is at the 
 * edge of the board and update the isMoveSafe object accordingly.
 * @module src/lib/moves/avoidWalls
 */

/**
 * @description This function checks if the snake is at the edge of the board
 * and updates the isMoveSafe object accordingly.
 * @param {Object} gameState - The current state of the game.
 * @param {Object} isMoveSafe - An object containing the possible moves and their safety status.
 * @param {boolean} isMoveSafe.up - Indicates if moving up is safe.
 * @param {boolean} isMoveSafe.down - Indicates if moving down is safe.
 * @param {boolean} isMoveSafe.left - Indicates if moving left is safe.
 * @param {boolean} isMoveSafe.right - Indicates if moving right is safe.
 * @returns {Object} The updated isMoveSafe object.
 * @example
 * const gameState = {
 *  board: {
 *   width: 11,
 *   height: 11,
 *  },
 *  you: {
 *    body: [
 *      { x: 5, y: 5 },
 *      { x: 5, y: 4 },
 *      { x: 5, y: 3 },
 *    ],
 *  },
 * };
 * const isMoveSafe = {
 *  left: true,
 *  right: true,
 *  up: true,
 *  down: true,
 * };
 * 
 * avoidWalls(gameState, isMoveSafe);
 */
export function avoidWalls(gameState, isMoveSafe) {
  const { width: boardWidth, height: boardHeight } = gameState.board;
  const { x, y } = gameState.you.body[0];

  if (x === 0) isMoveSafe.left = false;
  if (x === boardWidth - 1) isMoveSafe.right = false;
  if (y === 0) isMoveSafe.down = false;
  if (y === boardHeight - 1) isMoveSafe.up = false;

  return isMoveSafe;
}
