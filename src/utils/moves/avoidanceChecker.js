import { getMoves } from "../../common/sets/moves.js";

export function createAvoidanceChecker(getSetFunction) {
  return function checkAvoidance(gameState, isMoveSafe) {
    const map = getSetFunction(gameState);
    const moves = getMoves(gameState);

    for (const move of moves) {
      if (map.has(move.adjacentPosition)) {
        isMoveSafe[move.direction] = false;
      }
    }
  };
}
