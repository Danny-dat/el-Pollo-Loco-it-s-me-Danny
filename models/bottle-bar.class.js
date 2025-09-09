/**
 * Represents the bottle status bar in the game. It extends DrawableObject to inherit
 * properties and methods for rendering.
 */
class BottleBar extends DrawableObject {
    /**
     * An array of image paths for the bottle status bar, representing different fill levels.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    /**
     * The current percentage of the bottle bar.
     * @type {number}
     */
    percentage = 0;


    /**
     * The constructor initializes a new bottle bar object. It loads the images,
     * sets the position and dimensions, and initializes the percentage to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 80;
        this.width = 60;
        this.height = 200;
        this.setPercentage(0);
    }


    /**
    * Sets the percentage value and updates the image of the status bar accordingly.
    * * @param {number} percentage - The new percentage value to set for the bottle bar.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Resolves the correct image index from the IMAGES array based on the current percentage.
     * This allows the status bar to display the correct visual representation of the bottle level.
     * * @returns {number} The index of the image corresponding to the current percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}