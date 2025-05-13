import { getCollisionSet } from "../lib/collisionSet/collisionSet.js";
import { getMoves } from "../common/sets/moves.js";

export function avoidOthers(gameState, isMoveSafe) {
  const collisionSet = getCollisionSet(gameState);
  const moves = getMoves(gameState);

  for (const move of moves) {
    if (collisionSet.has(move.getAdjacentPosition)) {
      isMoveSafe[move.direction] = false;
    }
  }

  return isMoveSafe;
}
