/**
 * @file avoidGoingBackwards.js
 * @description This file contains a function that prevents the snake from moving backwards into its tail,
 * which would result in an immediate collision and game over.
 * @module src/utils/moves/avoidGoingBackwards
 * @requires module:src/helper/snake/body
 */

import { getHead, getNeck } from "../../helper/snake/body.js";

/**
 * @description This function determines which direction would cause the snake to move backwards
 * into its own tail and marks that direction as unsafe. This prevents the most basic form of
 * self-collision by comparing the head's position to the tail's position.
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
 *       { x: 5, y: 4 },  // Tail
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
 * //   down: false,  // Moving down would go backwards into tail
 * // }
 */
export function avoidGoingBackwards(gameState, isMoveSafe) {
  const myHead = getHead(gameState);
  const myTail = getNeck(gameState);

  if (myTail.x < myHead.x) isMoveSafe.left = false;
  else if (myTail.x > myHead.x) isMoveSafe.right = false;
  else if (myTail.y < myHead.y) isMoveSafe.down = false;
  else if (myTail.y > myHead.y) isMoveSafe.up = false;

  return isMoveSafe;
}
