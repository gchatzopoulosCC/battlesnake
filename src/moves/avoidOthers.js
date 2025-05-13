import { getCollisionMap } from "../common/getCollisionMap";

export function avoidOthers(gameState, isMoveSafe) {
  const { x: headX, y: headY } = gameState.you.body[0];
  const collisionMap = getCollisionMap(gameState);

  // Check adjacent positions
  if (collisionMap.has(`${headX - 1},${headY}`)) isMoveSafe.left = false;
  if (collisionMap.has(`${headX + 1},${headY}`)) isMoveSafe.right = false;
  if (collisionMap.has(`${headX},${headY - 1}`)) isMoveSafe.down = false;
  if (collisionMap.has(`${headX},${headY + 1}`)) isMoveSafe.up = false;

  return isMoveSafe;
}
