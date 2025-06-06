/**
 * @file body.js
 * @description This file contains utility functions to retrieve the head and tail segments of a snake.
 * These functions simplify access to the snake's body parts and are commonly used in movement logic.
 * @module src/common/snake/body
 */

/**
 * @description Returns the head (first segment) of the snake from the game state.
 * The head is used for determining the snake's current position and calculating possible moves.
 *
 * @param {Object} gameState - The current state of the game.
 * @param {Object} gameState.you - The player's snake object.
 * @param {Object[]} gameState.you.body - An array of objects representing the snake's body segments, starting with the head.
 * @returns {Object} - The head of the snake, represented as an object with `x` and `y` coordinates.
 *
 * @example
 * const gameState = {
 *   you: {
 *     body: [
 *       { x: 1, y: 1 },  // Head
 *       { x: 1, y: 2 },
 *     ],
 *   },
 * };
 * getHead(gameState); // Returns { x: 1, y: 1 }
 */
function getHead(gameState) {
  return gameState.you.body[0];
}

/**
 * @description Returns the head (first segment) of the snake from the game state.
 * The head is used for determining the snake's current position and calculating possible moves.
 *
 * @param {Object} gameState - The current state of the game.
 * @param {Object} gameState.you - The player's snake object.
 * @param {Object[]} gameState.you.body - An array of objects representing the snake's body segments, starting with the head.
 * @returns {Object} - The head of the snake, represented as an object with `x` and `y` coordinates.
 *
 * @example
 * const gameState = {
 *   you: {
 *     body: [
 *       { x: 1, y: 1 },  // Head
 *       { x: 1, y: 2 },  // Neck
 *       { x: 1, y: 3 },  // Rest of the tail
 *     ],
 *   },
 * };
 * getHead(gameState); // Returns { x: 1, y: 2 }
 */
function getNeck(gameState) {
  return gameState.you.body[1];
}

/**
 * @description Returns all body segments of the snake excluding the head.
 * The tail segments are used for collision detection to prevent self-collisions.
 *
 * @param {Object} gameState - The current state of the game.
 * @param {Object} gameState.you - The player's snake object.
 * @param {Object[]} gameState.you.body - An array of objects representing the snake's body segments, starting with the head.
 * @returns {Object[]} - An array of objects representing the snake's body segments, excluding the head.
 *
 * @example
 * const gameState = {
 *   you: {
 *     body: [
 *       { x: 1, y: 1 },  // Head
 *       { x: 1, y: 2 },
 *       { x: 2, y: 2 },
 *     ],
 *   },
 * };
 * getTail(gameState); // Returns [{ x: 1, y: 2 }, { x: 2, y: 2 }]
 */
function getTail(gameState) {
  return gameState.you.body.slice(1);
}

export { getHead, getNeck, getTail };
