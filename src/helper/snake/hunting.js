/**
 * @file hunting.js
 * @description This file contains helper functions for hunting logic including target selection and filtering.
 * @module src/helper/snake/hunting
 */

import { getHead } from "./body.js";
import { getManhattanDistance } from "../sets/coordinates.js";

/**
 * @description Checks if a snake is smaller than our snake
 * @param {Object} ourSnake - Our snake object
 * @param {Object} otherSnake - The other snake to compare
 * @returns {boolean} True if the other snake is smaller
 */
export function isSmallerSnake(ourSnake, otherSnake) {
  return otherSnake.id !== ourSnake.id && otherSnake.length < ourSnake.length;
}

/**
 * @description Filters out snakes that are not worth hunting
 * @param {Object} ourSnake - Our snake object
 * @param {Object} targetSnake - The potential target snake
 * @returns {boolean} True if the snake is worth hunting
 */
export function isWorthwhileTarget(ourSnake, targetSnake) {
  const sizeDifference = ourSnake.length - targetSnake.length;
  return sizeDifference >= 2; // Only hunt if we're at least 2 segments larger
}

/**
 * @description Finds all snakes that are smaller and worth hunting
 * @param {Object} gameState - The current state of the game
 * @returns {Object[]} Array of smaller snake objects worth hunting
 */
export function getHuntableSnakes(gameState) {
  return gameState.board.snakes
    .filter((snake) => isSmallerSnake(gameState.you, snake))
    .filter((snake) => isWorthwhileTarget(gameState.you, snake));
}

/**
 * @description Finds the closest huntable snake
 * @param {Object} gameState - The current state of the game
 * @param {Object[]} huntableSnakes - Array of huntable snakes
 * @returns {Object|null} The closest huntable snake or null if none found
 */
export function findClosestTarget(gameState, huntableSnakes) {
  if (huntableSnakes.length === 0) return null;

  const myHead = getHead(gameState);

  return huntableSnakes.reduce((closest, snake) => {
    const distance = getManhattanDistance(myHead, snake.head);
    const closestDistance = closest ? getManhattanDistance(myHead, closest.head) : Infinity;
    return distance < closestDistance ? snake : closest;
  }, null);
}
