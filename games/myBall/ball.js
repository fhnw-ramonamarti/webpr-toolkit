
const radius = 10;
const ball = { x: 20, y: 0, dx: 5, dy: 1 };
let old = { x: ball.x, y: ball.y };
let isPaused = false;

function start() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.fillStyle = "lightblue";

    const space = 32;
    window.onkeydown = evt => {
        if (evt.keyCode === space) {
            isPaused = !isPaused;
        }
    };

    setInterval(() => {
        nextBoard();
        display(context);
    }, 1000 / 20);
}

function nextBoard() {
    if (!isPaused) {
        // keep old ball values for the sake of efficient clearing of the old display
        old = { x: ball.x, y: ball.y };

        // handle ball is hitting the bounds
        //   reverse direction
        //   lose some energy relative to the current inertia (only velocity varies)
        if (Math.abs(ball.dy) < 1 && ball.y + radius < canvas.height) {
            if (ball.dy > 0) {
                ball.dy = -1.1;
            } else {
                ball.dy = 1.1;
            }
        } else if (Math.abs(ball.dy) < 1) {
            ball.dx *= 0.95;
        }
        if (ball.x + radius >= canvas.width || ball.x - radius <= 0) {
            ball.dx *= -0.95;
        }
        if (ball.y + radius >= canvas.height) {
            ball.dy *= -0.85;
        }

        // calculate new position
        ball.x += ball.dx;
        ball.y += ball.dy;
        // calculate any changes in velocity due to gravitational pull or medium resistance
        if (ball.dy < 0) {
            ball.dy *= 0.95;
        } else if (ball.dy > 0) {
            ball.dy *= 1.05;
        }
    }
}

function display(context) {
    context.clearRect(old.x - radius - 1, old.y - radius - 1, 22, 22);
    fillBox(context)
}

function fillBox(context) {
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, 6.3, false);
    context.fill();
}


