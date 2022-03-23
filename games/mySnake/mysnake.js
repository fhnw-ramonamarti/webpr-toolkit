let direction = 0;
let isPaused = false;
const snake = [
    { x: 2, y: 2, color: 'red' },
    { x: 3, y: 2, color: 'white' },
    { x: 4, y: 2, color: 'white' },
    { x: 5, y: 2, color: 'white' }
];
const food = { x: 10, y: 10, color: 'green' };

window.onload = function () {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const leftArrow = 37; // 0
    const upArrow = 38; // 1
    const rightArrow = 39; // 2
    const downArrow = 40; // 3
    const space = 32;
    window.onkeydown = evt => {
        if (evt.keyCode === leftArrow) {
            direction = 0;
        } else if (evt.keyCode === upArrow) {
            direction = 1;
        } else if (evt.keyCode === rightArrow) {
            direction = 2;
        } else if (evt.keyCode === downArrow) {
            direction = 3;
        } else if (evt.keyCode === space) {
            isPaused = !isPaused;
        }
    };

    canvas.height = 400;
    canvas.width = 400;

    setInterval(() => {
        if (!isPaused) {
            nextBoard(context);
            display(context);
        }
    }, 1000 / 5);
}

function nextBoard(context) {
    // clear
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // draw all elements
    snake.forEach(element =>
        fillBox(context, element)
    );

    // draw food
    fillBox(context, food);
}

function display(context) {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        food.x = Math.floor(Math.random() * 20);
        food.y = Math.floor(Math.random() * 20);
    } else {
        snake.pop();
    }
    snake[0].color = 'white';
    if (direction === 0) { //l
        const head = snake[0].x - 1;
        snake.unshift({ x: head >= 0 ? head : canvas.width / 20, y: snake[0].y, color: 'red' });
    } else if (direction === 1) { //u
        const head = snake[0].y - 1;
        snake.unshift({ x: snake[0].x, y: head >= 0 ? head : canvas.height / 20, color: 'red' });
    } else if (direction === 2) { //r
        const head = snake[0].x + 1;
        snake.unshift({ x: head < 20 ? head : 0, y: snake[0].y, color: 'red' });
    } else if (direction === 3) { //d
        const head = snake[0].y + 1;
        snake.unshift({ x: snake[0].x, y: head < 20 ? head : 0, color: 'red' });
    }
    const head = snake[0];
    const snakeBody = [...snake];
    snakeBody.shift(head);
    if (contains(snakeBody, head)) {
        reset();
    }
}

function fillBox(context, element) {
    context.fillStyle = element.color;
    context.fillRect(element.x * 20 + 1, element.y * 20 + 1, 18, 18);
}

function reset() {
    direction = 0;
    isPaused = false;
    snake.length = 0;
    snake.push({ x: 2, y: 2, color: 'red' });
    snake.push({ x: 3, y: 2, color: 'white' });
    snake.push({ x: 4, y: 2, color: 'white' });
    snake.push({ x: 5, y: 2, color: 'white' });
    food = { x: 10, y: 10, color: 'green' };
}

function contains(snakeBody, head){
    let same = false;
    for (let i = 0; i < snakeBody.length; i++) {
        same = snakeBody[i].x === head.x &&  snakeBody[i].y === head.y;
        if (same){
            break;
        }
    }
    return same;
}