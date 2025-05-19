/**
 * @file adjacentPositions.js
 * @description This file contains functions to get the adjacent positions of a given position on the game board.
 * @module src/common/sets/adjacentPositions
 * @requires module:src/common/sets/coordinates
 */

import { parseCoordinates } from "./coordinates.js";


/**
 * @description This function returns the left adjacent position of a given position.
 * It subtracts 1 from the x-coordinate of the position.
 * @param {Object} position - The current position of the snake's head.
 * @param {number} position.x - The x-coordinate of the position.
 * @param {number} position.y - The y-coordinate of the position.
 * @returns {Object} - The left adjacent position, represented as an object with `x` and `y` coordinates.
 * @example
 * const position = { x: 5, y: 5 };
 * getLeftAdjacentPosition(position); // Returns { x: 4, y: 5 }
 */
function getLeftAdjacentPosition(position) {
  return parseCoordinates(position.x - 1, position.y);
}


/**
 * @description This function returns the right adjacent position of a given position.
 * It subtracts 1 from the x-coordinate of the position.
 * @param {Object} position - The current position of the snake's head.
 * @param {number} position.x - The x-coordinate of the position.
 * @param {number} position.y - The y-coordinate of the position.
 * @returns {Object} - The right adjacent position, represented as an object with `x` and `y` coordinates.
 * @example
 * const position = { x: 5, y: 5 };
 * getRightAdjacentPosition(position); // Returns { x: 6, y: 5 }
 */
function getRightAdjacentPosition(position) {
  return parseCoordinates(position.x + 1, position.y);
}


/**
 * @description This function returns the up adjacent position of a given position.
 * It subtracts 1 from the x-coordinate of the position.
 * @param {Object} position - The current position of the snake's head.
 * @param {number} position.x - The x-coordinate of the position.
 * @param {number} position.y - The y-coordinate of the position.
 * @returns {Object} - The up adjacent position, represented as an object with `x` and `y` coordinates.
 * @example
 * const position = { x: 5, y: 5 };
 * getUpAdjacentPosition(position); // Returns { x: 5, y: 6 }
 */
function getUpAdjacentPosition(position) {
  return parseCoordinates(position.x, position.y + 1);
}


/**
 * @description This function returns the down adjacent position of a given position.
 * It subtracts 1 from the x-coordinate of the position.
 * @param {Object} position - The current position of the snake's head.
 * @param {number} position.x - The x-coordinate of the position.
 * @param {number} position.y - The y-coordinate of the position.
 * @returns {Object} - The down adjacent position, represented as an object with `x` and `y` coordinates.
 * @example
 * const position = { x: 5, y: 5 };
 * getDownAdjacentPosition(position); // Returns { x: 5, y: 4 }
 */
function getDownAdjacentPosition(position) {
  return parseCoordinates(position.x, position.y - 1);
}

export {
  getLeftAdjacentPosition,
  getRightAdjacentPosition,
  getUpAdjacentPosition,
  getDownAdjacentPosition,
};
