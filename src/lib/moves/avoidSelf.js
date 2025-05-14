import { getbodySet } from "../bodySet/bodySet.js";
import { createAvoidanceChecker } from "../../utils/moves/avoidanceChecker.js";

const avoidanceChecker = createAvoidanceChecker(getbodySet);

export function avoidSelf(gameState, isMoveSafe) {
  avoidanceChecker(gameState, isMoveSafe);

  return isMoveSafe;
}
