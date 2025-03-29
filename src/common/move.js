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
  const myHead = gameState.you.body[0];

  const others = gameState.board.snakes.filter(snake => snake.id !== gameState.you.id)
  others.forEach(other => {
    other.body.forEach(segment => {
      if (segment.x === myHead.x - 1 && segment.y === myHead.y) isMoveSafe.left = false; // Left wall
      if (segment.x === myHead.x + 1 && segment.y === myHead.y) isMoveSafe.right = false; // Right wall
      if (segment.x === myHead.x && segment.y === myHead.y - 1) isMoveSafe.down = false; // Bottom wall
      if (segment.x === myHead.x && segment.y === myHead.y + 1) isMoveSafe.up = false; // Top wall
    });
  })
}

export {
  avoidWalls,
  avoidOthers
}
