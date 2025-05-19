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
 * @param {Object} position - The current position on the board.
 * @param {number} position.x - The x-coordinate of the position.
 * @param {number} position.y - The y-coordinate of the position.
 * @returns {string} - The left adjacent position in string format ("x,y").
 * @example
 * const position = { x: 5, y: 5 };
 * getLeftAdjacentPosition(position); // Returns "4,5"
 */
function getLeftAdjacentPosition(position) {
  return parseCoordinates(position.x - 1, position.y);
}


/**
 * @description This function returns the right adjacent position of a given position.
 * It adds 1 to the x-coordinate of the position.
 * @param {Object} position - The current position on the board.
 * @param {number} position.x - The x-coordinate of the position.
 * @param {number} position.y - The y-coordinate of the position.
 * @returns {string} - The right adjacent position in string format ("x,y").
 * @example
 * const position = { x: 5, y: 5 };
 * getRightAdjacentPosition(position); // Returns "6,5"
 */
function getRightAdjacentPosition(position) {
  return parseCoordinates(position.x + 1, position.y);
}


/**
 * @description This function returns the up adjacent position of a given position.
 * It adds 1 to the y-coordinate of the position.
 * @param {Object} position - The current position on the board.
 * @param {number} position.x - The x-coordinate of the position.
 * @param {number} position.y - The y-coordinate of the position.
 * @returns {string} - The up adjacent position in string format ("x,y").
 * @example
 * const position = { x: 5, y: 5 };
 * getUpAdjacentPosition(position); // Returns "5,6"
 */
function getUpAdjacentPosition(position) {
  return parseCoordinates(position.x, position.y + 1);
}


/**
 * @description This function returns the down adjacent position of a given position.
 * It subtracts 1 from the y-coordinate of the position.
 * @param {Object} position - The current position on the board.
 * @param {number} position.x - The x-coordinate of the position.
 * @param {number} position.y - The y-coordinate of the position.
 * @returns {string} - The down adjacent position in string format ("x,y").
 * @example
 * const position = { x: 5, y: 5 };
 * getDownAdjacentPosition(position); // Returns "5,4"
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
