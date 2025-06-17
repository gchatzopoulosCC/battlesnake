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

/**
 * @description Calculates the Manhattan distance between two points
 * @param {Object} point1 - First point with x and y coordinates
 * @param {Object} point2 - Second point with x and y coordinates
 * @returns {number} The Manhattan distance between the two points
 * @example
 * const point1 = { x: 0, y: 0 };
 * const point2 = { x: 3, y: 4 };
 * getManhattanDistance(point1, point2); // Returns 7
 */
export function getManhattanDistance(point1, point2) {
  return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}
