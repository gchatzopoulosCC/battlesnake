/**
 * @file bodySet.js
 * @description This file contains a function to create a Set of the snake's body segments (excluding the head).
 * This Set is used for efficient collision detection when evaluating potential moves.
 * @module src/utils/sets/bodySet
 * @requires module:src/common/snake/body
 */

import { getTail } from "../../common/snake/body";

/**
 * @description Creates a Set containing string representations of the snake's body segments, 
 * excluding the head. The segments are represented as coordinate strings in the format "x,y".
 * This function is crucial for self-collision detection in the avoidSelf strategy.
 * 
 * @param {Object} gameState - The current state of the game.
 * @param {Object} gameState.you - The player's snake object.
 * @param {Object[]} gameState.you.body - An array of objects representing the snake's body segments.
 * @returns {Set<string>} A Set containing string representations of the snake's body segments (excluding the head).
 * 
 * @example
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
 * const bodySet = getBodySet(gameState);
 * // Returns a Set containing: "5,4", "6,4"
 * 
 * // The Set can be used to check if a position would collide with the snake's body:
 * bodySet.has("5,4"); // true
 * bodySet.has("6,4"); // true
 * bodySet.has("5,5"); // false (head is excluded)
 */
export function getBodySet(gameState) {
  return new Set(getTail(gameState).map((segment) => `${segment.x},${segment.y}`));
}
