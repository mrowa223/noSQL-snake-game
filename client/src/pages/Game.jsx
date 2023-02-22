import React, { useState, useEffect, useRef } from "react";
import appleImg from "../source/img/apple.png";
import headImg from "../source/img/apple.png";
import startSound from "../source/sound/start_sound.mp3";
import eatSound from "../source/sound/eating.mp3";
import deathSound from "../source/sound/death.wav";

const Game = () => {
  const canvasRef = useRef(null);
  const scoreRef = useRef(0);
  const [score, setScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(10);
  const [snake, setSnake] = useState({
    x: 160,
    y: 160,
    dx: 16,
    dy: 0,
    tails: [],
    maxTails: 3,
  });

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function refreshGame() {
    console.log("x");
  }

  const [food, setFood] = useState({
    x: getRandomInt(0, 25) * 16,
    y: getRandomInt(0, 25) * 16,
  });

  const [gameStarted, setGameStarted] = useState(false);
  const [step, setStep] = useState(0);

  const config = {
    step: step,
    maxStep: 6,
    sizeCell: 16,
    sizeFood: 16 / 4,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = headImg;

    img.onload = () => {
      const pat = ctx.createPattern(img, "no-repeat");
      ctx.fillStyle = pat;
    };
    const drawSnake = () => {
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      snake.tails.unshift({ x: snake.x, y: snake.y });

      if (snake.tails.length > snake.maxTails) {
        snake.tails.pop();
      }

      ctx.fillStyle = "black";
      snake.tails.forEach(function (tail, index) {
        if (index === 0) {
          ctx.fillStyle = "#19ce2e";
        } else {
          ctx.fillStyle = "#00820f";
        }
        ctx.fillRect(tail.x, tail.y, config.sizeCell, config.sizeCell);

        if (tail.x === food.x && tail.y === food.y) {
          setFood();
          snake.maxTails++;
          // incScore();
          // randomPositionFood();
        } 

        // for (let i = index + 1; i < snake.tails.length; i++) {
        //   if (tail.x === snake.tails[i].x && tail.y === snake.tails[i].y) {
        //     refreshGame();
        //   }
        // }
      });

      ctx.fillRect(snake.x, snake.y, config.sizeCell, config.sizeCell);
    };

    const drawFood = () => {
      const foodImg = new Image();
      foodImg.src = appleImg;
      ctx.drawImage(foodImg, food.x, food.y, config.sizeFood, config.sizeFood);
    };

    const updateSnake = () => {
      const newTails = [...snake.tails];
      newTails.unshift({ x: snake.x, y: snake.y });
      if (newTails.length > snake.maxTails) {
        newTails.pop();
      }
      setSnake((prev) => ({
        ...prev,
        tails: newTails,
        x: prev.x + prev.dx,
        y: prev.y + prev.dy,
      }));
    };

    const checkCollision = () => {
      if (snake.x < 0 || snake.x >= canvas.width) {
        endGame();
      }
      if (snake.y < 0 || snake.y >= canvas.height) {
        endGame();
      }
      snake.tails.forEach((tail) => {
        if (snake.x === tail.x && snake.y === tail.y) {
          endGame();
        }
      });
    };

    const checkFoodCollision = () => {
      if (snake.x === food.x && snake.y === food.y) {
        setScore((prev) => prev + 1);
        eatSound.play();
        setFood({
          x: getRandomInt(0, 25) * 16,
          y: getRandomInt(0, 25) * 16,
        });
        setSnake((prev) => ({ ...prev, maxTails: prev.maxTails + 1 }));
        setGameSpeed((prev) => prev + 1);
        setStep((prev) => (prev + 1) % config.maxStep);
      }
    };

    const refreshGame = () => {
      setScore(0);
      setGameSpeed(10);
      setSnake({
        x: 160,
        y: 160,
        dx: 16,
        dy: 0,
        tails: [],
        maxTails: 3,
      });
      setFood({
        x: getRandomInt(0, 25) * 16,
        y: getRandomInt(0, 25) * 16,
      });
      setGameStarted(false);
    };

    const endGame = () => {
      deathSound.play();
      alert(`Game over! Your score is ${score}.`);
      refreshGame();
    };

    const gameLoop = setInterval(() => {
      if (!gameStarted) {
        clearInterval(gameLoop);
      } else {
        drawSnake();
        drawFood();
        updateSnake();
        checkCollision();
        checkFoodCollision();
      }
    }, 1000 / gameSpeed);

    return () => clearInterval(gameLoop);
  }, [snake, food, gameStarted, gameSpeed, step, score, config.sizeCell, config.sizeFood, config.maxStep]);

  const drawScore = () => {
    scoreRef.current.innerHTML = score;
  };

  const startGame = () => {
    setGameStarted(true);
    startSound.play();
  };

  const handleKeyDown = (event) => {
    switch (event.code) {
      case "Escape":
        refreshGame();
        break;
      case "Space":
        if (!gameStarted) {
          setGameStarted(true);
          startSound.play();
        }
        break;
      case "KeyA":
        setSnake((prev) => ({
          ...prev,
          dx: prev.dx !== config.sizeCell ? -config.sizeCell : prev.dx,
          dy: 0,
        }));
        break;
      case "KeyW":
        setSnake((prev) => ({
          ...prev,
          dx: 0,
          dy: prev.dy !== config.sizeCell ? -config.sizeCell : prev.dy,
        }));
        break;
      case "KeyD":
        setSnake((prev) => ({
          ...prev,
          dx: prev.dx !== -config.sizeCell ? config.sizeCell : prev.dx,
          dy: 0,
        }));
        break;
      case "KeyS":
        setSnake((prev) => ({
          ...prev,
          dx: 0,
          dy: prev.dy !== -config.sizeCell ? config.sizeCell : prev.dy,
        }));
        break;
      default:
        break;
    }
  };

  return (
    <div id="game">
      <div className="game-header">
        <div className="game-score">
          Score: {score} <span className="score-count" ></span>
        </div>
      </div>
      <div className="canvas-wrapper">
        <canvas
          id="game-canvas"
          ref={canvasRef}
          width={400}
          height={400}
          onKeyDown={handleKeyDown}
          tabIndex="0"
        />
      </div>
      <div>
        <button onClick={startGame}>Start Game</button>
        <button onClick={refreshGame}>Refresh Game</button>
      </div>
    </div>
  );
};

export default Game;
