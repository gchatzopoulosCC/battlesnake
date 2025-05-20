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
    author: "gchatzopoulosCC",
    color: "#F64A91",
    head: "silly",
    tail: "bolt",
  };
}

export { start, end, printBoard, info };
