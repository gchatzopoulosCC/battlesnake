import * as pos from "./adjacentPositions.js";

export function getMoves(gameState) {
  const head = gameState.you.body[0];
  const moves = [
    {
      direction: "left",
      adjacentPosition: pos.getLeftAdjacentPosition(head),
    },
    {
      direction: "right",
      adjacentPosition: pos.getRightAdjacentPosition(head),
    },
    {
      direction: "up",
      adjacentPosition: pos.getUpAdjacentPosition(head),
    },
    {
      direction: "down",
      adjacentPosition: pos.getDownAdjacentPosition(head),
    },
  ];

  return moves;
}
