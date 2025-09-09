/**
 * The main class for the game world. It manages all game objects, game logic,
 * rendering, and collision detection. It acts as the central controller for the game.
 */
class World extends WorldTwo {
    /**
     * The player character object.
     * @type {Character}
     */
    character = new Character();
    /**
     * The current level object, containing all level data.
     * @type {Level}
     */
    level = level1;
    /**
     * The HTML canvas element for rendering.
     * @type {HTMLCanvasElement}
     */
    canvas;
    /**
     * The 2D rendering context of the canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;
    /**
     * The keyboard input handler object.
     * @type {Kayboard}
     */
    keybord;
    /**
     * The horizontal position of the camera.
     * @type {number}
     */
    camera_x = 0;
    /**
     * The player's health status bar.
     * @type {StatusBar}
     */
    stadusBar = new StatusBar();
    /**
     * An array of active throwable objects (bottles).
     * @type {ThrowableObject[]}
     */
    throwableObject = [];
    /**
     * Audio object for the coin collection sound.
     * @type {Audio}
     */
    coin_sound = new Audio('audio/coin_sound.mp3');
    /**
     * The player's coin status bar.
     * @type {CoinBar}
     */
    coinBar = new CoinBar();
    /**
     * An array of bottle objects in the level.
     * @type {Bottle[]}
     */
    bottle = [];
    /**
     * The player's bottle status bar.
     * @type {BottleBar}
     */
    bottleBar = new BottleBar();
    /**
     * The player's current coin score.
     * @type {number}
     */
    coinValue = 0;
    /**
     * The player's current bottle count.
     * @type {number}
     */
    bottleValue = 0;
    /**
     * Audio object for the bottle collection sound.
     * @type {Audio}
     */
    bottle_sound = new Audio('audio/bottle_sound.mp3');
    /**
     * The end boss's health status bar.
     * @type {BossBar}
     */
    bossBar = new BossBar();
    /**
     * The current health of the end boss.
     * @type {number}
     */
    bossLife = 100;
    /**
     * Audio object for the bottle breaking sound.
     * @type {Audio}
     */
    breakBotte_sound = new Audio('audio/breakBottle.mp3');
    /**
     * Audio object for the main background music.
     * @type {Audio}
     */
    mexico_sound = new Audio('audio/mexico_sound.mp3');
    /**
     * Audio object for the chicken squeak sound.
     * @type {Audio}
     */
    squeak_sound = new Audio('audio/squeak.mp3');
    /**
     * Audio object for the final boss music.
     * @type {Audio}
     */
    finalBoss_sound = new Audio('audio/finalBoss_sound.mp3');
    /**
     * A global flag to control if sound is enabled.
     * @type {boolean}
     */
    sound = true;


    /**
     * The constructor initializes the game world.
     * @param {HTMLCanvasElement} canvas - The canvas element to draw the game on.
     * @param {Kayboard} keybord - The keyboard input handler.
     */
    constructor(canvas, keybord) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keybord = keybord;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * Sets a reference to this world object in the character object.
     * This allows the character to interact with the world.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Starts the main game loops for handling game logic and physics.
     * One interval checks for collisions and other core logic, while another
     * handles physics-based updates like jumping.
     */
    run() {
        const self = this;
        setInterval(() => {
            self.checkCollisions();
            self.checkThrowObject();
            self.isCharacterDead();
            if (self.bossLife <= 0) {
                setTimeout(() => {
                    self.nextLevel();
                }, 1000);
            }
        }, 200);
        setInterval(() => {
            this.jumpofChicken();
        }, 1000 / 25);
    }


    /**
     * Checks if the player is able to throw a bottle.
     * @returns {boolean} - True if the 'D' key is pressed, the player has bottles, and is not already throwing.
     */
    iCanThrow() {
        return this.keybord.D && this.bottleValue > 0 && !this.isThrowingBottle;
    }


    /**
     * Checks if a thrown bottle is colliding with the end boss.
     * @param {ThrowableObject} bottle - The bottle to check.
     * @returns {boolean} - True if there is a collision.
     */
    checkForCollidingBottleOfBoss(bottle) {
        return this.level.enemies.some(endboss => endboss instanceof Endboss && bottle.isColliding(endboss));
    }


