import { getMoves } from "../common/sets/moves.js";
import { getBodySet } from "../lib/bodySet/bodySet.js";

export function avoidSelf(gameState, isMoveSafe) {
  const bodySet = getBodySet(gameState);
  const moves = getMoves(gameState);

  for (const move of moves) {
    if (bodySet.has(move.getAdjacentPosition)) {
      isMoveSafe[move.direction] = false;
    }
  }

  return isMoveSafe;
}
