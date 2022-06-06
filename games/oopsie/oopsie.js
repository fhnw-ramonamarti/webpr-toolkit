// player class with fallback and progress
function Player(n, fallback = 0, progress = 0) {
    let fallbackIndex = fallback;
    let progressIndex = progress;
    let name = n;

    return {
        // getter values for logging
        getValues: function () {
            return n + ": " + fallbackIndex + " " + progressIndex;
        },
        // getter name
        getName: function () {
            return name;
        },
        // getter fallback
        getFallbackIndex: function () {
            return fallbackIndex;
        },
        // getter progress
        getProgressIndex: function () {
            return progressIndex;
        },
        // setter progress proceed
        proceed: function (inc) {
            progressIndex += inc;
        },
        // setter progress fallback
        fallback: function (inc) {
            progressIndex = fallbackIndex;
        },
        // setter fallback
        turn: function () {
            fallbackIndex = progressIndex;
        }
    };
}

player = Player("One");

/**
 * Start the game and display elements
 */
function start() {
    const fields = document.getElementById('fields');

    // Build game field
    for (let i = 0; i < 100; i++) {
        let field = document.createElement("DIV");
        field.setAttribute("ID", "FIELD-" + i);
        field.innerText = " ";
        fields.appendChild(field);
    }

    display();
}

/**
 * Get random dice number and adjust values
 */
function dice() {
    let stride = Math.round(1 + Math.random() * 5);
    document.getElementById('dice').innerText = "" + stride;
    
    // Adjust player properties
    if (stride === 3) {
        player.fallback();
    } else {
        player.proceed(stride);
    }

    display();
}

/**
 * Change game round
 */
function turn() {
    player.turn();
    display();
}

/**
 * Display elements
 */
function display() {
    // all game fields
    for (let i = 0; i < 100; i++) {
        let field = document.getElementById("FIELD-" + i);
        field.setAttribute("CLASS", "field");
    }

    // Current fallback field
    let fallbackField = document.getElementById("FIELD-" + player.getFallbackIndex());
    console.log(fallbackField);
    fallbackField.setAttribute("CLASS", "field fallback");

    // Current player field (progress)
    let progressField = document.getElementById("FIELD-" + player.getProgressIndex());
    progressField.setAttribute("CLASS", "field progress");
}
