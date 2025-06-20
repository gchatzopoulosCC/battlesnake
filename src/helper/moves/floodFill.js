/**
 * @file floodFill.js
 * @description This file contains a flood fill algorithm implementation to calculate
 * the number of reachable cells in each direction. This helps the snake
 * avoid getting trapped in small spaces by preferring directions with more open space.
 * @module src/helper/moves/floodFill
 */

/**
 * @description Performs a flood fill algorithm to count accessible spaces from each direction.
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
  
  // Check spaces accessible from each adjacent cell
  const directions = {
    up: { x: head.x, y: head.y + 1 },
    down: { x: head.x, y: head.y - 1 },
    left: { x: head.x - 1, y: head.y },
    right: { x: head.x + 1, y: head.y }
  };
  
  // For each direction, if it's valid, perform flood fill
  Object.keys(directions).forEach(direction => {
    const pos = directions[direction];
    
    // Skip if out of bounds
    if (pos.x < 0 || pos.x >= boardWidth || pos.y < 0 || pos.y >= boardHeight) {
      accessibleSpaces[direction] = 0;
      return;
    }
    
    // Skip if position contains snake body
    if (isSnakeBody(pos, gameState)) {
      accessibleSpaces[direction] = 0;
      return;
    }
    
    // Perform flood fill from this position
    accessibleSpaces[direction] = countAccessibleSpaces(pos, gameState);
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
 * Counts accessible spaces using BFS flood fill algorithm
 * 
 * @param {Object} startPos - Starting position for flood fill
 * @param {Object} gameState - The current game state
 * @returns {number} - Number of accessible spaces
 */
function countAccessibleSpaces(startPos, gameState) {
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;
  
  // Track visited cells
  const visited = new Set();
  const queue = [startPos];
  let count = 0;
  
  // Queue-based BFS implementation
  while (queue.length > 0) {
    const pos = queue.shift();
    const key = `${pos.x},${pos.y}`;
    
    // Skip if already visited or out of bounds
    if (visited.has(key) || 
        pos.x < 0 || pos.x >= boardWidth || 
        pos.y < 0 || pos.y >= boardHeight) {
      continue;
    }
    
    // Skip if position contains snake body
    if (isSnakeBody(pos, gameState)) {
      continue;
    }
    
    // Mark as visited and increase count
    visited.add(key);
    count++;
    
    // Add neighbors to queue
    queue.push({ x: pos.x + 1, y: pos.y }); // right
    queue.push({ x: pos.x - 1, y: pos.y }); // left
    queue.push({ x: pos.x, y: pos.y + 1 }); // up
    queue.push({ x: pos.x, y: pos.y - 1 }); // down
  }
  
  return count;
} 