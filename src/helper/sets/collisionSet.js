/**
 * @file collisionSet.js
 * @description This file contains a function to create a Set of positions occupied by other snakes on the board.
 * This Set is used for efficient collision detection when evaluating potential moves during gameplay.
 * @module src/helper/sets/collisionSet
 */

/**
 * @description Creates a Set containing string representations of all segments of other snakes on the board.
 * This is used to check if a move would result in a collision with another snake, which would end the game.
 *
 * @param {Object} gameState - The current state of the game.
 * @param {Object} gameState.board - The board object containing game information.
 * @param {Object[]} gameState.board.snakes - An array of all snakes on the board.
 * @param {Object} gameState.you - The player's snake object.
 * @param {string} gameState.you.id - The unique identifier for the player's snake.
 * @returns {Set<string>} A Set containing string representations of positions occupied by other snakes.
 *
 * @example
 * const gameState = {
 *   board: {
 *     snakes: [
 *       {
 *         id: "snake-1",
 *         body: [
 *           { x: 5, y: 5 },
 *           { x: 5, y: 6 }
 *         ]
 *       },
 *       {
 *         id: "snake-2",
 *         body: [
 *           { x: 7, y: 8 },
 *           { x: 7, y: 7 }
 *         ]
 *       }
 *     ]
 *   },
 *   you: {
 *     id: "snake-1"
 *   }
 * };
 *
 * const collisionSet = getCollisionSet(gameState);
 * // Returns a Set containing: "7,8", "7,7"
 *
 * // The Set can be used to check if a move would result in a collision:
 * collisionSet.has("7,8"); // true
 * collisionSet.has("5,5"); // false (player's snake positions are excluded)
 */
export function getCollisionSet(gameState) {
  const otherSnakes = gameState.board.snakes.filter((snake) => snake.id !== gameState.you.id);

  const collisionCoordinates = otherSnakes
    .flatMap((snake) => snake.body)
    .map((segment) => `${segment.x},${segment.y}`);

  return new Set(collisionCoordinates);
}
