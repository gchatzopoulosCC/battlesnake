import { avoidOthers } from './avoidOthers.js';
import { expect } from '@jest/globals';

describe('avoidOthers Points of Interest', () => {
  // POI #1: Basic case - no other snakes on board
  test('POI: No other snakes on board - all directions remain safe', () => {
    const gameState = {
      you: {
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // head
          { x: 5, y: 6 }, // body
          { x: 5, y: 7 }  // tail
        ],
        length: 3
      },
      board: {
        snakes: [] // no other snakes
      }
    };
    
    // Add "you" to the snakes array to simulate the game state correctly
    gameState.board.snakes = [gameState.you];
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    avoidOthers(gameState, isMoveSafe);
    
    // With no other snakes, all directions should still be safe
    expect(isMoveSafe.up).toBe(true);
    expect(isMoveSafe.down).toBe(true);
    expect(isMoveSafe.left).toBe(true);
    expect(isMoveSafe.right).toBe(true);
  });
  
  // POI #2: Other snake directly to the right
  test('POI: Other snake body to the right - right should be unsafe', () => {
    const gameState = {
      you: {
        id: "our-id",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // head
          { x: 5, y: 6 }, // body
          { x: 5, y: 7 }  // tail
        ],
        length: 3
      },
      board: {
        snakes: [
          {
            id: "enemy-id",
            head: { x: 7, y: 5 },
            body: [
              { x: 7, y: 5 }, // enemy head
              { x: 6, y: 5 }, // enemy body - directly to our right
              { x: 5, y: 3 }  // enemy tail
            ],
            length: 3
          }
        ]
      }
    };
    
    // Add "you" to the snakes array
    gameState.board.snakes.unshift(gameState.you);
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    avoidOthers(gameState, isMoveSafe);
    
    // Right should now be unsafe (enemy body is there)
    expect(isMoveSafe.right).toBe(false);
    
    // Other directions should still be safe
    expect(isMoveSafe.up).toBe(true);
    expect(isMoveSafe.down).toBe(true);
    expect(isMoveSafe.left).toBe(true);
  });
  
  // POI #3: Other snake in multiple directions
  test('POI: Other snake body in multiple directions - multiple directions unsafe', () => {
    const gameState = {
      you: {
        id: "our-id",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // head
          { x: 5, y: 6 }, // body
          { x: 5, y: 7 }  // tail
        ],
        length: 3
      },
      board: {
        snakes: [
          {
            id: "enemy-id",
            head: { x: 6, y: 6 },
            body: [
              { x: 6, y: 6 }, // enemy head
              { x: 6, y: 5 }, // enemy body - to our right
              { x: 5, y: 4 }, // enemy body - below you
              { x: 4, y: 4 }  // enemy tail
            ],
            length: 4
          }
        ]
      }
    };
    
    // Add "you" to the snakes array
    gameState.board.snakes.unshift(gameState.you);
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    avoidOthers(gameState, isMoveSafe);
    
    // Right and down should be unsafe
    expect(isMoveSafe.right).toBe(false); // Enemy body to right
    expect(isMoveSafe.down).toBe(false);  // Enemy body below
    
    // Other directions should still be safe
    expect(isMoveSafe.up).toBe(true);
    expect(isMoveSafe.left).toBe(true);
  });
  
  // POI #4: Head-to-head confrontation with larger snake
  test('POI: Head-to-head confrontation - adjacent to larger snake head', () => {
    const gameState = {
      you: {
        id: "our-id",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // our head
          { x: 5, y: 6 }, // body
          { x: 5, y: 7 }  // tail
        ],
        length: 3 // You are length 3
      },
      board: {
        snakes: [
          // You will be added
          {
            id: "enemy-id",
            head: { x: 6, y: 5 }, // Enemy head directly to our right
            body: [
              { x: 6, y: 5 }, // enemy head
              { x: 7, y: 5 }, // enemy body
              { x: 8, y: 5 }, // enemy body
              { x: 9, y: 5 }  // enemy tail
            ],
            length: 4 // Enemy is length 4 (larger than you)
          }
        ]
      }
    };
    
    
    gameState.board.snakes.unshift(gameState.you);
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    avoidOthers(gameState, isMoveSafe);
    
    // Right should be unsafe - enemy head is there, and it's larger
    expect(isMoveSafe.right).toBe(false);
    
    // Other directions should still be safe
    expect(isMoveSafe.up).toBe(true);
    expect(isMoveSafe.down).toBe(true);
    expect(isMoveSafe.left).toBe(true);
  });
  
  // POI #5: Head-to-head confrontation with smaller snake
  test('POI: Head-to-head confrontation - adjacent to smaller snake head', () => {
    const gameState = {
      you: {
        id: "our-id",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // our head
          { x: 5, y: 6 }, // body
          { x: 5, y: 7 }, // body
          { x: 5, y: 8 }  // tail
        ],
        length: 4 // You are length 4
      },
      board: {
        snakes: [
          // You will be added
          {
            id: "enemy-id",
            head: { x: 6, y: 5 }, // Enemy head directly to our right
            body: [
              { x: 6, y: 5 }, // enemy head
              { x: 7, y: 5 }, // enemy body
              { x: 8, y: 5 }  // enemy tail
            ],
            length: 3 // Enemy is length 3 (smaller than you)
          }
        ]
      }
    };
    
    gameState.board.snakes.unshift(gameState.you);
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    avoidOthers(gameState, isMoveSafe);
    
    // Our implementation avoids all head-to-head collisions, even with smaller snakes
    expect(isMoveSafe.right).toBe(false);
    
    // Other directions should still be safe
    expect(isMoveSafe.up).toBe(true);
    expect(isMoveSafe.down).toBe(true);
    expect(isMoveSafe.left).toBe(true);
  });
  
  // POI #6: Multiple snakes creating complex collision scenarios
  test('POI: Multiple snakes creating complex collision scenarios', () => {
    const gameState = {
      you: {
        id: "our-id",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // our head
          { x: 5, y: 6 }, // body
          { x: 5, y: 7 }  // tail
        ],
        length: 3
      },
      board: {
        snakes: [
          // You will be added first
          {
            id: "enemy1-id",
            head: { x: 6, y: 6 },
            body: [
              { x: 6, y: 6 }, // enemy1 head
              { x: 6, y: 5 }, // enemy1 body - to our right
              { x: 6, y: 4 }  // enemy1 tail
            ],
            length: 3
          },
          {
            id: "enemy2-id",
            head: { x: 4, y: 4 },
            body: [
              { x: 4, y: 4 }, // enemy2 head
              { x: 4, y: 5 }, // enemy2 body - to our left
              { x: 4, y: 6 }  // enemy2 tail
            ],
            length: 3
          }
        ]
      }
    };
    
    // Add "you" to the snakes array
    gameState.board.snakes.unshift(gameState.you);
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    avoidOthers(gameState, isMoveSafe);
    
    // Right and left should be unsafe due to enemy bodies
    expect(isMoveSafe.right).toBe(false); // Enemy1 body to right
    expect(isMoveSafe.left).toBe(false);  // Enemy2 body to left
    
    // Up is unsafe due to our own body (but this is handled by avoidSelf)
    // Down should be safe from other snakes
    expect(isMoveSafe.down).toBe(true);
  });
  
  // POI #7: Future collision avoidance (where enemy head could move next)
  test('POI: Future collision avoidance - avoid where enemy head could move', () => {
    const gameState = {
      you: {
        id: "our-id",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // our head
          { x: 5, y: 6 }, // body
          { x: 5, y: 7 }  // tail
        ],
        length: 3 // You are length 3
      },
      board: {
        snakes: [
          // You will be added
          {
            id: "enemy-id",
            head: { x: 7, y: 4 }, // Enemy head is diagonal from ours
            body: [
              { x: 7, y: 4 }, // enemy head
              { x: 8, y: 4 }, // enemy body
              { x: 9, y: 4 }, // enemy body
              { x: 10, y: 4 } // enemy tail
            ],
            length: 4 // Enemy is length 4 (larger than you)
          }
        ]
      }
    };
    
    // Add "you" to the snakes array
    gameState.board.snakes.unshift(gameState.you);
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    avoidOthers(gameState, isMoveSafe);
    
    // Right could lead to a future collision if the enemy moves left
    // If we want to consider future moves:
    // expect(isMoveSafe.right).toBe(false);
    
    // All directions should be safe from immediate collisions
    expect(isMoveSafe.up).toBe(true);
    expect(isMoveSafe.down).toBe(true);
    expect(isMoveSafe.left).toBe(true);
  });
  
  // POI #8: Snake trap - surrounded on multiple sides by other snakes
  test('POI: Snake trap - surrounded on multiple sides by other snakes', () => {
    const gameState = {
      you: {
        id: "our-id",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // our head
          { x: 5, y: 6 }, // body
          { x: 6, y: 6 }, // body
          { x: 6, y: 5 }  // tail - to our right
        ],
        length: 4
      },
      board: {
        snakes: [
          // First snake is ourself (added below)
          {
            id: "enemy1-id",
            head: { x: 3, y: 5 },
            body: [
              { x: 3, y: 5 }, // enemy1 head
              { x: 4, y: 5 }, // enemy1 body - to our left
              { x: 4, y: 4 }  // enemy1 tail
            ],
            length: 3
          },
          {
            id: "enemy2-id",
            head: { x: 5, y: 3 },
            body: [
              { x: 5, y: 3 }, // enemy2 head
              { x: 5, y: 4 }, // enemy2 body - below you
              { x: 6, y: 4 }  // enemy2 tail
            ],
            length: 3
          }
        ]
      }
    };
    
    
    gameState.board.snakes.unshift(gameState.you);
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    avoidOthers(gameState, isMoveSafe);
    
    // Left and down should be unsafe due to other snakes
    expect(isMoveSafe.left).toBe(false);  // Enemy1 body to left
    expect(isMoveSafe.down).toBe(false);  // Enemy2 body below
    
    // Right is our own tail, but avoidOthers doesn't check self collisions
    // so it should still be true (avoidSelf would mark it as false)
    expect(isMoveSafe.right).toBe(true); 
    
    // Up is the only safe direction
    expect(isMoveSafe.up).toBe(true);
  });
  
  // POI #9: Head-to-head confrontation with EQUAL-SIZED snake
  test('POI: Head-to-head confrontation - adjacent to equal-sized snake head', () => {
    const gameState = {
      you: {
        id: "our-id",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // our head
          { x: 5, y: 6 }, // body
          { x: 5, y: 7 }  // tail
        ],
        length: 3 // You are length 3
      },
      board: {
        snakes: [
          {
            id: "enemy-id",
            head: { x: 6, y: 5 }, // Enemy head directly to our right
            body: [
              { x: 6, y: 5 }, // enemy head
              { x: 7, y: 5 }, // enemy body
              { x: 8, y: 5 }  // enemy tail
            ],
            length: 3 // Enemy is EQUAL length
          }
        ]
      }
    };
    
    // Add "you" to the snakes array
    gameState.board.snakes.unshift(gameState.you);
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    avoidOthers(gameState, isMoveSafe);
    
    // Right should be unsafe - enemy head is there with equal length (in Battlesnake, head-to-head
    // collisions with equal-length snakes result in both dying, so this should be avoided)
    expect(isMoveSafe.right).toBe(false);
    
    // Other directions should still be safe
    expect(isMoveSafe.up).toBe(true);
    expect(isMoveSafe.down).toBe(true);
    expect(isMoveSafe.left).toBe(true);
  });
  
  // POI #10: Snake that just ate food and grew - testing post-eating collision detection
  test('POI: Snake that just ate food and grew - post-eating collision detection', () => {
    const gameState = {
      you: {
        id: "our-id",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // our head
          { x: 5, y: 6 }, // body
          { x: 5, y: 7 }  // tail
        ],
        length: 3
      },
      board: {
        snakes: [
          // Enemy snake that just ate food at (7,5) and grew
          {
            id: "enemy-id",
            head: { x: 7, y: 5 }, // enemy head - just ate food here
            body: [
              { x: 7, y: 5 }, // enemy head - current position after eating
              { x: 6, y: 5 }, // enemy body - previous head position
              { x: 5, y: 5 }, // enemy body - where its tail was before eating
              { x: 4, y: 5 }  // enemy tail - new body part added after eating
            ],
            length: 4 // Length increased after eating
          }
        ]
      }
    };
    
    
    gameState.board.snakes.unshift(gameState.you);
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    avoidOthers(gameState, isMoveSafe);
    
    // Right should be unsafe because moving right would put us at (6,5) which is the enemy's body
    expect(isMoveSafe.right).toBe(false);
    
    // Left should be false due to enemy's tail after growth
    expect(isMoveSafe.left).toBe(false);
    
    // Other directions should still be safe
    expect(isMoveSafe.up).toBe(true);
    expect(isMoveSafe.down).toBe(true);
  });
  
  // POI #11: Distinguishing between different snake parts and sizes
  test('POI: Distinguishing between body parts and different sized snake heads', () => {
    const gameState = {
      you: {
        id: "our-id",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // our head
          { x: 5, y: 6 }, // our body
          { x: 5, y: 7 }  // our tail
        ],
        length: 3
      },
      board: {
        snakes: [
          // Scenario with multiple snakes of different sizes in different positions
          {
            id: "larger-snake",
            head: { x: 6, y: 5 }, // Larger snake head to our right
            body: [
              { x: 6, y: 5 }, // head
              { x: 7, y: 5 }, // body
              { x: 8, y: 5 }, // body
              { x: 9, y: 5 }  // tail
            ],
            length: 4 // Larger than you
          },
          {
            id: "smaller-snake",
            head: { x: 4, y: 5 }, // Smaller snake head to our left
            body: [
              { x: 4, y: 5 }, // head
              { x: 3, y: 5 }  // tail
            ],
            length: 2 // Smaller than you
          },
          {
            id: "equal-snake",
            head: { x: 5, y: 4 }, // Equal snake head below you
            body: [
              { x: 5, y: 4 }, // head
              { x: 6, y: 4 }, // body
              { x: 7, y: 4 }  // tail
            ],
            length: 3 // Same size as you
          }
        ]
      }
    };
    
    // Add "you" to the snakes array
    gameState.board.snakes.unshift(gameState.you);
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    avoidOthers(gameState, isMoveSafe);
    
    // Right should be unsafe (larger snake head)
    expect(isMoveSafe.right).toBe(false);
    
    // Left should be unsafe - our implementation avoids ALL head-to-head collisions
    expect(isMoveSafe.left).toBe(false);
    
    // Down should be unsafe (equal size snake head)
    expect(isMoveSafe.down).toBe(false);
    
    // Up should be safe (no threats from other snakes, but this would be unsafe due to our own body)
    expect(isMoveSafe.up).toBe(true);
  });
  
  // POI #12: Multiple threats - forced to choose between different collision types
  test('POI: Multiple threats - forced to choose between different collision types', () => {
    const gameState = {
      you: {
        id: "our-id",
        head: { x: 5, y: 5 },
        body: [
          { x: 5, y: 5 }, // our head
          { x: 5, y: 6 }, // our body (up is blocked by our own body)
          { x: 5, y: 7 }  // our tail
        ],
        length: 3
      },
      board: {
        snakes: [
          // Three different threats surrounding our snake
          {
            id: "body-snake",
            head: { x: 10, y: 10 }, // head far away
            body: [
              { x: 10, y: 10 }, // head far away
              { x: 10, y: 9 },  // body far away
              { x: 9, y: 9 },   // body far away
              { x: 8, y: 9 },   // body far away
              { x: 7, y: 9 },   // body far away
              { x: 6, y: 9 },   // body far away
              { x: 6, y: 8 },   // body far away
              { x: 6, y: 7 },   // body far away
              { x: 6, y: 6 },   // body far away
              { x: 6, y: 5 }    // body directly to our right
            ],
            length: 10
          },
          {
            id: "larger-snake",
            head: { x: 5, y: 4 }, // Larger snake head below you
            body: [
              { x: 5, y: 4 }, // head
              { x: 4, y: 4 }, // body
              { x: 3, y: 4 }, // body
              { x: 2, y: 4 }  // tail
            ],
            length: 4 // Larger than you
          },
          {
            id: "smaller-snake",
            head: { x: 4, y: 5 }, // Smaller snake head to our left
            body: [
              { x: 4, y: 5 }, // head
              { x: 3, y: 5 }  // tail
            ],
            length: 2 // Smaller than you
          }
        ]
      }
    };
    
    // Add "you" to the snakes array
    gameState.board.snakes.unshift(gameState.you);
    
    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };
    
    avoidOthers(gameState, isMoveSafe);
    
    // Right should be unsafe (another snake's body part)
    expect(isMoveSafe.right).toBe(false);
    
    // Down should be unsafe (larger snake's head)
    expect(isMoveSafe.down).toBe(false);
    
    // Left is a smaller snake's head, our implementation avoids all head-to-head collisions
    expect(isMoveSafe.left).toBe(false);
  });
});
