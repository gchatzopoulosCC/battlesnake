// Common functions for the move method
function avoidWalls(gameState, isMoveSafe) {
  const { width: boardWidth, height: boardHeight } = gameState.board;
  const { x, y } = gameState.you.body[0];

  // Check wall collisions
  if (x === 0) isMoveSafe.left = false;
  if (x === boardWidth - 1) isMoveSafe.right = false;
  if (y === 0) isMoveSafe.down = false;
  if (y === boardHeight - 1) isMoveSafe.up = false;

  return isMoveSafe;
}


function avoidOthers(gameState, isMoveSafe) {
  // Early exit if no moves are safe
  if (!Object.values(isMoveSafe).some(Boolean)) return;

  const { x: headX, y: headY } = gameState.you.body[0];
  const otherSnakes = gameState.board.snakes.filter(snake => snake.id !== gameState.you.id);

  for (const snake of otherSnakes) {
    for (const segment of snake.body) {
      // Check adjacent segments
      const dx = segment.x - headX;
      const dy = segment.y - headY;

      if (dx === -1 && dy === 0) isMoveSafe.left = false;
      if (dx === 1 && dy === 0) isMoveSafe.right = false;
      if (dx === 0 && dy === -1) isMoveSafe.down = false;
      if (dx === 0 && dy === 1) isMoveSafe.up = false;

      // Early exit if no moves are safe
      if (!Object.values(isMoveSafe).some(Boolean)) return;
    }
  }
}


export {
  avoidWalls,
  avoidOthers
}
