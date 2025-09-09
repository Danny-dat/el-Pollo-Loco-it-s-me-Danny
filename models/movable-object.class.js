/**
 * Represents a movable object in the game, extending the basic DrawableObject.
 * This class adds properties and methods related to movement, physics (like gravity),
 * and interactions (like collisions and taking damage).
 */
class MovableObject extends DrawableObject {
    /**
     * The horizontal movement speed of the object.
     * @type {number}
     */
    speed = 0.15;
    /**
     * A flag indicating if the object is facing the opposite direction (left).
     * @type {boolean}
     */
    otherDiretion = false;
    /**
     * The vertical speed of the object.
     * @type {number}
     */
    speedY = 0;
    /**
     * The acceleration due to gravity.
     * @type {number}
     */
    acceleration = 2.5;
    /**
     * The energy or health of the object.
     * @type {number}
     */
    energy = 100;
    /**
     * Timestamp of the last time the object was hit.
     * @type {number}
     */
    lastHit = 0;
    /**
     * The interval ID for the gravity simulation.
     * @type {number}
     */
    applygravityInterval;
    /**
     * The collision offset for the object. This defines the bounding box
     * for collision detection, making it more accurate.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
    /**
     * A flag to control sound.
     * @type {boolean}
     */
    sound = true;


    /**
     * Applies a constant downward force to simulate gravity, causing the object to fall.
     * The simulation runs at a fixed interval.
     */
    applygravity() {
        this.applygravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * Checks if the object is currently above the ground level.
     * Throwable objects are always considered to be "above ground" to allow them to fall.
     * @returns {boolean} - True if the object is above ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 100;
        }
    }


    /**
     * Detects collision with another movable object using their bounding boxes,
     * adjusted by their offsets.
     * @param {MovableObject} mo - The other movable object to check for collision.
     * @returns {boolean} - True if the objects are colliding, otherwise false.
     */
    isColliding(mo) {
        return this.x + this.height - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.width - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.height - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.width - mo.offset.bottom;
    }


    /**
     * Reduces the object's energy when it gets hit and records the time of the hit.
     * Energy will not drop below zero.
     */
    hit() {
        this.energy -= 1;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Checks if the object is in a "hurt" state, which lasts for a short period
     * after being hit.
     * @returns {boolean} - True if the object was hit less than 1 second ago.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * Checks if the object is "dead" (i.e., its energy has reached zero).
     * @returns {boolean} - True if the object's energy is 0.
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Plays an animation by cycling through an array of images.
     * @param {string[]} images - An array of image paths for the animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }
}