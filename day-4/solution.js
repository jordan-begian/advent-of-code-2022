import { readFileSync } from "fs";

// class to hold start and end values
class Elf {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

const filePath = "day-4/resources/day-4-puzzle-input.txt";

const elfPairs = getPuzzleInput(filePath);
const pairs = findFullyContainedRanges(elfPairs);

console.log(pairs);

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

// checks to see if either section range is contained within each elf pair
// filters out how many are contained and returns the amount of contained pairs
function findFullyContainedRanges(elfPairs) {
  return elfPairs
    .map((pair) => {
      if (pair[0].start >= pair[1].start && pair[0].end <= pair[1].end) {
        return true;
      }
      if (pair[1].start >= pair[0].start && pair[1].end <= pair[0].end) {
        return true;
      }
      return false;
    })
    .filter((result) => result == true).length;
}
