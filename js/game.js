/**
 * The main canvas element for the game.
 * @type {HTMLCanvasElement}
 */
let canvas;
/**
 * The main world object that contains all game logic.
 * @type {World}
 */
let world;
/**
 * An instance of the Kayboard class to handle keyboard inputs.
 * @type {Kayboard}
 */
let keybord = new Kayboard();
/**
 * The player character object.
 * @type {Character}
 */
let character;
/**
 * The end boss object.
 * @type {Endboss}
 */
let endboss;
/**
 * A flag to track the current volume state (on/off).
 * @type {boolean}
 */
let isVolumeOn;


/**
 * Initializes the game by getting the canvas element from the DOM.
 */
function init() {
    canvas = document.getElementById('canvas');
}


/**
 * Starts the game. Hides the start screen, initializes the level,
 * sets up mobile controls, and creates a new World instance.
 */
function start() {
    let startPolloLoco = document.getElementById('startPolloLoco');
    startPolloLoco.style.display = 'none';
    closInfo();
    initLevel();
    mobilRun();
    lautSound();
    world = new World(canvas, keybord);
}


/**
 * Restarts the game after a "Game Over". Hides the game over screen,
 * clears all active intervals, and calls the start function again.
 */
function reStart() {
    let restartPolloLoco = document.getElementById('gameOver');
    restartPolloLoco.style.display = 'none';
    WorldTwo = null;
    clearAllIntervals();
    start();
}


/**
 * Sets the initial volume icon to "sound on".
 */
function lautSound() {
    let volume = document.getElementById('volume');
    volume.src = 'img/lautsprecher.png';
    isVolumeOn = false;
}


/**
 * A utility function to clear all active setIntervals. This is used to
 * stop all game loops when restarting the game.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


/**
 * Starts a new game from the "Next Level" or "You Won" screen.
 */
function startAnew() {
    let nextLevel = document.getElementById('nextLevel');
    nextLevel.style.display = 'none';
    reStart();
}


/**
 * Closes the information note overlay.
 */
function closInfo() {
    let infoNote = document.getElementById('infoNote');
    infoNote.style.display = 'none';
}


/**
 * Toggles the visibility of the information note overlay.
 */
function infoNote() {
    let infoNote = document.getElementById('infoNote');
    if (infoNote.style.display === 'flex') {
        infoNote.style.display = 'none';
    } else {
        infoNote.style.display = 'flex';
    }
}


/**
 * Sets up touch event listeners for the on-screen mobile controls.
 */
function mobilRun() {
    document.getElementById("left").addEventListener("touchstart", () => {
        keybord.LEFT = true;
    });

    document.getElementById("left").addEventListener("touchend", () => {
        keybord.LEFT = false;
    });

    document.getElementById("right").addEventListener("touchstart", () => {
        keybord.RIGHT = true;
    });

    document.getElementById("right").addEventListener("touchend", () => {
        keybord.RIGHT = false;
    });

    document.getElementById("jump").addEventListener("touchstart", () => {
        keybord.SPACE = true;
    });

    document.getElementById("jump").addEventListener("touchend", () => {
        keybord.SPACE = false;
    });

    document.getElementById("throw").addEventListener("touchstart", () => {
        keybord.D = true;
    });

    document.getElementById("throw").addEventListener("touchend", () => {
        keybord.D = false;
    });

    document.addEventListener("DOMContentLoaded", start);
}


/**
 * Event listener for keydown events to update the keyboard state.
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keybord.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keybord.LEFT = true;
    }
    if (e.keyCode == 38) {
        keybord.UP = true;
    }
    if (e.keyCode == 40) {
        keybord.DOWN = true;
    }
    if (e.keyCode == 32) {
        keybord.SPACE = true;
    }
    if (e.keyCode == 68) {
        keybord.D = true;
    }
});


/**
 * Event listener for keyup events to update the keyboard state.
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keybord.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keybord.LEFT = false;
    }
    if (e.keyCode == 38) {
        keybord.UP = false;
    }
    if (e.keyCode == 40) {
        keybord.DOWN = false;
    }
    if (e.keyCode == 32) {
        keybord.SPACE = false;
    }
    if (e.keyCode == 68) {
        keybord.D = false;
    }
});


/**
 * Toggles the game's sound on and off. Updates the volume icon and the global sound flag.
 */
function volume() {
    let volume = document.getElementById('volume');
    if (isVolumeOn) {
        volume.src = 'img/lautsprecher.png';
        world.sound = true;
    } else {
        volume.src = 'img/stumm.png';
        world.sound = false;
    }
    isVolumeOn = !isVolumeOn;
}


/**
 * Checks the device orientation. If in portrait mode, it shows a message to rotate the device.
 * It also handles the visibility of mobile controls based on screen width.
 */
function checkOrientation() {
    let startButton = document.getElementById('startButton');
    if (window.innerHeight > window.innerWidth) {
        handy.style.display = 'block';
        mobileKeysNone.style.display = 'none';
        startButton.style.display = 'none';
    } else {
        let handy = document.getElementById('handy');
        let mobileKeysNone = document.getElementById('mobileKeysNone');
        handy.style.display = 'none';
        startButton.style.display = 'block';
        if (window.innerWidth >= 945) {
            mobileKeysNone.style.display = 'none';
        } else {
            mobileKeysNone.style.display = 'block';
        }
    }
}


// Event listener for the resize event to respond to changes in screen size.
window.addEventListener("resize", checkOrientation);

// Event listener for the DOMContentLoaded event to check screen orientation when the page is loaded.
document.addEventListener("DOMContentLoaded", function () {
    checkOrientation();
});