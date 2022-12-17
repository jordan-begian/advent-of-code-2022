import { readFileSync } from "fs";

class Player {
  constructor(choice, score) {
    this.choice = choice;
    this.choiceValue = (function () {
      switch (choice) {
        case "A":
        case "X":
          return 1;
        case "B":
        case "Y":
          return 2;
        case "C":
        case "Z":
          return 3;
      }
    })();
    this.score = score;
  }
}

const file = "day-2/resources/day-2-puzzle-input.txt";
const rounds = getRounds(file);

console.log(rounds);

function getRounds(file) {
  const puzzleInput = [];
  readFileSync(file)
    .toString()
    .split("\n")
    .forEach((item) => puzzleInput.push(item.split(" ")));
  return puzzleInput.map((round) => round.map((player) => new Player(player)));
}
