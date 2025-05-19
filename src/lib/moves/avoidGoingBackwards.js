/**
 * @file avoidGoingBackwards.js
 * @description This file contains a function that disables backwards moves.
 * @module src/lib/moves/avoidGoingBackwards 
 */


/**
 * @description This function disables the moves that would make the snake go backwards (colliding with itself).
 * @param {Object} gameState - The current game state.
 * @param {Object} isMoveSafe - An object representing the safety of each move.
 * @param {boolean} isMoveSafe.left - Indicates if moving left is safe.
 * @param {boolean} isMoveSafe.right - Indicates if moving right is safe.
 * @param {boolean} isMoveSafe.up - Indicates if moving up is safe.
 * @param {boolean} isMoveSafe.down - Indicates if moving down is safe.
 * @returns {void} - This function modifies the isMoveSafe object in place.
 * It does not return anything.
 * @example
 * const gameState = {
 *  you: {
 *   body: [
 *    { x: 5, y: 5 },
 *    { x: 5, y: 4 },
 *    { x: 5, y: 3 },
 *   ],
 *  },
 * };
 * const isMoveSafe = {
 *  left: true,
 *  right: true,
 *  up: true,
 *  down: true,
 * };
 * 
 * avoidGoingBackwards(gameState, isMoveSafe);
 * // After calling this function, isMoveSafe will be modified to indicate
 * // that moving down is not a safe move.
 */
export function avoidGoingBackwards(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];

  if (myNeck.x < myHead.x) isMoveSafe.left = false;
  else if (myNeck.x > myHead.x) isMoveSafe.right = false;
  else if (myNeck.y < myHead.y) isMoveSafe.down = false;
  else if (myNeck.y > myHead.y) isMoveSafe.up = false;
}
