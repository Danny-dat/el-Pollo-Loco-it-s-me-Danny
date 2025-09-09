/**
 * Represents a background object in the game. It extends MovableObject to inherit
 * properties and methods for movement and rendering.
 */
class BackgroundObject extends MovableObject {
    /**
     * The width of the background object.
     * @type {number}
     */
    width = 720;
    /**
     * The height of the background object.
     * @type {number}
     */
    height = 480;


    /**
     * The constructor initializes a new background object. It sets the image,
     * the horizontal position (x), and the vertical position (y).
     * @param {string} imagePath - The path to the image for the background object.
     * @param {number} x - The initial horizontal position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // 480 - 480 = 0
    }
}