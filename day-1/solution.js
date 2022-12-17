import { readFileSync } from "fs";

const file = "day-1/resources/day-1-puzzle-input.txt";
const elvesCalories = getPuzzleInput(file);
const result = findLargestCalorieTotal(elvesCalories);

console.log(result);

function getPuzzleInput(file) {
  return readFileSync(file)
    .toString()
    .split("\n\n")
    .map((item) => item.split("\n"));
}

function findLargestCalorieTotal(elvesCalories) {
  const sums = [];
  elvesCalories.forEach((elf) =>
    sums.push(elf.reduce((a, b) => parseFloat(a) + parseFloat(b), 0))
  );
  return Math.max(...sums);
}
