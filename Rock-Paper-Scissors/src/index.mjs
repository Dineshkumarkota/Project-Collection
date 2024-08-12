function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function playRound(humanChoice, computerChoice) {
  let resultMessage = "";
  if (humanChoice === computerChoice) {
    resultMessage = `It's a tie! Both chose ${humanChoice}.`;
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
    resultMessage = `You win! ${humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1)} beats ${computerChoice}.`;
  } else {
    computerScore++;
    resultMessage = `You lose! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${humanChoice}.`;
  }

  document.getElementById("results").innerHTML += `<p>${resultMessage}</p>`;
  updateScore();
  checkWinner();
}

function updateScore() {
  document.getElementById("score").innerHTML =
    `Human: ${humanScore} - Computer: ${computerScore}`;
}

function checkWinner() {
  if (humanScore === 5) {
    document.getElementById("results").innerHTML +=
      "<h2>Congratulations! You are the overall winner!</h2>";
    resetGame();
  } else if (computerScore === 5) {
    document.getElementById("results").innerHTML +=
      "<h2>The computer wins! Better luck next time!</h2>";
    resetGame();
  }
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  updateScore();
}

let humanScore = 0;
let computerScore = 0;

document.querySelectorAll(".game-button").forEach((button) => {
  button.addEventListener("click", () => {
    const humanChoice = button.getAttribute("data-choice");
    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
  });
});
