/**
 * @file avoidanceChecker.js
 * @description This file contains a factory function to create avoidance checkers that evaluate move safety.
 * @module src/utils/moves/avoidanceChecker
 * @requires module:src/common/sets/moves
 */

import { getMoves } from "../../common/sets/moves.js";

/**
 * @description Creates an avoidance checker function that uses a provided set function
 * to determine if moves are safe or not. The returned function checks each possible move
 * against a set of positions to avoid.
 *
 * @param {Function} getSetFunction - A function that takes a gameState and returns a Set of positions to avoid.
 * @returns {Function} A function that checks moves against the set of positions to avoid.
 *
 * @example
 * import { getBodySet } from "../../utils/sets/bodySet.js";
 *
 * // Create an avoidance checker that avoids the snake's own body
 * const bodyAvoidanceChecker = createAvoidanceChecker(getBodySet);
 *
 * // Use the checker to update isMoveSafe
 * const gameState = {
 *   you: {
 *     body: [
 *       { x: 5, y: 5 },  // Head
 *       { x: 5, y: 4 },
 *       { x: 6, y: 4 }
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
 * bodyAvoidanceChecker(gameState, isMoveSafe);
 * // After calling this function:
 * // isMoveSafe = {
 * //   left: true,
 * //   right: true,
 * //   up: true,
 * //   down: false,  // Moving down would collide with body at "5,4"
 * // }
 */
export function createAvoidanceChecker(getSetFunction) {
  /**
   * @description Checks if any possible moves would result in a collision with positions in the
   * avoidance set, and updates the isMoveSafe object accordingly.
   *
   * @param {Object} gameState - The current state of the game.
   * @param {Object} isMoveSafe - An object representing the safety of each move.
   * @param {boolean} isMoveSafe.left - Indicates if moving left is safe.
   * @param {boolean} isMoveSafe.right - Indicates if moving right is safe.
   * @param {boolean} isMoveSafe.up - Indicates if moving up is safe.
   * @param {boolean} isMoveSafe.down - Indicates if moving down is safe.
   *
   * @returns {void} - This function doesn't return a value but modifies the isMoveSafe object.
   */
  return function checkAvoidance(gameState, isMoveSafe) {
    const set = getSetFunction(gameState);
    const moves = getMoves(gameState);

    for (const move of moves) {
      if (set.has(move.adjacentPosition)) {
        isMoveSafe[move.direction] = false;
      }
    }
  };
}
