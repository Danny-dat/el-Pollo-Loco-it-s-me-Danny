/**
 * A class that appears to handle game state events like game over and advancing levels.
 * It also contains logic for player collections (coins, bottles) and throwing objects.
 * This class seems to be a base or secondary part of the main World logic.
 */
class WorldTwo {
    /**
     * A flag to ensure the game over screen is only displayed once per session.
     * @type {boolean}
     */
    gameOverDisplayed = false;


    /**
     * The constructor starts the main gameplay loop.
     */
    constructor() {
        this.play();
    }


    /**
     * Starts a loop to periodically check for the game over condition.
     */
    play() {
        setInterval(() => {
            this.gameOver();

        }, 1000);
    }


    /**
     * Checks if the character's energy is at or below zero and triggers the game over sequence if it hasn't been displayed yet.
     */
    isCharacterDead() {
        if (!this.gameOverDisplayed && world.character.energy <= 0) {
            this.gameOverDisplayed = true;
            this.gameOver();
            world.character.sleep_sound.pause();
        }
    }


    /**
     * Displays or hides the "Game Over" screen based on the character's energy level.
     */
    gameOver() {
        let gameOverElement = document.getElementById('gameOver');
        if (world.character.energy <= 0) {
            gameOverElement.style.display = 'block';
        } else {
            gameOverElement.style.display = 'none';
            this.gameOverDisplayed = false;
        }
    }


    /**
     * Displays the "Next Level" screen.
     */
    nextLevel() {
        let nextLevel = document.getElementById('nextLevel');
        nextLevel.style.display = 'flex';
    }


    /**
     * Plays the coin collection sound effect if sound is enabled.
     */
    playCoinSound() {
        if (this.sound === true) {
            this.coin_sound.play();
        }
    }


    /**
     * Manages the logic for collecting coins. It checks for collisions between the character
     * and coins and updates the coin bar accordingly.
     */
    coinStatus() {
        if (this.coinValue <= 100) {
            this.level.coin.forEach((coin) => {
                if (this.isCharacterCollidingCoin(coin)) {
                    this.characterIsCollidingCoin(coin)
                    if (this.coinValue === 100) {
                        this.coinValue = 100;
                    }
                    this.coinBar.setPercentage(this.coinValue);
                }
            });
        }
    }


    /**
     * Manages the logic for collecting bottles. It checks for collisions and updates the bottle bar.
     */
    bottleValueStatus() {
        if (this.bottleValue < 100) {
            this.level.bottle.forEach((bottle, index, ) => {
                if (this.checkCharachrterForCollidingBottle(bottle)) {
                    this.characterIsCollidingBottle();
                    if (this.bottleValue > 100) {
                        this.bottleValue = 100;
                    }
                    this.bottleBar.setPercentage(this.bottleValue);
                    this.level.bottle.splice(index, 1);
                    this.bossBar.setPercentage(this.bossLife);
                }
            });
        }
    }


    /**
     * Creates a new throwable bottle object, updates the player's bottle count,
     * and adds the new bottle to the world.
     * @returns {ThrowableObject} The newly created bottle object.
     */
    bottleStatus() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObject.push(bottle);
        this.bottleValue -= 20;
        this.bottleBar.setPercentage(this.bottleValue);
        this.isThrowingBottle = true;
        return bottle;
    }


    /**
     * Removes a throwable object from the game after a set delay.
     * @param {number} index - The index of the throwable object to remove.
     */
    removeThrowableObject(index) {
        setTimeout(() => {
            this.throwableObject.splice(index, 1);
            this.isThrowingBottle = false;
            if (this.sound === true) {
                this.breakBotte_sound.play();
            }
        }, 1250);
    }


    /**
     * Checks if the player can throw an object and, if so, initiates the throw.
     * It also handles the immediate collision check against the boss.
     */
    checkThrowObject() {
        if (this.iCanThrow()) {
            let bottle = this.bottleStatus();
            if (this.checkForCollidingBottleOfBoss(bottle)) {
                this.bossLifeToUpdate(this.bossBar);
            }
            this.removeThrowableObject();
        }
    }
}