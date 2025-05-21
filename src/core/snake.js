
// This is the core logic of the snake
import { avoidGoingBackwards } from "../moves/avoidGoingBackwards.js";
import { avoidWalls } from "../moves/avoidWalls.js";
import { avoidSelf } from "../moves/avoidSelf.js";
import { avoidOthers } from "../moves/avoidOthers.js";
import { allowTailMoves } from "../moves/allowTailMoves.js";
// move is called on every turn and returns your next move
// Valid moves are "up", "down", "left", or "right"
function move(gameState) {
  const isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  // Moves to avoid
  avoidGoingBackwards(gameState, isMoveSafe);
  avoidWalls(gameState, isMoveSafe);
  avoidSelf(gameState, isMoveSafe);
  avoidOthers(gameState, isMoveSafe);
  allowTailMoves(gameState, isMoveSafe)

  // Are there any safe moves left?
  const safeMoves = Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);
  if (safeMoves.length === 0) {
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
