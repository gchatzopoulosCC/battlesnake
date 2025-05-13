import { getMoves } from "../common/sets/moves.js";
import { getbodyMap } from "../lib/bodyMap/bodyMap.js";

export function avoidSelf(gameState, isMoveSafe) {
  const bodyMap = getbodyMap(gameState);
  const moves = getMoves(gameState);

  for (const move of moves) {
    if (bodyMap.has(move.getAdjacentPosition)) {
      isMoveSafe[move.direction] = false;
    }
  }

  return isMoveSafe;
}
