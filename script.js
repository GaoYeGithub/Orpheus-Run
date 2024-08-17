const character = document.querySelector(".character")
const obstacles = document.querySelector(".obstacles")
const collectible = document.querySelector(".collectible")
const scoreText = document.querySelector(".score")
const highScoreText = document.querySelector(".high-score")
let score = 0;
let highScore = 0;
let isStarted = false;
let gameSpeed = 1;

const gameOverSound = new Audio('game-over.mp3');
const jumpSound = new Audio('jump-sound.mp3');
const backgroundMusic = new Audio('background-music.mp3'); 
backgroundMusic.loop = true;

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 32) jump();
})

function jump() {
  if (character.classList !== "jump") {
    clearTimeout()
    character.classList.add("jump");
    jumpSound.play();
    setTimeout(() => {
      character.classList.remove("jump");
    }, 1200);
  }
}

function startMoving() {
  if (obstacles.classList !== "move") {
    obstacles.classList.add("move")
  }
  if (collectible.classList !== "move") {
    collectible.classList.add("move")
  }
}

function start() {
  if (!isStarted) {
    isStarted = true;
    backgroundMusic.play();
    startMoving();
    checkDead();
    scoreCounter();
    increaseDifficulty();
  }
}

function scoreCounter() {
  if (!isStarted) {
    return;
  }
  score++;
  scoreText.innerHTML = "Score: " + Math.round(score / 20)
  requestAnimationFrame(scoreCounter)
}

function checkDead() {
  let characterTopPosition = parseInt(window.getComputedStyle(character).getPropertyValue("top"))
  let obstaclesLeftPosition = parseInt(window.getComputedStyle(obstacles).getPropertyValue("left"))
  let collectibleLeftPosition = parseInt(window.getComputedStyle(collectible).getPropertyValue("left"))

  if (obstaclesLeftPosition <= 80 && obstaclesLeftPosition >= 20 && characterTopPosition >= 60) {
    isStarted = false;
    obstacles.classList.remove("move")
    collectible.classList.remove("move")
    gameOverSound.play();
    backgroundMusic.pause();
    alert("Game Over!")
    if (score > highScore) {
      highScore = score;
      highScoreText.innerHTML = "High Score: " + Math.round(highScore / 20);
    }
    score = 0;
  }

  if (collectibleLeftPosition <= 80 && collectibleLeftPosition >= 20 && characterTopPosition < 60) {
    score += 100;
    collectible.style.left = "500px";
  }

  requestAnimationFrame(checkDead)
}

function increaseDifficulty() {
  if (!isStarted) {
    return;
  }
  gameSpeed += 0.01;
  document.documentElement.style.setProperty('--game-speed', gameSpeed);
  setTimeout(increaseDifficulty, 1000);
}

const style = document.createElement('style');
style.innerHTML = `
  .move {
    animation: move calc(1s / var(--game-speed)) infinite linear;
  }
`;
document.head.appendChild(style);
