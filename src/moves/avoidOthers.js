export function avoidOthers(gameState, isMoveSafe) {
  const { x: headX, y: headY } = gameState.you.body[0];

  // Create a collision map
  const collisionMap = new Set();
  const otherSnakes = gameState.board.snakes.filter(
    (snake) => snake.id !== gameState.you.id,
  );

  otherSnakes.forEach((snake) => {
    snake.body.forEach((segment) => {
      collisionMap.add(`${segment.x},${segment.y}`);
    });
  });

  // Check adjacent positions
  if (collisionMap.has(`${headX - 1},${headY}`)) isMoveSafe.left = false;
  if (collisionMap.has(`${headX + 1},${headY}`)) isMoveSafe.right = false;
  if (collisionMap.has(`${headX},${headY - 1}`)) isMoveSafe.down = false;
  if (collisionMap.has(`${headX},${headY + 1}`)) isMoveSafe.up = false;

  return isMoveSafe;
}
