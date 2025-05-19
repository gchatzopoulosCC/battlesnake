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
 * // Updates isMoveSafe to mark moves that would collide with body as unsafe
 */
export function createAvoidanceChecker(getSetFunction) {
  return function checkAvoidance(gameState, isMoveSafe) {
    const map = getSetFunction(gameState);
    const moves = getMoves(gameState);

    for (const move of moves) {
      if (map.has(move.adjacentPosition)) {
        isMoveSafe[move.direction] = false;
      }
    }
  };
}
