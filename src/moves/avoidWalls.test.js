import { avoidWalls } from './avoidWalls.js';

describe('avoidWalls', () => {
  test('should prohibit moves that would cause the snake to hit the walls', () => {
    // Sample board with a snake at the bottom-left corner
    const gameState = {
      board: {
        width: 11,
        height: 11
      },
      you: {
        body: [
          { x: 0, y: 0 } 
        ]
      }
    };

    // Initial possible moves, all moves(directions) are allowed
    const possibleMoves = { up: true, down: true, left: true, right: true };
    
    // Apply the avoidWalls function to the game state and possible moves
    const safeMoves = avoidWalls(gameState, possibleMoves);
    
    // The snake would hit the wall if it moves left or down from bottom-left corner (0,0)
    expect(safeMoves).toEqual({
      up: true,
      down: false, 
      left: false, 
      right: true
    });
  });

  test('should not modify moves if there is no wall collision', () => {
    // Snake is in the middle of the board
    const gameState = {
      board: {
        width: 11, 
        height: 11
      },
      you: {
        body: [
          { x: 5, y: 5 } 
        ]
      }
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };
    
    const safeMoves = avoidWalls(gameState, possibleMoves);
    
    // If there is no wall collision, the possible moves should not be modified
    expect(safeMoves).toEqual(possibleMoves);
  });

  test('should detect top and right wall collisions', () => {
    // Snake is  at the top-right corner
    const gameState = {
      board: {
        width: 11, 
        height: 11
      },
      you: {
        body: [
          { x: 10, y: 10 } 
        ]
      }
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };
    
    const safeMoves = avoidWalls(gameState, possibleMoves);
    
    // The snake will hit the wall if it moves up or right when it is at the top-right corner
    expect(safeMoves).toEqual({
      up: false, 
      down: true,
      left: true,
      right: false 
    });
  });
});