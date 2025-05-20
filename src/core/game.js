// This file contains all the core functions of the game

function start() {
  console.log("GAME START");
}

function end() {
  console.log("GAME OVER\n");
}

function printBoard(board) {
  console.log(board);
}

function info() {
  console.log("INFO");

  return {
    apiversion: "1",
    author: "gchatzopoulosCC", // TODO: Your Battlesnake Username
    color: "#000000", // TODO: Choose color
    head: "silly", // TODO: Choose head
    tail: "bolt", // TODO: Choose tail
  };
}

export { start, end, printBoard, info };
