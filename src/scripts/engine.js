const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
  },
  values: {
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    currentLives: 3,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    GameOver();
  }
}

function reduceLives() {
  playSound("hurt.mp3");
  state.values.currentLives--;
  state.view.lives.textContent = "x" + state.values.currentLives;

  if (state.values.currentLives <= 0) {
    GameOver();
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audio/${audioName}`);
  audio.volume = 0.3;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitbox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit.m4a");
      }
      if (
        state.values.currentLives > 0 &&
        square.id != state.values.hitPosition
      ) {
        reduceLives();
      }
    });
  });
}

function GameOver() {
  state.values.currentTime = 0;
  state.view.timeLeft.textContent = state.values.currentTime;
  clearInterval(state.actions.countDownTimerId);
  clearInterval(state.actions.timerId);
  playSound("game-over.mp3");
  alert("Game Over! o seu resultado foi: " + state.values.result);
}

function initialize() {
  addListenerHitbox();
}

initialize();
