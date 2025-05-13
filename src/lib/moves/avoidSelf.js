import { getbodyMap } from "../bodyMap/bodyMap.js";
import { createAvoidanceChecker } from "../../utils/moves/avoidanceChecker.js";

export function avoidSelf(gameState, isMoveSafe) {
  const avoidanceChecker = createAvoidanceChecker(getbodyMap);
  avoidanceChecker(gameState, isMoveSafe);

  return isMoveSafe;
}
