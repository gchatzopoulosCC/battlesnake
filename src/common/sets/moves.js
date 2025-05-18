/**
 * @file moves.js
 * @description This file contains a utility function to retrieve all possible moves for the snake,
 * including their directions and adjacent positions.
 * @module src/common/sets/moves
 */

import * as pos from "./adjacentPositions.js";

/**
 * @description Retrieves all possible moves for the snake based on its current head position.
 * Each move includes the direction and the adjacent position it leads to.
 *
 * @param {Object} gameState - The current state of the game.
 * @param {Object} gameState.you - The player's snake object.
 * @param {Object[]} gameState.you.body - An array of objects representing the snake's body segments, starting with the head.
 * @returns {Object[]} - An array of possible moves, where each move is an object containing:
 *   - `direction` {string}: The direction of the move (`"left"`, `"right"`, `"up"`, `"down"`).
 *   - `adjacentPosition` {string}: The adjacent position in string format (`"x,y"`).
 *
 * @example
 * const gameState = {
 *   you: {
 *     body: [
 *       { x: 5, y: 5 },
 *       { x: 5, y: 4 },
 *     ],
 *   },
 * };
 * getMoves(gameState);
 * // Returns:
 * // [
 * //   { direction: "left", adjacentPosition: "4,5" },
 * //   { direction: "right", adjacentPosition: "6,5" },
 * //   { direction: "up", adjacentPosition: "5,6" },
 * //   { direction: "down", adjacentPosition: "5,4" },
 * // ]
 */
export function getMoves(gameState) {
  const head = gameState.you.body[0];
  const moves = [
    {
      direction: "left",
      adjacentPosition: pos.getLeftAdjacentPosition(head),
    },
    {
      direction: "right",
      adjacentPosition: pos.getRightAdjacentPosition(head),
    },
    {
      direction: "up",
      adjacentPosition: pos.getUpAdjacentPosition(head),
    },
    {
      direction: "down",
      adjacentPosition: pos.getDownAdjacentPosition(head),
    },
  ];

  return moves;
}
