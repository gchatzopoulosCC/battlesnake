export function avoidSelf(gameState, isMoveSafe) {
  const { x: headX, y: headY } = gameState.you.body[0];

  // Create a set of body positions (excluding head)
  const bodyPositions = new Set(
    gameState.you.body.slice(1).map((segment) => `${segment.x},${segment.y}`),
  );

  if (bodyPositions.has(`${headX - 1},${headY}`)) isMoveSafe.left = false;
  if (bodyPositions.has(`${headX + 1},${headY}`)) isMoveSafe.right = false;
  if (bodyPositions.has(`${headX},${headY - 1}`)) isMoveSafe.down = false;
  if (bodyPositions.has(`${headX},${headY + 1}`)) isMoveSafe.up = false;

  return isMoveSafe;
}
