import { getcollisionMap } from "../collisionMap/collisionMap.js";
import { getMoves } from "../../common/sets/moves.js";

export function avoidOthers(gameState, isMoveSafe) {
  const collisionMap = getcollisionMap(gameState);
  const moves = getMoves(gameState);

  for (const move of moves) {
    if (collisionMap.has(move.getAdjacentPosition)) {
      isMoveSafe[move.direction] = false;
    }
  }

  return isMoveSafe;
}
