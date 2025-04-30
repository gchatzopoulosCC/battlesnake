// Common functions for the move method

function avoidGoingBackwards(gameState, isMoveSafe) {
  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];

  if (myNeck.x < myHead.x) isMoveSafe.left = false;
  else if (myNeck.x > myHead.x) isMoveSafe.right = false;
  else if (myNeck.y < myHead.y) isMoveSafe.down = false;
  else if (myNeck.y > myHead.y) isMoveSafe.up = false;
}

function avoidWalls(gameState, isMoveSafe) {
  const { width: boardWidth, height: boardHeight } = gameState.board;
  const { x, y } = gameState.you.body[0];

  if (x === 0) isMoveSafe.left = false;
  if (x === boardWidth - 1) isMoveSafe.right = false;
  if (y === 0) isMoveSafe.down = false;
  if (y === boardHeight - 1) isMoveSafe.up = false;

  return isMoveSafe;
}

function avoidOthers(gameState, isMoveSafe) {
  const { x: headX, y: headY } = gameState.you.body[0];

  // Create a collision map
  const collisionMap = new Set();
  const otherSnakes = gameState.board.snakes.filter((snake) => snake.id !== gameState.you.id);

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

function avoidSelf(gameState, isMoveSafe) {
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

export { avoidGoingBackwards, avoidWalls, avoidOthers, avoidSelf };
