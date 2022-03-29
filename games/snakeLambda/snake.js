// pairs of x and y delta for directions
const north = pair(0)(-1);
const east = pair(1)(0);
const south = pair(0)(1);
const west = pair(-1)(0);

let direction = north;

const clockwise = [north, east, south, west, north];
const countercw = [north, west, south, east, north];

// pair for snake init position
let snake = [
    pair(10)(5),
    pair(10)(6),
    pair(10)(7),
    pair(10)(8),
];

// pair of food position
let food = pair(15)(15);

// snakeEquals(a, b) { return a.x === b.x && a.y === b.y }
const pairEq = a => b =>  fst(a) === fst(b) && snd(a) === snd(b);

// snakeMove(a, b) { return a.x + b.x && a.y + b.y }
const pairPlus = a => b =>  pair (fst(a) + fst(b)) (snd(a) + snd(b));

// snakeTransition(f, p) for bound cases
const pairMap = f => p =>  pair ( f (fst(p)) ) ( f (snd(p)) );


function changeDirection(orientation) {
    const idx = orientation.indexOf(direction);
    direction = orientation[idx + 1];
}

// catch not existing canvas or return found element
function safeGetElementById(id) {
    const result = document.getElementById(id);
    return result === undefined || result === null
        ? Left("cannot find element with id " + id)
        : Right(result)
}

// print errors 
const log = s => console.log(s);

// start game or print error
function start() {
    either(safeGetElementById("canvas"))
        (log)
        (startWithCanvas);
}

// init event and interval
const startWithCanvas = canvas => {

    const context = canvas.getContext("2d");

    const rightArrow = 39;
    const leftArrow = 37;
    window.onkeydown = evt => {
        const orientation = (evt.keyCode === rightArrow) ? clockwise : countercw;
        changeDirection(orientation);
    };

    setInterval(() => {
        nextBoard();
        display(context);
    }, 1000 / 5);
};

const inBounds = max => x => {
    if (x < 0)   { return max - 1 }
    if (x >= max) { return 0 }
    return x
};

function nextBoard() {
    const max = 20;
    const oldHead = snake[0];

    // create next head 
    const newHead = pairPlus(oldHead)(direction);
    const head = pairMap(inBounds(max))(newHead);

    // do next step and create new food if necessary
    const pickRandom = () => Math.floor(Math.random() * max);
    if (pairEq(food)(head)) {
        food = pair(pickRandom())(pickRandom());
    } else {
        snake.pop();
    }

    // move snake 
    snake.unshift(head);
}

function display(context) {
    // clear
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // draw all elements
    context.fillStyle = "cyan";
    snake.forEach(element =>
        fillBox(context, element)
    );

    // draw head
    context.fillStyle = "green";
    fillBox(context, snake[0]);

    // draw food
    context.fillStyle = "red";
    fillBox(context, food);
}

function fillBox(context, element) {
    context.fillRect(fst(element) * 20 + 1, snd(element) * 20 + 1, 18, 18);
}


