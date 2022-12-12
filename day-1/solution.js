var fs = require('fs')

function calorieCounter() {
    const file = "day-1/resources/day-1-puzzle-input.txt";

    const data = fs.readFileSync(file).toString().split("\n\n");

    const elves = [];
    data.forEach((calorie) => 
        elves.push(calorie.split("\n"))
    );

    const sums = [];
    elves.forEach((elf) =>
      sums.push(elf.reduce((a, b) => parseFloat(a) + parseFloat(b), 0))
    );

    return Math.max(...sums);
}

console.log(calorieCounter());
