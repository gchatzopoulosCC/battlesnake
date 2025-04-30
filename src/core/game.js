// This file contains all the core functions of the game

function start(gameState) {
  console.log("GAME START");
}

function end(gameState) {
  console.log("GAME OVER\n");
}

function printBoard(board) {
  console.log(board);
}

// info is called when you create your Battlesnake on play.battlesnake.com
// and controls your Battlesnake's appearance
// TIP: If you open your Battlesnake URL in a browser you should see this data
function info() {
  console.log("INFO");

  return {
    apiversion: "1",
    author: "gchatzopoulosCC", // TODO: Your Battlesnake Username
    color: "#F64A91", // TODO: Choose color
    head: "silly", // TODO: Choose head
    tail: "bolt", // TODO: Choose tail
  };
}

export { start, end, printBoard, info };
