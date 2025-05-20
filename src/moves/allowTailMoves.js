export function allowTailMoves(gameState, isMoveSafe) {
  const { x: headX, y: headY } = gameState.you.body[0];

  const otherSnakes = gameState.board.snakes.filter(
    (snake) => snake.id !== gameState.you.id
  );

  const tailPositions = new Set();

  otherSnakes.forEach((snake) => {
    const tail = snake.body[snake.body.length - 1];
    const willGrow = gameState.board.food.some(
      (food) => food.x === snake.head.x && food.y === snake.head.y
    );
    if (!willGrow) {
      tailPositions.add(`${tail.x},${tail.y}`);
    }
  });

  // Allow moving into tail positions
  if (tailPositions.has(`${headX - 1},${headY}`)) isMoveSafe.left = true;
  if (tailPositions.has(`${headX + 1},${headY}`)) isMoveSafe.right = true;
  if (tailPositions.has(`${headX},${headY - 1}`)) isMoveSafe.down = true;
  if (tailPositions.has(`${headX},${headY + 1}`)) isMoveSafe.up = true;

  return isMoveSafe;
}
