
// Common functions for the move method

function isLeftSafe(myHead, pointOfInterest) {
  return myHead.x != pointOfInterest.x - 1
}

function isRightSafe(myHead, pointOfInterest) {
  return myHead.x != pointOfInterest.x + 1
}

function isUpSafe(myHead, pointOfInterest) {
  return myHead.y != pointOfInterest.y - 1
}

function isDownSafe(myHead, pointOfInterest) {
  return myHead.y != pointOfInterest.y + 1
}

export {
  isLeftSafe,
  isRightSafe,
  isUpSafe,
  isDownSafe
}
