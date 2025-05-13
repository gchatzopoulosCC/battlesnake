import { getcollisionMap } from "../collisionMap/collisionMap.js";
import { createAvoidanceChecker } from "../../utils/moves/avoidanceChecker.js";

export function avoidOthers(gameState, isMoveSafe) {
  const checkAvoidance = createAvoidanceChecker(getcollisionMap);
  checkAvoidance(gameState, isMoveSafe);

  return isMoveSafe;
}
