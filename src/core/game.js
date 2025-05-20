/**
 * @file game.js
 * @description This file contains the core functions for managing the Battlesnake game lifecycle.
 * It includes functions to start and end the game, print the board state, and provide bot information.
 * @module src/core/game
 */

/**
 * @description This function is called when the game starts. It logs a message to indicate
 * the beginning of a new game, which can be useful for debugging and tracking game sessions.
 *
 * @example
 * start();
 * // Console output: "GAME START"
 */
function start() {
  console.log("GAME START");
}

/**
 * @description This function is called when the game ends. It logs a message to indicate
 * the end of the current game session, which can be useful for debugging and separating logs
 * between multiple game runs.
 *
 * @example
 * end();
 * // Console output: "GAME OVER"
 */
function end() {
  console.log("GAME OVER\n");
}

/**
 * @description This function prints the current state of the game board to the console.
 * It's primarily used for debugging to visualize the board state during gameplay.
 *
 * @param {Object} board - The board object containing the game state.
 * @param {number} board.width - The width of the board in cells.
 * @param {number} board.height - The height of the board in cells.
 * @param {Object[]} board.snakes - An array of snake objects on the board.
 * @param {Object[]} board.food - An array of food objects on the board, each with x,y coordinates.
 *
 * @example
 * const board = {
 *   width: 11,
 *   height: 11,
 *   food: [{ x: 5, y: 5 }],
 *   snakes: [{ id: "1", body: [{ x: 1, y: 1 }, { x: 1, y: 2 }] }]
 * };
 * printBoard(board);
 * // Logs the complete board object to the console for inspection
 */
function printBoard(board) {
  console.log(board);
}

/**
 * @description This function returns metadata about your Battlesnake including appearance
 * customizations and API version compatibility. This information is used by the game server
 * to render your snake correctly and ensure compatibility.
 *
 * @returns {Object} The information about the Battlesnake.
 * @returns {string} returns.apiversion - The API version this snake implements (currently "1").
 * @returns {string} returns.author - The name of the snake's author/creator.
 * @returns {string} returns.color - The primary color of the snake in hex format.
 * @returns {string} returns.head - The head style of the snake (e.g., "silly", "default").
 * @returns {string} returns.tail - The tail style of the snake (e.g., "bolt", "default").
 *
 * @example
 * const botInfo = info();
 * console.log(botInfo);
 * // Output:
 * // {
 * //   apiversion: "1",
 * //   author: "gchatzopoulosCC",
 * //   color: "#F64A91",
 * //   head: "silly",
 * //   tail: "bolt"
 * // }
 */
function info() {
  console.log("INFO");

  return {
    apiversion: "1",
    author: "gchatzopoulosCC",
    color: "#000000",
    head: "silly",
    tail: "bolt",
  };
}

export { start, end, printBoard, info };
