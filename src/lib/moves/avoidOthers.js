import { getCollisionMap } from "../collisionMap/collisionMap.js";
import { createAvoidanceChecker } from "../../utils/moves/avoidanceChecker.js";

export function avoidOthers(gameState, isMoveSafe) {
  const avoidanceChecker = createAvoidanceChecker(getCollisionMap);
  avoidanceChecker(gameState, isMoveSafe);

  return isMoveSafe;
}
