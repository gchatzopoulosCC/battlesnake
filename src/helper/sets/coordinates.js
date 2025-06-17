/**
 * @file coordinates.js
 * @description This file contains functions to parse coordinates into a string format.
 * @module src/helper/sets/coordinates
 */

/**
 * @description This function parses coordinates into a string format.
 * It takes two numbers (x and y) and returns a string in the format "x,y".
 * @param {number} x - The x-coordinate.
 * @param {number} y - The y-coordinate.
 * @returns {string} - The coordinates in string format.
 * @example
 * const x = 5;
 * const y = 10;
 * parseCoordinates(x, y); // Returns "5,10"
 */
export function parseCoordinates(x, y) {
  return `${x},${y}`;
}
