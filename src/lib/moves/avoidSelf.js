import { getBodyMap } from "../bodyMap/bodyMap.js";
import { createAvoidanceChecker } from "../../utils/moves/avoidanceChecker.js";

const avoidanceChecker = createAvoidanceChecker(getBodyMap);

export function avoidSelf(gameState, isMoveSafe) {
  avoidanceChecker(gameState, isMoveSafe);

  return isMoveSafe;
}
