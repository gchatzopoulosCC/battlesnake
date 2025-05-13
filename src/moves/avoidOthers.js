import { getCollisionMap } from "../lib/collisionMap/collisionMap.js";
import { getMoves } from "../lib/collisionMap/moves.js";

export function avoidOthers(gameState, isMoveSafe) {
  const collisionMap = getCollisionMap(gameState);
  const moves = getMoves(gameState);

  for (const move of moves) {
    if (collisionMap.has(move.getAdjacentPosition)) {
      isMoveSafe[move.direction] = false;
    }
  }

  return isMoveSafe;
}
