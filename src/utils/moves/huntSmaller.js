/**
 * Modifies isMoveSafe to prioritize moves that can attack smaller snakes' heads.
 * @param {Object} gameState
 * @param {Object} isMoveSafe
 */
function huntSmallerSnakes(gameState, isMoveSafe) {
  const myLength = gameState.you.length;
  const myHead = gameState.you.head;
  const directions = {
    up:    { x: myHead.x,     y: myHead.y + 1 },
    down:  { x: myHead.x,     y: myHead.y - 1 },
    left:  { x: myHead.x - 1, y: myHead.y     },
    right: { x: myHead.x + 1, y: myHead.y     },
  };

  // Find all smaller snakes
  const smallerSnakes = gameState.board.snakes.filter(
    snake => snake.id !== gameState.you.id && snake.body.length < myLength
  );

  // Find moves that would put us next to a smaller snake's head
  let huntingMoves = [];
  for (const snake of smallerSnakes) {
    const head = snake.head;
     for (const [move, pos] of Object.entries(directions)) {
      if (
        Math.abs(pos.x - head.x) + Math.abs(pos.y - head.y) === 1 &&
        isMoveSafe[move]
      ) {
        huntingMoves.push(move);
      }
    }
  }

  // If there are hunting moves, prioritize them
  if (huntingMoves.length > 0) {
    for (const move in isMoveSafe) {
      isMoveSafe[move] = huntingMoves.includes(move);
    }
  }
}

export { huntSmallerSnakes };