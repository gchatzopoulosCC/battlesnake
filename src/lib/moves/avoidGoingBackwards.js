/**
 * @file avoidGoingBackwards.js
 * @description This file contains a function that prevents the snake from moving backwards into its neck,
 * which would result in an immediate collision and game over.
 * @module src/lib/moves/avoidGoingBackwards
 */


/**
 * @description This function determines which direction would cause the snake to move backwards
 * into its own neck and marks that direction as unsafe. This prevents the most basic form of
 * self-collision by comparing the head's position to the neck's position.
 * 
 * @param {Object} gameState - The current state of the game.
 * @param {Object} gameState.you - The player's snake object.
 * @param {Object[]} gameState.you.body - An array of objects representing the snake's body segments, starting with the head.
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
 *   you: {
 *     body: [
 *       { x: 5, y: 5 },  // Head
 *       { x: 5, y: 4 },  // Neck
 *       { x: 5, y: 3 },  // Tail
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
 * avoidGoingBackwards(gameState, isMoveSafe);
 * // After calling this function:
 * // isMoveSafe = {
 * //   left: true,
 * //   right: true,
 * //   up: true,
 * //   down: false,  // Moving down would go backwards into neck
 * // }
 */
export function avoidGoingBackwards(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];

  if (myNeck.x < myHead.x) isMoveSafe.left = false;
  else if (myNeck.x > myHead.x) isMoveSafe.right = false;
  else if (myNeck.y < myHead.y) isMoveSafe.down = false;
  else if (myNeck.y > myHead.y) isMoveSafe.up = false;

  return isMoveSafe;
}
