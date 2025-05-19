/**
 * @file index.js
 * @description This is the main entry point for the Battlesnake application.
 * It imports the necessary modules and starts the server with the game handlers.
 * @module battlesnake
 * @requires ./server
 * @requires ./src/core/game
 * @requires ./src/core/snake
 */

// Welcome to
// __________         __    __  .__                               __
// \______   \_____ _/  |__/  |_|  |   ____   ______ ____ _____  |  | __ ____
//  |    |  _/\__  \\   __\   __\  | _/ __ \ /  ___//    \\__  \ |  |/ // __ \
//  |    |   \ / __ \|  |  |  | |  |_\  ___/ \___ \|   |  \/ __ \|    <\  ___/
//  |________/(______/__|  |__| |____/\_____>______>___|__(______/__|__\\_____>
//
// This file can be a nice home for your Battlesnake logic and helper functions.
//
// To get you started we've included code to prevent your Battlesnake from moving backwards.
// For more info see docs.battlesnake.com

import runServer from "./server.js";
import { start, end, info } from "./src/core/game.js";
import { move } from "./src/core/snake.js";

/**
 * @description Initializes the Battlesnake server with the core game handlers.
 * This connects the game lifecycle functions to the server endpoints.
 * 
 * @param {Object} handlers - The object containing handler functions for different game events.
 * @param {Function} handlers.info - Function that returns metadata about the Battlesnake.
 * @param {Function} handlers.start - Function called when a new game starts.
 * @param {Function} handlers.move - Function called on each turn to determine the snake's next move.
 * @param {Function} handlers.end - Function called when the game ends.
 * 
 * @example
 * // The server is started with the following handlers:
 * // - info: Returns snake metadata like color, author, and appearance
 * // - start: Logs the start of a new game
 * // - move: Determines the next movement direction based on the game state
 * // - end: Logs the end of the game
 */
runServer({
  info: info,
  start: start,
  move: move,
  end: end,
});
