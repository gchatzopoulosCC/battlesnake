import { getHead, getTail } from "../../common/snake/body";

export function avoidGoingBackwards(gameState, isMoveSafe) {
  const myHead = getHead(gameState);
  const myNeck = getTail(gameState);

  if (myNeck.x < myHead.x) isMoveSafe.left = false;
  else if (myNeck.x > myHead.x) isMoveSafe.right = false;
  else if (myNeck.y < myHead.y) isMoveSafe.down = false;
  else if (myNeck.y > myHead.y) isMoveSafe.up = false;
}
