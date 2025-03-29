
// Common functions for the move method
function avoidWalls(gameState, isMoveSafe) {
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;
  const myHead = gameState.you.body[0];

  if (myHead.x === 0) isMoveSafe.left = false; // Left wall
  if (myHead.x === boardWidth - 1) isMoveSafe.right = false; // Right wall
  if (myHead.y === 0) isMoveSafe.down = false; // Bottom wall
  if (myHead.y === boardHeight - 1) isMoveSafe.up = false; // Top wall

  return isMoveSafe;
}

export {
  avoidWalls
}
