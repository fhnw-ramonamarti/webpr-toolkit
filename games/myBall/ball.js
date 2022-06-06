// Global ball graph vars
const radius = 10;
const ball = { x: 20, y: 0, dx: 5, dy: 1 };
let old = { x: ball.x, y: ball.y };
let isPaused = false;

/**
 * Start the bouncing ball
 */
function start() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.fillStyle = "lightblue";

    // Handle pause event
    const space = 32;
    window.onkeydown = evt => {
        if (evt.keyCode === space) {
            isPaused = !isPaused;
        }
    };

    // Set ball speed
    setInterval(() => {
        nextBoard();
        display(context);
    }, 1000 / 20);
}

/**
 * Calculate the next board
 */
function nextBoard() {
    if (!isPaused) {
        // Keep old ball values for the sake of efficient clearing
        old = { x: ball.x, y: ball.y };

        // Handle ball hitting bounds and loose of energy
        if (Math.abs(ball.dy) < 1 && ball.y + radius < canvas.height) {
            if (ball.dy > 0) {
                ball.dy = -1.1;
            } else {
                ball.dy = 1.1;
            }
        } else if (Math.abs(ball.dy) < 1) {
            ball.dx *= 0.95;
        }

        // Handle direction turn
        if (ball.x + radius >= canvas.width || ball.x - radius <= 0) {
            ball.dx *= -0.95;
        }
        if (ball.y + radius >= canvas.height) {
            ball.dy *= -0.85;
        }

        // Calculate new position
        ball.x += ball.dx;
        ball.y += ball.dy;
        
        // Calculate any changes in velocity due to gravitational pull or medium resistance
        if (ball.dy < 0) {
            ball.dy *= 0.95;
        } else if (ball.dy > 0) {
            ball.dy *= 1.05;
        }
    }
}

/**
 * Display the game elements
 * 
 * @param context The game context
 */
function display(context) {
    context.clearRect(old.x - radius - 1, old.y - radius - 1, 22, 22);
    fillBox(context)
}

/**
 * Fill the ball with a color
 * 
 * @param context The game context
 */
function fillBox(context) {
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, 6.3, false);
    context.fill();
}
