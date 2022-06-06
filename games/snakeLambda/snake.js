/**
 * @module snake offers variables and functions to create a snake game.
 */

// imports
import { fst, snd, pair, Left, Right, either } from "./lambda";

// pairs of x and y delta for directions
export const north = pair(0)(-1);
export const east = pair(1)(0);
export const south = pair(0)(1);
export const west = pair(-1)(0);

export let direction = north;

export const clockwise = [north, east, south, west, north];
export const counterCw = [north, west, south, east, north];

// pair for snake init position
export let snake = [
    pair(10)(5),
    pair(10)(6),
    pair(10)(7),
    pair(10)(8),
];

// pair of food position
export let food = pair(15)(15);

// snakeEquals(a, b) { return a.x === b.x && a.y === b.y }
export const pairEq = a => b => fst(a) === fst(b) && snd(a) === snd(b);

// snakeMove(a, b) { return a.x + b.x && a.y + b.y }
export const pairPlus = a => b => pair(fst(a) + fst(b))(snd(a) + snd(b));

// snakeTransition(f, p) for bound cases
export const pairMap = f => p => pair(f(fst(p)))(f(snd(p)));

window.onload(() => {
    start();
});

/**
 * Set a new orientation of the snake
 * 
 * @param {pair} orientation The new orientation of the player
 */
export function changeDirection(orientation) {
    const idx = orientation.indexOf(direction);
    direction = orientation[idx + 1];
}

/**
 * Get a element by its id
 * 
 * @param {number} id The id of the element
 * @returns The element if exists
 */
export function safeGetElementById(id) {
    const result = document.getElementById(id);
    return result === undefined || result === null
        ? Left("cannot find element with id " + id)
        : Right(result)
}

/**
 * Log a message to the console
 * 
 * @param {string} s The message to log
 */
export const log = s => console.log(s);

/**
 * Start the game if possible
 */
export function start() {
    either(safeGetElementById("canvas"))
        (log)
        (startWithCanvas);
}

/**
 * Start the game and init the values
 * 
 * @param canvas The game canvas
 */
export const startWithCanvas = canvas => {
    const context = canvas.getContext("2d");

    // Handle the game keys
    const rightArrow = 39;
    const leftArrow = 37;
    window.onkeydown = evt => {
        const orientation = (evt.keyCode === rightArrow) ? clockwise : counterCw;
        changeDirection(orientation);
    };

    // Set the snake speed
    setInterval(() => {
        nextBoard();
        display(context);
    }, 1000 / 5);
};

/**
 * Check if the element is on the board or move it on the board
 * 
 * @param {number} max The max game size
 * @param {number} x The current position
 * @returns {number}  position of the snake
 */
export const inBounds = max => x => {
    if (x < 0) { return max - 1 }
    if (x >= max) { return 0 }
    return x
};

/**
 * Prepare the next board after one step
 */
export function nextBoard() {
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

/**
 * Display the game elements
 * 
 * @param context The game context
 */
export function display(context) {
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

/**
 * Draw a game element
 * 
 * @param context The game context
 * @param element The game element to fill
 */
export function fillBox(context, element) {
    context.fillRect(fst(element) * 20 + 1, snd(element) * 20 + 1, 18, 18);
}
