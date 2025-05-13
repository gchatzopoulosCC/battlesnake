import * as pos from "./adjacentPositions.js";

export function getMoves(gameState) {
  const head = gameState.you.body[0];
  const moves = [
    {
      direction: "left",
      getAdjacentPosition: pos.getLeftAdjacentPosition(head),
    },
    {
      direction: "right",
      getAdjacentPosition: pos.getRightAdjacentPosition(head),
    },
    {
      direction: "up",
      getAdjacentPosition: pos.getUpAdjacentPosition(head),
    },
    {
      direction: "down",
      getAdjacentPosition: pos.getDownAdjacentPosition(head),
    },
  ];

  return moves;
}
