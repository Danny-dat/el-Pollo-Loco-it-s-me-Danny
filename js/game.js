let canvas;
let world;
let keybord = new Keyboard();
let soundEnabled = true; // NEU: Globale Variable für den Ton-Status

/**
 * Initialisiert das Spiel und die Event-Listener.
 */
function init() {
    canvas = document.getElementById('canvas');
    checkOrientation(); // Wichtig, um die Buttons korrekt anzuzeigen
    updateSoundIcons(); // Zeigt das korrekte Ton-Icon beim Start an
}

/**
 * Startet das Spiel.
 */
function start() {
    let startPolloLoco = document.getElementById('startPolloLoco');
    startPolloLoco.style.display = 'none';
    closInfo();
    initLevel();
    mobilRun();
    world = new World(canvas, keybord);
    world.sound = soundEnabled; // Übergibt den aktuellen Ton-Status an die Spielwelt
}

/**
 * Schaltet den Ton AN/AUS.
 */
function toggleSound() {
    soundEnabled = !soundEnabled; // Kehrt den Wert um (true -> false, false -> true)

    if (world) {
        world.sound = soundEnabled; // Aktualisiert den Ton im laufenden Spiel
    }
    updateSoundIcons();
}

/**
 * Aktualisiert die sichtbaren Ton-Icons (Lautsprecher vs. Stumm).
 */
function updateSoundIcons() {
    if (soundEnabled) {
        document.getElementById('soundOn').classList.remove('d-none');
        document.getElementById('soundOff').classList.add('d-none');
    } else {
        document.getElementById('soundOn').classList.add('d-none');
        document.getElementById('soundOff').classList.remove('d-none');
    }
}


// --- DEINE BESTEHENDEN FUNKTIONEN (leicht angepasst oder unverändert) ---

function reStart() {
    window.location.reload();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function startAnew() {
    let nextLevel = document.getElementById('nextLevel');
    nextLevel.style.display = 'none';
    reStart();
}

function closInfo() {
    let infoNote = document.getElementById('infoNote');
    infoNote.style.display = 'none';
}

function infoNote() {
    let infoNote = document.getElementById('infoNote');
    if (infoNote.style.display === 'flex') {
        infoNote.style.display = 'none';
    } else {
        infoNote.style.display = 'flex';
    }
}

function mobilRun() {
    document.getElementById("left").addEventListener("touchstart", () => { keybord.LEFT = true; });
    document.getElementById("left").addEventListener("touchend", () => { keybord.LEFT = false; });
    document.getElementById("right").addEventListener("touchstart", () => { keybord.RIGHT = true; });
    document.getElementById("right").addEventListener("touchend", () => { keybord.RIGHT = false; });
    document.getElementById("jump").addEventListener("touchstart", () => { keybord.SPACE = true; });
    document.getElementById("jump").addEventListener("touchend", () => { keybord.SPACE = false; });
    document.getElementById("throw").addEventListener("touchstart", () => { keybord.D = true; });
    document.getElementById("throw").addEventListener("touchend", () => { keybord.D = false; });
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) { keybord.RIGHT = true; }
    if (e.keyCode == 37) { keybord.LEFT = true; }
    if (e.keyCode == 38) { keybord.UP = true; }
    if (e.keyCode == 40) { keybord.DOWN = true; }
    if (e.keyCode == 32) { keybord.SPACE = true; }
    if (e.keyCode == 68) { keybord.D = true; }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) { keybord.RIGHT = false; }
    if (e.keyCode == 37) { keybord.LEFT = false; }
    if (e.keyCode == 38) { keybord.UP = false; }
    if (e.keyCode == 40) { keybord.DOWN = false; }
    if (e.keyCode == 32) { keybord.SPACE = false; }
    if (e.keyCode == 68) { keybord.D = false; }
});

function checkOrientation() {
    let startButton = document.getElementById('startButton');
    let handy = document.getElementById('handy');
    let mobileKeysNone = document.getElementById('mobileKeysNone');

    if (window.innerHeight > window.innerWidth) {
        handy.style.display = 'block';
        mobileKeysNone.style.display = 'none';
        startButton.style.display = 'none';
    } else {
        handy.style.display = 'none';
        startButton.style.display = 'block';
        if (window.innerWidth >= 945) {
            mobileKeysNone.style.display = 'none';
        } else {
            mobileKeysNone.style.display = 'block';
        }
    }
}

window.addEventListener("resize", checkOrientation);
document.addEventListener("DOMContentLoaded", init); // Ruft jetzt init statt checkOrientation auf