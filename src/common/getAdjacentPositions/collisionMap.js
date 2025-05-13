function getLeftAdjacentPosition(position) {
  return `${position.x - 1},${position.y}`;
}

function getRightAdjacentPosition(position) {
  return `${position.x + 1},${position.y}`;
}

function getUpAdjacentPosition(position) {
  return `${position.x},${position.y - 1}`;
}

function getDownAdjacentPosition(position) {
  return `${position.x},${position.y + 1}`;
}

export {
  getLeftAdjacentPosition,
  getRightAdjacentPosition,
  getUpAdjacentPosition,
  getDownAdjacentPosition,
};
