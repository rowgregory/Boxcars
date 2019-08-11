let scores, roundScore, activePlayer, gamePlaying;

init();

let lastDice;

document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    let dice = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    let diceImg = document.querySelector(".dice");
    let diceImg2 = document.querySelector(".dice2");
    diceImg.style.display = "block";
    diceImg.src = `./images/dice-${dice}.png`;

    if (dice === 6 && lastDice === 6) {
      // Player looses score
      scores[activePlayer] = 0;
      document.querySelector(`#score-${activePlayer}`).textContent = 0;
      document.querySelector(`#score-${activePlayer}`).classList.add("scale");
      diceImg.src = `dice-${dice}.png`;
      diceImg.style.left = "40%";
      diceImg2.src = `./images/dice-${dice}.png`;
      diceImg2.style.left = "52%";
      diceImg2.style.display = "block";
      setTimeout(() => {
        diceImg2.style.display = "none";
        diceImg.style.left = "45%";
        nextPlayer();
      }, 1000);
    } else if (dice !== 1) {
      roundScore += dice;
      if (roundScore === 21) {
        roundScore += roundScore;
        console.log(roundScore);
      }
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      gamePlaying = false;
      diceImg.style.border = "red 2px solid";
      diceImg.classList.add("shake");
      setTimeout(() => {
        nextPlayer();
        diceImg.style.border = "none";
        diceImg.classList.remove("shake");
      }, 2000);
    }

    lastDice = dice;
  }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];

    let input = document.querySelector(".final-score").value;
    let winningScore;
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {
      document.querySelector(`#name-${activePlayer}`).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

const nextPlayer = () => {
  lastDice = "";
  gamePlaying = true;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  // set round score back to 0
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
};

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