    /**
     * Reduces the boss's life and updates its health bar.
     * @returns {number} The updated life of the boss.
     */
    bossLifeToUpdate() {
        this.bossLife -= 20;
        this.bossBar.setPercentage(this.bossLife);
        return this.bossLife;
    }


    /**
     * Applies damage to the character and updates the health bar.
     */
    characterReceivesHit() {
        this.character.hit();
        this.updatesCharacterLife();
    }


    /**
     * Manages the logic for the character jumping on chickens.
     */
    jumpofChicken() {
        let characterHasJumped = false;
        const chickenGroups = [this.level.enemies, this.level.smallChicken];
        chickenGroups.forEach((chickenGroup) => {
            this.checkChickenGroupForJump(chickenGroup, characterHasJumped);
        });
    }


    /**
     * Helper function to check for jump collisions within a specific group of chickens.
     * @param {MovableObject[]} chickenGroup - The array of chickens to check.
     * @param {boolean} characterHasJumped - A flag to prevent multiple jumps in one frame.
     */
    checkChickenGroupForJump(chickenGroup, characterHasJumped) {
        chickenGroup.forEach((chicken) => {
            if (!characterHasJumped && this.checkCharachrterForCollidingChicken(chicken)) {
                if (this.character.isAboveGround(chicken)) {
                    this.jumpOnChicken(chicken, chickenGroup);
                    characterHasJumped = true;
                } else {
                    this.characterReceivesHit();
                }
            }
        });
    }


    /**
     * Executes the logic for when a character successfully jumps on a chicken.
     * @param {MovableObject} chicken - The chicken that was jumped on.
     * @param {MovableObject[]} chickenGroup - The array the chicken belongs to.
     */
    jumpOnChicken(chicken, chickenGroup) {
        this.jumpOnTheChicken(chicken);
        if (this.sound === true) {
            this.squeak_sound.play();
        }
        setTimeout(() => {
            const pos = chickenGroup.indexOf(chicken);
            chickenGroup.splice(pos, 1);
        }, 500);
    }


    /**
     * The main collision detection function, called periodically by the game loop.
     */
    checkCollisions() {
        if (this.isTheEndbossCollidingCharacter(this.character)) {
            this.characterReceivesHit();
            this.character.energy -= 20;
            this.characterCheckForEnergy();
        };
        this.thrownBottles();
        this.coinStatus();
        this.bottleValueStatus();
    }


    /**
     * Checks the character's energy level and handles the death state if energy is zero or less.
     */
    characterCheckForEnergy() {
        if (this.character.energy <= 0) {
            this.isCharacterDead();
            if (this.sound === true) {
                this.character.pains_sound.play();
            }
        }
        setTimeout(() => {
            this.sound = false;
        }, 1000);
    }


    /**
     * Manages collision detection for all active thrown bottles.
     */
    thrownBottles() {
        this.throwableObject.forEach((bottle) => {
            const hitEndboss = this.handleHitEndboss(bottle);
            if (hitEndboss) return;
            const hitChicken = this.handleHitChicken(bottle);
            if (hitChicken) return;
            this.handleHitEnemies(bottle);
        });
    }


    /**
     * Handles the specific logic for a bottle hitting the end boss.
     * @param {ThrowableObject} bottle - The bottle to check.
     * @returns {boolean} - True if a hit occurred.
     */
    handleHitEndboss(bottle) {
        const hitEndboss = this.level.endboss.find(boss => !bottle.isBroken && boss instanceof Endboss && boss.isColliding(bottle));
        if (hitEndboss) {
            this.bossLife -= 20;
            if (this.bossLife <= 0) {
                this.bossLife = 0;
            }
            bottle.isBroken = true;
            this.bossBar.setPercentage(this.bossLife);
            if (this.sound === true) {
                this.breakBotte_sound.play();
            }
            setTimeout(() => {
                this.removeBottle();
            }, 300);
        }
        return hitEndboss;
    }


    /**
     * Handles the specific logic for a bottle hitting a small chicken.
     * @param {ThrowableObject} bottle - The bottle to check.
     * @returns {boolean|MovableObject} - The chicken that was hit, or false.
     */
    handleHitChicken(bottle) {
        const hitChicken = this.level.smallChicken.find(chicken => bottle.isColliding(chicken));
        if (hitChicken) {
            hitChicken.energy = 0;
            bottle.isBroken = true;
            this.removeBottle();
            if (this.sound === true) {
                this.breakBotte_sound.play();
            }
            setTimeout(() => {
                this.level.smallChicken.splice(this.level.smallChicken.indexOf(hitChicken), 1);
            }, 800);
        }
        return hitChicken;
    }


