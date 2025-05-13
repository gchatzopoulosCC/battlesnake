import { getMoves } from "../../common/sets/moves.js";

export function createAvoidanceChecker(getMapFunction) {
  return function checkAvoidance(gameState, isMoveSafe) {
    const map = getMapFunction(gameState);
    const moves = getMoves(gameState);

    for (const move of moves) {
      if (map.has(move.adjacentPosition)) {
        isMoveSafe[move.direction] = false;
      }
    }
  };
}
