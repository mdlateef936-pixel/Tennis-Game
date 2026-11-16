
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ballX = 400;
let ballY = 225;
let ballSpeedX = 4;
let ballSpeedY = 3;

let paddleHeight = 100;
let paddleWidth = 12;

let computerY = 175;
let playerY = 175;

let computerScore = 0;
let playerScore = 0;

let upPressed = false;
let downPressed = false;

// Keyboard controls
document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowUp") upPressed = true;
    if (e.key === "ArrowDown") downPressed = true;
});

document.addEventListener("keyup", function(e) {
    if (e.key === "ArrowUp") upPressed = false;
    if (e.key === "ArrowDown") downPressed = false;
});

// Draw game objects
function draw() {
    ctx.clearRect(0, 0, 800, 450);

    // Court middle line
    ctx.strokeStyle = "white";
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 450);
    ctx.stroke();
    ctx.setLineDash([]);

    // Computer paddle
    ctx.fillStyle = "red";
    ctx.fillRect(20, computerY, paddleWidth, paddleHeight);

    // Player paddle
    ctx.fillStyle = "blue";
    ctx.fillRect(768, playerY, paddleWidth, paddleHeight);

    // Tennis ball
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
    ctx.fill();
}

// Move ball and paddles
function update() {

    // Player movement
    if (upPressed) playerY -= 6;
    if (downPressed) playerY += 6;

    playerY = Math.max(0, Math.min(350, playerY));

    // Computer movement
    computerY += (ballY - (computerY + 50)) * 0.05;
    computerY = Math.max(0, Math.min(350, computerY));

    // Ball movement
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Top and bottom boundary
    if (ballY <= 10 || ballY >= 440) {
        ballSpeedY = -ballSpeedY;
        document.getElementById("message").innerText =
            "Ball hit the boundary!";
    }

    // Computer paddle collision
    if (ballX <= 32 &&
        ballX >= 20 &&
        ballY >= computerY &&
        ballY <= computerY + paddleHeight) {
        ballSpeedX = Math.abs(ballSpeedX);
    }

    // Player paddle collision
    if (ballX >= 758 &&
        ballX <= 780 &&
        ballY >= playerY &&
        ballY <= playerY + paddleHeight) {
        ballSpeedX = -Math.abs(ballSpeedX);
    }

    // Ball crosses left boundary
    if (ballX < 0) {
        playerScore++;
        resetBall("Player scored!");
    }

    // Ball crosses right boundary
    if (ballX > 800) {
        computerScore++;
        resetBall("Computer scored!");
    }

    // Update scoreboard
    document.getElementById("computerScore").innerText =
        computerScore;

    document.getElementById("playerScore").innerText =
        playerScore;
}

// Reset ball
function resetBall(msg) {
    ballX = 400;
    ballY = 225;

    ballSpeedX = -ballSpeedX;

    document.getElementById("message").innerText = msg;
}

// Restart game
function restartGame() {
    computerScore = 0;
    playerScore = 0;

    ballX = 400;
    ballY = 225;

    ballSpeedX = 4;
    ballSpeedY = 3;

    document.getElementById("computerScore").innerText = 0;
    document.getElementById("playerScore").innerText = 0;
    document.getElementById("message").innerText = "Game Started!";
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();

const upBtn = document.getElementById("upBtn");
const downBtn = document.getElementById("downBtn");

upBtn.addEventListener("pointerdown", () => {
    upPressed = true;
});

upBtn.addEventListener("pointerup", () => {
    upPressed = false;
});

upBtn.addEventListener("pointerleave", () => {
    upPressed = false;
});

downBtn.addEventListener("pointerdown", () => {
    downPressed = true;
});

downBtn.addEventListener("pointerup", () => {
    downPressed = false;
});

downBtn.addEventListener("pointerleave", () => {
    downPressed = false;
});

          
