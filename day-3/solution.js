import { readFileSync } from "fs";

// enums to use for finding the priority value of a lowercase letter item
const lowerCase = Object.freeze({
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
});

// enums to use for finding the priority value of a uppercase letter item
const upperCase = Object.freeze({
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
});

const filePath = "day-3/resources/day-3-puzzle-input.txt";
const rucksacks = getPuzzleInput(filePath);
const matchingItems = filterMatches(rucksacks);
const sumOfPriorities = findSumOfPriorities(matchingItems);

console.log(sumOfPriorities);

// gets puzzle input by reading each line in a text file and splitting each string in half
function getPuzzleInput(filePath) {
  return readFileSync(filePath)
    .toString()
    .split("\n")
    .map((item) => [
      item.slice(0, item.length / 2),
      item.slice(item.length / 2, item.length),
    ]);
}

// finds any matching letter and filters out duplicates if any item has duplicate matches
function filterMatches(rucksacks) {
  return rucksacks.flatMap((rucksack) => [
    ...new Set(
      rucksack[0].split("").filter((letter) => rucksack[1].includes(letter))
    ),
  ]);
}

// finds the value of each letter via enums and sums the list of values
function findSumOfPriorities(matchingItems) {
  const lowerCasePattern = new RegExp("[a-z]");
  return matchingItems
    .map((letter) =>
      letter.toString().match(lowerCasePattern)
        ? lowerCase[letter]
        : upperCase[letter]
    )
    .reduce((a, b) => a + b, 0);
}
