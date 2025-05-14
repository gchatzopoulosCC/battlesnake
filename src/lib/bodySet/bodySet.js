export function getbodySet(gameState) {
  return new Set(
    gameState.you.body.slice(1).map((segment) => `${segment.x},${segment.y}`),
  );
}
