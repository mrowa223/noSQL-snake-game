import React, { useState, useEffect } from "react";

import image from "../source/img/apple.png"

import { newRecord } from "../actions/user";

const Game = () => {

  let scoreRef = document.querySelector(".game-score .score-count");
  let [score, setScore] = useState(0);
  const [snake] = useState({
    x: 160,
    y: 160,
    dx: 16,
    dy: 0,
    tails: [],
    maxTails: 3,
  });

  // timer
  var h1 = document.getElementsByTagName('h1')[0];
  var [sec, setSec] = useState(0);
  var min = 0;
  var [time, setTime] = useState(0);
  var [step, setStep] = useState(0);

  // const foodImg = new Image();
  // foodImg.src = "../source/img/apple.png";

  const [food, setFood] = useState({
    x: getRandomInt(0, 25) * 16,
    y: getRandomInt(0, 25) * 16,
  });

  const img = document.createElement("img");
  img.src = "head.png";
  // var pat = context.createPattern(img, "no-repeat");

  const startGameButton = document.getElementById("start-game-button");
  // const start_sound = new Audio("./sounds/start_sound.mp3");
  // const eat_sound = new Audio("./sounds/eating.mp3");
  // const death_sound = new Audio("./sounds/death.wav");
  let [gameStarted, setGameStarted] = useState(false);
  // let [gameEnded, setGameEnded] = useState(false);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  useEffect(() => {
    let canvas = document.querySelector("#game-canvas");
    let context = canvas.getContext("2d");
    const config = {
      step: step,
      maxStep: 6,
      sizeCell: 16,
      sizeFood: 16 / 4
    }
    // scoreRef = document.querySelector(".game-score .score-count");

    function tick() {
      sec++;
      if (sec >= 60) {
        setSec(0);
        min++;
      }
    }

    function add() {
      tick();
      h1.textContent = (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
      timer();
    }

    function timer() {
      setTime(setTimeout(add, 1000));
    }
    if (startGameButton) {
      startGameButton.addEventListener("click", startGame);
    }


    function startGame() {
      // start the timer
      timer();

      // game itself
      setGameStarted(true);
      setTimeout(function () {
        startGameButton.style.display = "none";
      }, 350);

      startGameButton.classList.add('slide-out');
      // start_sound.play();
      function gameLoop() {
        // setTimeout(() => {
        // 	requestAnimationFrame(gameLoop);
        // }, gameSpeed);
        requestAnimationFrame(gameLoop);
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
          if (index === 0) {
            context.fillStyle = "#19ce2e";
            // context.fillStyle = pat;
          } else {
            context.fillStyle = "#00820f";
          }
          context.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);

          if (el.x === food.x && el.y === food.y) {
            setScore((prev) => prev + 1);
            // eat_sound.play()
            // setSnake((prev) => ({ ...prev, maxTails: prev.maxTails + 1 }));
            snake.maxTails++;
            incScore();
            randomPositionFood();
            setFood()
            setStep((prev) => (prev + 1) % config.maxStep);
          }

          for (let i = index + 1; i < snake.tails.length; i++) {
            if (el.x === snake.tails[i].x && el.y === snake.tails[i].y) {
              refreshGame();
              break;
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

    }

    function incScore() {
      score++
    }

    document.addEventListener("keydown", function (event) {
      // if (event.code === "Escape" && gameStarted === true) {
      //   console.log("Game refreshed!")
      //   refreshGame();
      // }
      if (event.code === "Space" && gameStarted === false) {
        setGameStarted(true);
        if (startGameButton) {
          startGameButton.click();
        }
        // console.log("Game started!")
      }
    });

    function refreshGame() {
      // death_sound.play()
      alert(`Your score is: ${score} and time played is: ${min} mins ${sec} secs`)
      newRecord(score, min*60+sec);

      clearTimeout(time);
      // setScore(0);
      // setFood();
      window.location.reload()
    }

    function drawFood() {
      context.beginPath();
      context.fillStyle = "#A00034";
      if(snake.x === food.x && snake.y === food.y){
        context.arc(food.x + (config.sizeCell / 2), food.y + (config.sizeCell / 2), config.sizeFood, 0, 28 * Math.PI);
      } else{
        context.arc(food.x + (config.sizeCell / 2), food.y + (config.sizeCell / 2), config.sizeFood, 0, 2 * Math.PI);
      }

      // context.drawImage(image, food.x, food.y);

      context.fill();
    }

    function randomPositionFood() {
      food.x = getRandomInt(0, canvas.width / config.sizeCell) * config.sizeCell;
      food.y = getRandomInt(0, canvas.height / config.sizeCell) * config.sizeCell;
    }

    let dir = "right"

    document.addEventListener("keydown", direction)

    function direction(e) {
      if (e.code === "KeyW" && dir !== "down") {
        snake.dy = -config.sizeCell;
        snake.dx = 0;
        dir = "up";
      } else if (e.code === "KeyA" && dir !== "right") {
        snake.dx = -config.sizeCell;
        snake.dy = 0;
        dir = "left";
      } else if (e.code === "KeyS" && dir !== "up") {
        snake.dy = config.sizeCell;
        snake.dx = 0;
        dir = "down";
      } else if (e.code === "KeyD" && dir !== "left") {
        snake.dx = config.sizeCell;
        snake.dy = 0;
        dir = "right";
      }
    }
  }, [snake, food, gameStarted, score, startGameButton, sec, min, h1, time, step, scoreRef]);


  return (
    
    <div>
      <div id="game">
        <div className="game-header">
          <h1><time>00:00</time></h1>
          <div className="game-score">
            <span className="score-count">{score}</span>
          </div>
        </div>
        <div className="canvas-wrapper">
          <canvas id="game-canvas" width="320" height="400">
            <img src={image} alt="food"></img>
          </canvas>
        </div>
      </div>
      <button id="start-game-button">Start Game</button>
    </div>
  );
}

export default Game;