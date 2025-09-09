/**
 * Represents a bottle object in the game. It extends MovableObject to inherit
 * properties and methods for movement and rendering.
 */
class Bottle extends MovableObject {
    /**
     * The width of the bottle object.
     * @type {number}
     */
    width = 80;
    /**
     * The height of the bottle object.
     * @type {number}
     */
    height = 80;
    /**
     * The initial y position of the bottle.
     * @type {number}
     */
    y = 100;
    /**
     * The collision offset for the bottle object. This defines the bounding box
     * for collision detection, making it more accurate.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 50,
        right: 50,
        bottom: 0
    }


    /**
     * The constructor initializes a new bottle object. It loads the image,
     * sets a random horizontal position (x), and a fixed vertical position (y).
     * @param {string} imagePath - The path to the image for the bottle object.
     */
    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = Math.random() * (719 * 2 + 1400) - 1250;
        this.y = 356;
    }


}