    /**
     * Handles the specific logic for a bottle hitting regular enemies.
     * @param {ThrowableObject} bottle - The bottle to check.
     */
    handleHitEnemies(bottle) {
        let chickenHit = false;
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (this.isChickenCollidingBottle(bottle, chickenHit, enemy)) {
                enemy.energy = 0;
                setTimeout(() => {
                    this.level.enemies.splice(enemyIndex, 1);
                }, 500);
                bottle.isBroken = true;
                this.removeBottle();
                chickenHit = true;
                if (this.sound === true) {
                    this.breakBotte_sound.play();
                }
            }
        });
    }


    /**
     * Updates the character's health bar with the current energy level.
     */
    updatesCharacterLife() {
        this.stadusBar.setPercentage(this.character.energy);
    }


    /**
     * Checks if the end boss is colliding with the character.
     * @param {Character} character - The player character.
     * @returns {boolean} - True if they are colliding.
     */
    isTheEndbossCollidingCharacter(character) {
        return this.level.endboss.some(boss => boss.isColliding(character))
    }


    /**
     * Checks if a chicken is colliding with a bottle.
     * @param {ThrowableObject} bottle - The thrown bottle.
     * @param {boolean} chickenHit - A flag to prevent multiple hits with one bottle.
     * @param {MovableObject} enemy - The enemy to check against.
     * @returns {boolean} - True if a collision occurs.
     */
    isChickenCollidingBottle(bottle, chickenHit, enemy) {
        return !chickenHit && enemy instanceof Chicken && enemy.isColliding(bottle);
    }


    /**
     * Checks if the character is colliding with a coin.
     * @param {Coin} coin - The coin to check.
     * @returns {boolean} - True if they are colliding.
     */
    isCharacterCollidingCoin(coin) {
        return this.character.isColliding(coin)
    }


    /**
     * Handles the logic for when the character collects a coin.
     * @param {Coin} coin - The collected coin.
     */
    characterIsCollidingCoin(coin) {
        this.playCoinSound();
        this.level.removeCoin(coin);
        this.coinValue += 20;
    }


    /**
     * Executes the logic when the character jumps on an enemy.
     * @param {MovableObject} enemy - The enemy that was jumped on.
     */
    jumpOnTheChicken(enemy) {
        if (this.sound === true) {
            this.character.jump_sound.play();
        }
        this.character.jump();
        enemy.energy = 0;
    }


    /**
     * Checks for a collision between the character and an enemy.
     * @param {MovableObject} enemy - The enemy to check.
     * @returns {boolean} - True if they are colliding.
     */
    checkCharachrterForCollidingChicken(enemy) {
        return this.character.isColliding(enemy);
    }


    /**
     * Checks for a collision between the character and a collectible bottle.
     * @param {Bottle} bottle - The bottle to check.
     * @returns {boolean} - True if they are colliding.
     */
    checkCharachrterForCollidingBottle(bottle) {
        return this.character.isColliding(bottle);
    }


    /**
     * Handles the logic for when the character collects a bottle.
     */
    characterIsCollidingBottle() {
        if (this.sound === true) {
            this.bottle_sound.play();
            this.bottleValue += 20;
        } else {
            this.bottle_sound.pause();
            this.bottleValue += 20;
        }
    }


    /**
     * Removes a bottle from the array of thrown objects.
     * @param {number} index - The index of the bottle to remove.
     */
    removeBottle(index) {
        this.throwableObject.splice(index, 1);
    }


    /**
     * The main drawing function of the game. It is called on every frame to render
     * all game objects to the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.stadusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.bossBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);

        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.smallChicken);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * A helper function to draw an array of game objects to the canvas.
     * @param {DrawableObject[]} objects - An array of objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * A helper function to draw a single game object to the canvas,
     * handling image flipping if necessary.
     * @param {MovableObject} mo - The object to draw.
     */
    addToMap(mo) {
        if (mo.otherDiretion) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDiretion) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Flips the image of a movable object horizontally.
     * @param {MovableObject} mo - The object whose image to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.height, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Restores the image of a movable object to its original orientation after flipping.
     * @param {MovableObject} mo - The object whose image to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}