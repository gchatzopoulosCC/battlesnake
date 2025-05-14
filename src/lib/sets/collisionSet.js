export function getCollisionSet(gameState) {
  const collisionSet = new Set();
  const otherSnakes = gameState.board.snakes.filter(
    (snake) => snake.id !== gameState.you.id,
  );

  otherSnakes.forEach((snake) => {
    snake.body.forEach((segment) => {
      collisionSet.add(`${segment.x},${segment.y}`);
    });
  });

  return collisionSet;
}
