import { readFileSync } from "fs";

// static array method to get the range between 2 numbers as an array
// example - Array.range(3,6) will output [ 3, 4, 5, 6 ]
Array.range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_v, k) => k + start);

// class to hold start, end, and range values
// range value will mainly be utilized to find solution
class Elf {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.range = Array.range(this.start, this.end);
  }
}

const filePath = "day-4/resources/day-4-puzzle-input.txt";

const puzzleInput = getPuzzleInput(filePath);

console.log(puzzleInput);

// reads file from file path, separates values by new line,
// and creates an elf based on start and end value
function getPuzzleInput(filePath) {
  return readFileSync(filePath)
    .toString()
    .split("\n")
    .map((item) =>
      item
        .split(",")
        .map((item) => item.split("-"))
        .map((item) => new Elf(Number(item[0]), Number(item[1])))
    );
}
