import { avoidGoingBackwards } from './avoidGoingBackwards.js';

describe('avoidGoingBackwards', () => {
  test('should prohibit moving left when neck is to the left', () => {
    // Snake moving right (neck is behind , to the left of head)
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 }, // Head
          { x: 4, y: 5 }, // Neck is to the left
          { x: 3, y: 5 }  // Rest of body
        ]
      }
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };
    
    // Apply avoidGoingBackwards function
    avoidGoingBackwards(gameState, possibleMoves);
    
    // Should not be able to move left, to its neck
    expect(possibleMoves).toEqual({
      up: true,
      down: true,
      left: false,
      right: true
    });
  });

  test('should prohibit moving right when neck is to the right', () => {
    // Snake moving left (neck is behind , to the right of head)
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 }, // Head
          { x: 6, y: 5 }, // Neck is to the right
          { x: 7, y: 5 }  // Rest of body
        ]
      }
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };
    
    // Apply avoidGoingBackwards function
    avoidGoingBackwards(gameState, possibleMoves);
    
    // Should not be able to move right, to its neck 
    expect(possibleMoves).toEqual({
      up: true,
      down: true,
      left: true,
      right: false
    });
  });

  test('should prohibit moving down when neck is below', () => {
    // Snake moving up (neck is below head)
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 }, // Head
          { x: 5, y: 4 }, // Neck is below
          { x: 5, y: 3 }  // Rest of body
        ]
      }
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };
    
    // Apply avoidGoingBackwards function
    avoidGoingBackwards(gameState, possibleMoves);
    
    // Should not be able to move down, to its neck
    expect(possibleMoves).toEqual({
      up: true,
      down: false,
      left: true,
      right: true
    });
  });

  test('should prohibit moving up when neck is above', () => {
    // Snake moving down (neck is above head)
    const gameState = {
      you: {
        body: [
          { x: 5, y: 5 }, // Head
          { x: 5, y: 6 }, // Neck is above
          { x: 5, y: 7 }  // Rest of body
        ]
      }
    };

    const possibleMoves = { up: true, down: true, left: true, right: true };
    
    // Apply avoidGoingBackwards function
    avoidGoingBackwards(gameState, possibleMoves);
    
    // Should not be able to move up, to its neck
    expect(possibleMoves).toEqual({
      up: false,
      down: true,
      left: true,
      right: true
    });
  });
}); 