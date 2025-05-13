function getHead(gameState) {
  return gameState.you.body[0];
}

function getTail(gameState) {
  return gameState.you.body.slice(1);
}

export {
  getHead,
  getTail,
}
