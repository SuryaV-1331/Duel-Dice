const rollDiceEle = document.querySelector(".btn--roll");
const diceEle = document.querySelector(".dice");
const currentScore0Ele = document.querySelector("#current--0");
const currentScore1Ele = document.querySelector("#current--1");
const player0Ele = document.querySelector(".player--0");
const player1Ele = document.querySelector(".player--1");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");

diceEle.classList.add("hidden");

let scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;

rollDiceEle.addEventListener("click", function () {
  if (playing) {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    diceEle.src = `dice-${randomNumber}.png`;
    diceEle.classList.remove("hidden");
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      playing = false;
      diceEle.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0Ele.classList.toggle("player--active");
  player1Ele.classList.toggle("player--active");
};

newBtn.addEventListener("click", function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  const scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  player0Ele.classList.add("player--active");
  player1Ele.classList.remove("player--active");
  playing = true;
  document.getElementById(`current--0`).textContent = currentScore;
  document.getElementById(`current--1`).textContent = currentScore;
  document.getElementById(`score--0`).textContent = scores[0];
  document.getElementById(`score--1`).textContent = scores[1];
  diceEle.classList.add("hidden");
});
