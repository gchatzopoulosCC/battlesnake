/**
 * @file game.js
 * @description This file contains the core functions for managing the Battlesnake game lifecycle.
 * It includes functions to start and end the game, print the board state, and provide bot information.
 * 
 * @module src/core/game
 */

/**
 * @description This function is called when the game starts
 * @example
 * // start(); // Logs "GAME START" to the console
 */
function start() {
  console.log("GAME START");
}

/**
 * @description This function is called when the game ends
 * @example
 * // end(); // Logs "GAME OVER" to the console
 */
function end() {
  console.log("GAME OVER\n");
}

/**
 * @description This function is called to print the board
 * @param {Object} board - The board object
 * @param {Object} board.width - The width of the board
 * @param {Object} board.height - The height of the board
 * @param {Object} board.snakes - The snakes on the board
 * @param {Object} board.food - The food on the board
 * @example
 * const board = {
 *   width: 11,
 *   height: 11,
 *   food: [{ x: 5, y: 5 }],
 *   snakes: [{ id: "1", body: [{ x: 1, y: 1 }, { x: 1, y: 2 }] }]
 * };
 * printBoard(board); // Logs the board object to the console.
 */
function printBoard(board) {
  console.log(board);
}

/**
 * @description This function returns the information of the bot
 * @returns {Object} - The information of the bot (the apiversion, author, color, head, tail)
 * @example
 * // info(); // Returns the information of the bot
 */
function info() {
  console.log("INFO");

  return {
    apiversion: "1",
    author: "gchatzopoulosCC",
    color: "#F64A91",
    head: "silly",
    tail: "bolt",
  };
}

export { start, end, printBoard, info };
