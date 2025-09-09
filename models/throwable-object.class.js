/**
 * Represents an object that can be thrown by the character, such as a bottle.
 * It extends MovableObject to inherit properties for movement, gravity, and collision.
 */
class ThrowableObject extends MovableObject {
    /**
     * A flag to indicate if the object is broken (e.g., after hitting a target or the ground).
     * @type {boolean}
     */
    isBroken = false;
    /**
     * An array of image paths for the bottle's rotation animation.
     * @type {string[]}
     */
    IMAGES_BOTTEL = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]
    /**
     * An array of image paths for the bottle's splash animation when it breaks.
     * @type {string[]}
     */
    IMAGES_BOTTEL_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]
    /**
     * The interval ID for the throwing motion.
     * @type {number}
     */
    throwInterval;


    /**
     * The constructor initializes a new throwable object. It loads the necessary images,
     * sets its initial position and dimensions, and initiates the throwing action and animation.
     * @param {number} x - The initial horizontal position of the object.
     * @param {number} y - The initial vertical position of the object.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTEL);
        this.loadImages(this.IMAGES_BOTTEL_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 60;
        this.throw();
        this.animate();

    }


    /**
     * Initiates the throwing mechanics for the object. It sets an initial vertical speed,
     * applies gravity, and moves the object horizontally. It also checks if the bottle
     * is broken to stop its movement.
     */
    throw() {
        this.speedY = 20;
        this.applygravity();
        this.trowInterval = setInterval(() => {
            this.bottleFallsOnTheFloor();
            if (this.isBroken) {
                this.stopBottle();
            } else {
                this.x += 10;
            }
        }, 25);
    }


    /**
     * Stops the bottle's movement and gravity simulation by clearing the intervals.
     * This is called when the bottle breaks.
     */
    stopBottle() {
        clearInterval(this.applygravityInterval);
        clearInterval(this.trowInterval);
    }


    /**
     * Checks if the bottle has hit the floor, and if so, sets its state to broken.
     */
    bottleFallsOnTheFloor() {
        if (this.y >= 350) {
            this.isBroken = true;
        }
    }


    /**
     * Animates the throwable object. It plays the splash animation if the bottle is broken,
     * otherwise, it plays the rotation animation.
     */
    animate() {
        setInterval(() => {
            if (this.isBroken && this.isAboveGround()) {
                this.playAnimation(this.IMAGES_BOTTEL_SPLASH)
            } else {
                this.playAnimation(this.IMAGES_BOTTEL);
            }
        }, 50);
    }


    /**
     * A test function to check the character's direction.
     * Note: This function appears to be for testing purposes and may not be used in the final game logic.
     */
    test123() {
        if (world.character.moveLeft()) {
            world.otherDiretion = true;
        } else {
            world.otherDiretion = false;
        }
    }
}