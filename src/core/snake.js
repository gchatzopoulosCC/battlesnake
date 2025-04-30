// This is the core logic of the snake
import { avoidWalls, avoidOthers, avoidSelf, avoidGoingBackwards } from "../common/move.js";

// move is called on every turn and returns your next move
// Valid moves are "up", "down", "left", or "right"
// See https://docs.battlesnake.com/api/example-move for available data
function move(gameState) {
  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  // We've included code to prevent your Battlesnake from moving backwards
  avoidGoingBackwards(gameState, isMoveSafe);

  // Prevent out of bounds
  avoidWalls(gameState, isMoveSafe);

  // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
  avoidSelf(gameState, isMoveSafe);

  // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
  avoidOthers(gameState, isMoveSafe);

  // Are there any safe moves left?
  const safeMoves = Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);
  if (safeMoves.length == 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    return { move: "down" };
  }

  // Choose a random move from the safe moves
  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

  // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
  // food = gameState.board.food;

  console.log(`MOVE ${gameState.turn}: ${nextMove}`);
  return { move: nextMove };
}

export { move };
