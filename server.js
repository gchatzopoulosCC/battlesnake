/**
 * @file server.js
 * @description This file contains the Express server configuration for the Battlesnake API.
 * It sets up the endpoints required by the Battlesnake engine and handles routing requests to the appropriate handlers.
 * @module server
 * @requires express
 */

import express from "express";

/**
 * @description Sets up and starts an Express server for the Battlesnake API.
 * The server creates routes for info, start, move, and end game events,
 * forwarding the requests to the appropriate handler functions.
 *
 * @param {Object} handlers - An object containing handler functions for different game events.
 * @param {Function} handlers.info - Function that returns metadata about the Battlesnake.
 * @param {Function} handlers.start - Function called when a new game starts.
 * @param {Function} handlers.move - Function called on each turn to determine the snake's next move.
 * @param {Function} handlers.end - Function called when a game ends.
 *
 * @returns {void} - This function doesn't return a value but starts the server.
 *
 * @example
 * import { start, end, info } from "./src/core/game.js";
 * import { move } from "./src/core/snake.js";
 *
 * runServer({
 *   info: info,
 *   start: start,
 *   move: move,
 *   end: end,
 * });
 * // Server starts listening on port 8000
 * // Console output: "Running Battlesnake at http://0.0.0.0:8000..."
 */
export default function runServer(handlers) {
  const app = express();
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send(handlers.info());
  });

  app.post("/start", (req, res) => {
    handlers.start(req.body);
    res.send("ok");
  });

  app.post("/move", (req, res) => {
    res.send(handlers.move(req.body));
  });

  app.post("/end", (req, res) => {
    handlers.end(req.body);
    res.send("ok");
  });

  app.use(function (req, res, next) {
    res.set("Server", "battlesnake/replit/starter-snake-javascript");
    next();
  });

  const host = "0.0.0.0";
  const port = process.env.PORT || 8000;

  app.listen(port, host, () => {
    console.log(`Running Battlesnake at http://${host}:${port}...`);
    console.log("Visit this URL to see info() response");
    console.log("Create games at play.battlesnake.com to see game logs");
  });
}
