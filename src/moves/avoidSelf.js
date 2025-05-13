import { getMoves } from "../lib/collisionSet/moves.js";
import * as pos from "../lib/collisionSet/adjacentPositions.js";
import { getBodySet } from "../lib/bodySet/bodySet.js";

export function avoidSelf(gameState, isMoveSafe) {
  const { x: headX, y: headY } = gameState.you.body[0];

  // Create a set of body positions (excluding head)
  const bodySet = getBodySet(gameState);

  if (bodySet.has(`${headX - 1},${headY}`)) isMoveSafe.left = false;
  if (bodySet.has(`${headX + 1},${headY}`)) isMoveSafe.right = false;
  if (bodySet.has(`${headX},${headY - 1}`)) isMoveSafe.down = false;
  if (bodySet.has(`${headX},${headY + 1}`)) isMoveSafe.up = false;

  return isMoveSafe;
}
