/**
 * Represents a base class for all drawable objects in the game. It provides
 * fundamental functionalities for loading and drawing images on the canvas.
 */
class DrawableObject {
    /**
     * The image object to be drawn on the canvas.
     * @type {HTMLImageElement}
     */
    img;
    /**
     * A cache to store preloaded images, mapping image paths to image objects.
     * This helps to avoid reloading images and improves performance.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};
    /**
     * The index of the current image being displayed in an animation sequence.
     * @type {number}
     */
    currentImage = 0;
    /**
     * The horizontal position of the object on the canvas.
     * @type {number}
     */
    x = -1000;
    /**
     * The vertical position of the object on the canvas.
     * @type {number}
     */
    y = 250;


    /**
     * Loads a single image from the specified path and assigns it to the img property.
     * @param {string} path - The file path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Draws the object's image onto the provided canvas rendering context.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width);
    }


    /**
     * Loads an array of images and stores them in the imageCache for later use.
     * This is useful for preloading animation frames.
     * @param {string[]} arr - An array of image paths to be loaded.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}