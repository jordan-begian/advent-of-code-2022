import { readFileSync } from "fs";

class Player {
  constructor(choice) {
    this.choice = (function () {
      // Converts choice to a standardize value
      switch (choice) {
        case "A":
        case "X":
          return "ROCK";
        case "B":
        case "Y":
          return "PAPER";
        case "C":
        case "Z":
          return "SCISSORS";
      }
    })();
    this.choiceValue = (function () {
      // The players choice plays a factor their round score
      // ROCK = 1, PAPER = 2, SCISSORS = 3
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
    this.result = "";
    this.score = 0;
  }
}

const file = "day-2/resources/day-2-puzzle-input.txt";
const rounds = getRounds(file);
const scoredRounds = rounds.map((round) => determineRoundOutcome(round));
const winningScore = findWinningScore(scoredRounds);
console.log(winningScore);

function getRounds(file) {
  return readFileSync(file)
    .toString()
    .split("\n")
    .map((item) => item.split(" "))
    .map((round) => round.map((player) => new Player(player)));
}

function determineRoundOutcome(round) {
  const player1 = round[0];
  const player2 = round[1];
  // Check for draw round
  if (player1.choice == player2.choice) {
    // Sets score values for a draw round
    // Player choiceValue + 3 for both players
    return registerDrawRound(round);
  }
  // Sets score values for winner and loser
  // Winner - Player choiceValue + 6
  // Loser - Player choiceValue + 0
  return registerRoundWinner(player1, player2, round);
}

function registerDrawRound(round) {
  round.forEach((player) => {
    player.score = 3 + player.choiceValue;
    player.result = "DRAW";
  });
  return round;
}

function registerRoundWinner(player1, player2, round) {
  if (
    (player1.choice == "ROCK" && player2.choice == "SCISSORS") ||
    (player1.choice == "PAPER" && player2.choice == "ROCK") ||
    (player1.choice == "SCISSORS" && player2.choice == "PAPER")
  ) {
    player1.score = player1.choiceValue + 6;
    player1.result = "WIN";
    player2.score = player2.choiceValue;
    player2.result = "LOSE";

    return round;
  } else {
    player2.score = player2.choiceValue + 6;
    player2.result = "WIN";
    player1.score = player1.choiceValue;
    player1.result = "LOSE";
    return round;
  }
}

function findWinningScore(scoredRounds) {
  let player1TotalScore = 0;
  let player2TotalScore = 0;
  scoredRounds.forEach((round) => {
    player1TotalScore += round[0].score;
    player2TotalScore += round[1].score;
  });
  console.log(
    "Player 1 Score: %d\nPlayer 2 Score: %d",
    player1TotalScore,
    player2TotalScore
  );
  return player1TotalScore >= player2TotalScore
    ? player1TotalScore
    : player2TotalScore;
}
