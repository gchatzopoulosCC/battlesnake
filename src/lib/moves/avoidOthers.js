import { getCollisionMap } from "../collisionMap/collisionMap.js";
import { createAvoidanceChecker } from "../../utils/moves/avoidanceChecker.js";

const avoidanceChecker = createAvoidanceChecker(getCollisionMap);

export function avoidOthers(gameState, isMoveSafe) {
  avoidanceChecker(gameState, isMoveSafe);
  
  return isMoveSafe;
}
