let scoreBlock;
let score = 0;
let gameSpeed = 10; // default speed

const foodImg = new Image();
foodImg.src = "apple.png";

const config = {
	step: 0,
	maxStep: 6,
	sizeCell: 16,
	sizeFood: 16 / 4
}

const snake = {
	x: 160,
	y: 160,
	dx: config.sizeCell,
	dy: 0,
	tails: [],
	maxTails: 3
}

let canvas = document.querySelector("#game-canvas");
let context = canvas.getContext("2d");


let food = {
	x: getRandomInt(0, canvas.width / config.sizeCell) * config.sizeCell,
	y: getRandomInt(0, canvas.height / config.sizeCell) * config.sizeCell
}

const img = document.createElement("img");
img.src = "head.png";
var pat = context.createPattern(img, "no-repeat");

scoreBlock = document.querySelector(".game-score .score-count");
drawScore();

const startGameButton = document.getElementById("start-game-button");
const start_sound = new Audio("./start_sound.mp3");
const eat_sound = new Audio("./eating.mp3");
const death_sound = new Audio("./death.wav");
startGameButton.addEventListener("click", startGame);


let gameStarted = false;
document.addEventListener("keydown", function (event) {
	if (event.code === "Escape" && gameStarted) {
		console.log("Game refreshed!")
		refreshGame();
	}
	if (event.code === "Space" && !gameStarted) {
		gameStarted = true;
		startGameButton.click();
		console.log("Game started!")
	}
});


function startGame() {
	start_sound.play();
	gameStarted = true;
	function gameLoop() {
		setTimeout(() => {
			requestAnimationFrame(gameLoop);
		}, gameSpeed);
		// requestAnimationFrame(gameLoop);
		if (++config.step < config.maxStep) {
			return;
		}
		config.step = 0;

		context.clearRect(0, 0, canvas.width, canvas.height);

		drawFood();
		drawSnake();
	}
	requestAnimationFrame(gameLoop);

	function drawSnake() {
		snake.x += snake.dx;
		snake.y += snake.dy;

		collisionBorder();

		// todo бордер
		snake.tails.unshift({ x: snake.x, y: snake.y });

		if (snake.tails.length > snake.maxTails) {
			snake.tails.pop();
		}

		snake.tails.forEach(function (el, index) {
			if (index == 0) {
				context.fillStyle = "#19ce2e";
				// context.fillStyle = pat;
			} else {
				context.fillStyle = "#00820f";
			}
			context.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);

			if (el.x === food.x && el.y === food.y) {
				eat_sound.play()
				snake.maxTails++;
				incScore();
				randomPositionFood();
			}

			for (let i = index + 1; i < snake.tails.length; i++) {

				if (el.x == snake.tails[i].x && el.y == snake.tails[i].y) {
					refreshGame();
				}

			}

		});
	}

	function collisionBorder() {
		if (snake.x < 0) {
			snake.x = canvas.width - config.sizeCell;
		} else if (snake.x >= canvas.width) {
			snake.x = 0;
		}

		if (snake.y < 0) {
			snake.y = canvas.height - config.sizeCell;
		} else if (snake.y >= canvas.height) {
			snake.y = 0;
		}
	}
	function incScore() {
		switch (score) {
			case 2:
				gameSpeed = gameSpeed - 1
				console.log(gameSpeed)
				break;
			case 4:
				gameSpeed = gameSpeed - 1
				console.log(gameSpeed)
				break;
			case 6:
				gameSpeed = gameSpeed - 1
				console.log(gameSpeed)
				break;
			case 8:
				gameSpeed = gameSpeed - 1
				console.log(gameSpeed)
				break;
			case 10:
				gameSpeed = gameSpeed - 1
				console.log(gameSpeed)
				break;

			default:
				break;
		}

		score++;
		drawScore();
	}
	startGameButton.style.display = "none";
}

function refreshGame() {
	death_sound.play()
	alert(`Your score is: ${score}`)
	score = 0;
	drawScore();

	snake.x = 160;
	snake.y = 160;
	snake.tails = [];
	snake.maxTails = 3;
	snake.dx = config.sizeCell;
	snake.dy = 0;
	gameSpeed = 10;

	randomPositionFood();

	location.reload();
}

function drawFood() {
	context.beginPath();
	context.fillStyle = "#A00034";
	// context.arc(food.x + (config.sizeCell / 2), food.y + (config.sizeCell / 2), config.sizeFood, 0, 2 * Math.PI);
	context.drawImage(foodImg, food.x, food.y);
	context.fill();
}

function randomPositionFood() {
	food.x = getRandomInt(0, canvas.width / config.sizeCell) * config.sizeCell;
	food.y = getRandomInt(0, canvas.height / config.sizeCell) * config.sizeCell;
}



function drawScore() {
	scoreBlock.innerHTML = score;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

let dir; // stores direction

document.addEventListener("keydown", direction)

function direction(e) {
	if (e.code == "KeyW" && dir != "down") {
		snake.dy = -config.sizeCell;
		snake.dx = 0;
		dir = "up";
	} else if (e.code == "KeyA" && dir != "right") {
		snake.dx = -config.sizeCell;
		snake.dy = 0;
		dir = "left";
	} else if (e.code == "KeyS" && dir != "up") {
		snake.dy = config.sizeCell;
		snake.dx = 0;
		dir = "down";
	} else if (e.code == "KeyD" && dir != "left") {
		snake.dx = config.sizeCell;
		snake.dy = 0;
		dir = "right";
	}
}
