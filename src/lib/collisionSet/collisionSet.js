export function getCollisionSet(gameState) {
  const collisionMap = new Set();
  const otherSnakes = gameState.board.snakes.filter(
    (snake) => snake.id !== gameState.you.id,
  );

  otherSnakes.forEach((snake) => {
    snake.body.forEach((segment) => {
      collisionMap.add(`${segment.x},${segment.y}`);
    });
  });

  return collisionMap;
}
