import * as pos from "../common/getAdjacentPositions/collisionMap";
import { getCollisionMap } from "../common/getCollisionMap";

export function avoidOthers(gameState, isMoveSafe) {
  const head = gameState.you.body[0];
  const collisionMap = getCollisionMap(gameState);
  const moves = [
    { direction: "left", getAdjacent: pos.getLeftAdjacentPosition(head) },
    { direction: "right", getAdjacent: pos.getRightAdjacentPosition(head) },
    { direction: "up", getAdjacent: pos.getUpAdjacentPosition(head) },
    { direction: "down", getAdjacent: pos.getDownAdjacentPosition(head) },
  ];

  moves.array.forEach((move) => {
    if (collisionMap.has(move.getAdjacent(head))) {
      isMoveSafe[move.direction] = false;
    }
  });

  return isMoveSafe;
}
