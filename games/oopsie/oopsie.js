// Todo:

// create a proper Player construction with
// state:
//   fallbackIndex = 0 // place to fall back on oopsie
//   progressIndex = 0 // place having been proceeding to
// and functions:
//   proceed(stride) // proceed so many places
//   fallback()      // "oopsie": go back to last start (fallback position)
//   turn()          // cash in your win, update fallback position for next turn
// 

function Player(n, fallback = 0, progress = 0) {
    let fallbackIndex = fallback;
    let progressIndex = progress;
    let name = n;

    return {
        getValues: function () {
            return n + ": " +fallbackIndex + " " + progressIndex;
        },
        getName: function () {
            return name;
        },
        getFallbackIndex: function () {
            return fallbackIndex;
        },
        getProgressIndex: function () {
            return progressIndex;
        },
        proceed: function (inc) {
            progressIndex += inc;
        },
        fallback: function (inc) {
            progressIndex = fallbackIndex;
        },
        turn: function () {
            fallbackIndex = progressIndex;
        }
    };
}

player = Player("One");

function start() {
    const fields = document.getElementById('fields');

    for (let i = 0; i < 100; i++) {
        let field = document.createElement("DIV");
        field.setAttribute("ID", "FIELD-" + i);
        field.innerText = " ";
        fields.appendChild(field);
    }
    display();
}

function dice() {
    let stride = Math.round(1 + Math.random() * 5);
    document.getElementById('dice').innerText = "" + stride;
    if (stride === 3) {
        player.fallback();
    } else {
        player.proceed(stride);
    }
    display();
}

function turn() {
    player.turn();
    display();
}

function display() {
    for (let i = 0; i < 100; i++) {
        let field = document.getElementById("FIELD-" + i);
        field.setAttribute("CLASS", "field");
    }
    let fallbackfield = document.getElementById("FIELD-" + player.getFallbackIndex());
    console.log(fallbackfield);
    fallbackfield.setAttribute("CLASS", "field fallback");
    let progressfield = document.getElementById("FIELD-" + player.getProgressIndex());
    progressfield.setAttribute("CLASS", "field progress");
}

