export function getCollisionSet(gameState) {
  const otherSnakes = gameState.board.snakes.filter(
    (snake) => snake.id !== gameState.you.id,
  );

  const collisionCoordinates = otherSnakes
    .flatMap((snake) => snake.body)
    .map((segment) => `${segment.x},${segment.y}`);

  return new Set(collisionCoordinates);
}
