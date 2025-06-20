/**
 * @file floodFill.js
 * @description This file contains a flood fill algorithm implementation to calculate
 * the number of reachable cells in each direction. This helps the snake
 * avoid getting trapped in small spaces by preferring directions with more open space.
 * @module src/helper/moves/floodFill
 */

/**
 * @description Performs a directional space counting to evaluate accessible spaces in each direction.
 * This helps the snake avoid dead ends and choose paths with more open space.
 * 
 * @param {Object} gameState - The current state of the game
 * @returns {Object} - Number of accessible spaces in each direction
 */
export function floodFill(gameState) {
  // Create result object for each direction
  const accessibleSpaces = {
    up: 0,
    down: 0,
    left: 0,
    right: 0
  };
  
  const head = gameState.you.head;
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;
  
  // Check spaces accessible in each direction
  const directions = {
    up: { x: 0, y: 1 },
    down: { x: 0, y: -1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };
  
  // For each direction, count accessible spaces in that direction
  Object.keys(directions).forEach(direction => {
    const delta = directions[direction];
    accessibleSpaces[direction] = countDirectionalSpaces(head, delta, gameState);
  });
  
  return accessibleSpaces;
}

/**
 * Checks if a position contains any snake body part
 * 
 * @param {Object} pos - The position to check
 * @param {Object} gameState - The current game state
 * @returns {boolean} - True if position contains snake body
 */
function isSnakeBody(pos, gameState) {
  // Check against all snakes on the board
  const boardSnakes = gameState.board.snakes || [];
  const boardSnakeBlocked = boardSnakes.some(snake => {
    return snake.body.some(segment => {
      return segment.x === pos.x && segment.y === pos.y;
    });
  });
  
  // Also check against our own snake body
  const ourSnakeBlocked = gameState.you.body.some(segment => {
    return segment.x === pos.x && segment.y === pos.y;
  });
  
  return boardSnakeBlocked || ourSnakeBlocked;
}

/**
 * Counts accessible spaces in a specific direction until blocked
 * 
 * @param {Object} startPos - Starting position (head)
 * @param {Object} delta - Direction vector {x, y}
 * @param {Object} gameState - The current game state
 * @returns {number} - Number of accessible spaces in that direction
 */
function countDirectionalSpaces(startPos, delta, gameState) {
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;
  let count = 0;
  
  // Start from the first position in this direction
  let currentPos = {
    x: startPos.x + delta.x,
    y: startPos.y + delta.y
  };
  
  // Count spaces in this direction until we hit an obstacle
  while (currentPos.x >= 0 && currentPos.x < boardWidth && 
         currentPos.y >= 0 && currentPos.y < boardHeight) {
    
         // If this position contains a snake body, stop counting
     if (isSnakeBody(currentPos, gameState)) {
       break;
     }
    
    // This space is accessible
    count++;
    
    // Move to next position in the same direction
    currentPos.x += delta.x;
    currentPos.y += delta.y;
  }
  
  return count;
} 