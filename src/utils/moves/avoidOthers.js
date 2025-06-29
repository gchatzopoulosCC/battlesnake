/**
 * @file avoidOthers.js
 * @description This file contains a function to check for collisions with other snakes and update
 * the isMoveSafe object accordingly.
 * @module src/utils/moves/avoidOthers
 * @requires module:src/helper/sets/collisionSet
 * @requires module:src/helper/moves/avoidanceChecker
 */

import { getCollisionSet } from "../../helper/sets/collisionSet.js";
import { createAvoidanceChecker } from "../../helper/moves/avoidanceChecker.js";

const avoidanceChecker = createAvoidanceChecker(getCollisionSet);

/**
 * @description This function checks for potential collisions with other snakes on the board
 * and updates the isMoveSafe object accordingly to avoid those collisions. It uses the collision
 * set to determine if any adjacent positions contain other snakes' body segments.
 *
 * @param {Object} gameState - The current state of the game.
 * @param {Object} gameState.board - The board object containing game board information.
 * @param {Object[]} gameState.board.snakes - An array of all snakes on the board.
 * @param {Object} gameState.you - The player's snake object.
 * @param {string} gameState.you.id - The unique identifier for the player's snake.
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
 *     snakes: [
 *       {
 *         id: "snake-1",
 *         body: [
 *           { x: 5, y: 5 },
 *           { x: 5, y: 6 },
 *         ]
 *       },
 *       {
 *         id: "snake-2",
 *         body: [
 *           { x: 7, y: 8 },
 *           { x: 7, y: 7 },
 *         ]
 *       }
 *     ]
 *   },
 *   you: {
 *     id: "snake-1",
 *     body: [
 *       { x: 5, y: 5 },
 *       { x: 5, y: 6 },
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
 * avoidOthers(gameState, isMoveSafe);
 * // After calling this function, isMoveSafe will be updated
 * // to mark any moves that would collide with other snakes as unsafe
 */
export function avoidOthers(gameState, isMoveSafe) {
  avoidanceChecker(gameState, isMoveSafe);

  return isMoveSafe;
}
