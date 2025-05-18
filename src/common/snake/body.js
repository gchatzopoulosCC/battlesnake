/**
 * @file body.js
 * @description This file contains functions to get the head and tail of the snake.
 * @module src/common/snake
 */

/**
 * @description This function returns the head of the snake
 * @param {Object} gameState
 * @param {Object} gameState.you - The snake object
 * @returns {Object} - The head of the snake, represented as an object with `x` and `y` coordinates.
 * @example
 * const gameState = {
 *  you: {
 *   body: [
 *    { x: 1, y: 1 },
 *    { x: 1, y: 2 },
 *   ],
 *  },
 * };
 * getHead(gameState); // Returns { x: 1, y: 1 }
 */
function getHead(gameState) {
  return gameState.you.body[0];
}

/**
 * @description This function returns the tail of the snake
 * @param {Object} gameState
 * @param {Object} gameState.you - The snake object
 * @returns {Object[]} - An array of objects representing the snake's body segments, excluding the head.
 * @example
 * const gameState = {
 *  you: {
 *   body: [
 *    { x: 1, y: 1 },
 *    { x: 1, y: 2 },
 *   ],
 *  },
 * };
 * getTail(gameState); // Returns [{ x: 1, y: 2 }]
 */
function getTail(gameState) {
  return gameState.you.body.slice(1);
}

export { getHead, getTail };
