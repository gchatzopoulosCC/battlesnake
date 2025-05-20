function getHead(gameState) {
  return gameState.you.body[0];
}

function getTail(gameState) {
  return gameState.you.body[1];
}

export { getHead, getTail };
