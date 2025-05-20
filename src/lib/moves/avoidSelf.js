/**
 * @file avoidSelf.js
 * @description This file contains a function to check for collisions with the snake's own body
 * and update the isMoveSafe object accordingly. Avoiding self-collisions is critical for survival
 * as running into your own body ends the game immediately.
 * @module src/lib/moves/avoidSelf
 * @requires module:src/utils/sets/bodySet
 * @requires module:src/utils/moves/avoidanceChecker
 */

import { getBodySet } from "../../utils/sets/bodySet.js";
import { createAvoidanceChecker } from "../../utils/moves/avoidanceChecker.js";

const avoidanceChecker = createAvoidanceChecker(getBodySet);

/**
 * @description This function checks for potential collisions with the snake's own body
 * and updates the isMoveSafe object accordingly to avoid self-collisions. It uses a specialized
 * avoidance checker that works with a set of the snake's body segments (excluding the head).
 *
 * @param {Object} gameState - The current state of the game.
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
 *   you: {
 *     body: [
 *       { x: 5, y: 5 },  // Head
 *       { x: 5, y: 4 },
 *       { x: 6, y: 4 },
 *       { x: 6, y: 5 }
 *     ]
 *   }
 * };
 *
 * const isMoveSafe = {
 *   left: true,
 *   right: true,
 *   up: true,
 *   down: true,
 * };
 *
 * avoidSelf(gameState, isMoveSafe);
 * // After calling this function:
 * // isMoveSafe = {
 * //   left: true,
 * //   right: true,
 * //   up: true,
 * //   down: false,  // Moving down would collide with body at "5,4"
 * // }
 */
export function avoidSelf(gameState, isMoveSafe) {
  avoidanceChecker(gameState, isMoveSafe);

  return isMoveSafe;
}
