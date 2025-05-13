import { getcollisionMap } from "../collisionMap/collisionMap.js";
import { createAvoidanceChecker } from "../../utils/moves/avoidanceChecker.js";

export function avoidOthers(gameState, isMoveSafe) {
  const avoidanceChecker = createAvoidanceChecker(getcollisionMap);
  avoidanceChecker(gameState, isMoveSafe);

  return isMoveSafe;
}
