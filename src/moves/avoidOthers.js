import * as pos from "../lib/collisionMap/adjacentPositions.js";
import { getCollisionMap } from "../lib/collisionMap/collisionMap.js";

export function avoidOthers(gameState, isMoveSafe) {
  const head = gameState.you.body[0];
  const collisionMap = getCollisionMap(gameState);
  const moves = [
    { direction: "left", getAdjacentPosition: pos.getLeftAdjacentPosition(head) },
    { direction: "right", getAdjacentPosition: pos.getRightAdjacentPosition(head) },
    { direction: "up", getAdjacentPosition: pos.getUpAdjacentPosition(head) },
    { direction: "down", getAdjacentPosition: pos.getDownAdjacentPosition(head) },
  ];

  for (const move of moves) {
    if (collisionMap.has(move.getAdjacentPosition)) {
      isMoveSafe[move.direction] = false;
    }
  }

  return isMoveSafe;
}
