
const minX =  0;
const maxX =  6;
const minY = -1;
const maxY =  1;

function start() {
    const userFunction = document.getElementById('user_function');
    const canvas       = document.getElementById('canvas');

    // eval function of input field
    const makeF = () => Function("x", "return " + userFunction.value + ";");

    // update graph
    userFunction.onchange = _ =>  display(canvas, makeF());

    // init display
    display(canvas, makeF());
}

function display(canvas, f) {
    // clear
    const context     = canvas.getContext("2d");
    context.fillStyle = "skyblue";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // draw the function plot
    const normx = normalizeX(canvas.width);
    const normy = normalizeY(canvas.height);

    // print path
    context.beginPath();
    context.moveTo(normx(minX), normy(f(minX)));

    // reference points for stroke
    const stride = (maxX - minX) / 1000; // 100 Stützstellen
    for (let x = minX; x <= maxX; x += stride) {
        context.lineTo(normx(x), normy(f(x)));
        context.stroke();
    }
}

// scale functions
const normalizeY = height => y => {
    const scaleFactor = height / (maxY - minY);
    return height - (y - minY) * scaleFactor;
};

const normalizeX = width => x => {
    const scaleFactor = width / (maxX - minX);
    return ( x - minX) * scaleFactor;
};
