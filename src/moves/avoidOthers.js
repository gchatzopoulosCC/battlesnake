import { getCollisionSet } from "../lib/collisionSet/collisionSet.js";
import { getMoves } from "../lib/collisionSet/moves.js";

export function avoidOthers(gameState, isMoveSafe) {
  const collisionMap = getCollisionSet(gameState);
  const moves = getMoves(gameState);

  for (const move of moves) {
    if (collisionMap.has(move.getAdjacentPosition)) {
      isMoveSafe[move.direction] = false;
    }
  }

  return isMoveSafe;
}
