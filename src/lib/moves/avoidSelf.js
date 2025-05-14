import { getBodySet } from "../../utils/sets/bodySet.js";
import { createAvoidanceChecker } from "../../utils/moves/avoidanceChecker.js";

const avoidanceChecker = createAvoidanceChecker(getBodySet);

export function avoidSelf(gameState, isMoveSafe) {
  avoidanceChecker(gameState, isMoveSafe);

  return isMoveSafe;
}
