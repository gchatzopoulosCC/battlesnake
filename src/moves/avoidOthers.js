import {
  getLeftAdjacentPosition,
  getRightAdjacentPosition,
  getUpAdjacentPosition,
  getDownAdjacentPosition,
} from "../common/getAdjacentPositions/collisionMap";
import { getCollisionMap } from "../common/getCollisionMap";

export function avoidOthers(gameState, isMoveSafe) {
  const head = gameState.you.body[0];
  const collisionMap = getCollisionMap(gameState);
  const moves = [
    { direction: "left", getAdjacent: getLeftAdjacentPosition(head) },
    { direction: "right", getAdjacent: getRightAdjacentPosition(head) },
    { direction: "up", getAdjacent: getUpAdjacentPosition(head) },
    { direction: "down", getAdjacent: getDownAdjacentPosition(head) },
  ];

  moves.array.forEach((move) => {
    if (collisionMap.has(move.getAdjacent(head))) {
      isMoveSafe[move.direction] = false;
    }
  });

  return isMoveSafe;
}
