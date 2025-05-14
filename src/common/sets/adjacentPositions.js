import { parseCoordinates } from "./coordinates.js";

function getLeftAdjacentPosition(position) {
  return parseCoordinates(position.x - 1, position.y);
}

function getRightAdjacentPosition(position) {
  return parseCoordinates(position.x + 1, position.y);
}

function getUpAdjacentPosition(position) {
  return parseCoordinates(position.x, position.y + 1);
}

function getDownAdjacentPosition(position) {
  return parseCoordinates(position.x, position.y - 1);
}

export {
  getLeftAdjacentPosition,
  getRightAdjacentPosition,
  getUpAdjacentPosition,
  getDownAdjacentPosition,
};
