/**
 * Represents the coin status bar in the game. It extends DrawableObject to inherit
 * properties and methods for rendering. This class manages the visual representation
 * of the player's collected coins.
 */
class CoinBar extends DrawableObject {
    /**
     * An array of image paths for the coin status bar, representing different fill levels.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',

    ];

    /**
     * The current percentage of the coin bar.
     * @type {number}
     */
    percentage = 0;
    /**
     * The index of the current coin image to be displayed.
     * @type {number}
     */
    coinImageIndex = 0;


    /**
     * The constructor initializes a new coin bar object. It loads the necessary images,
     * sets its position and dimensions on the screen, and initializes the percentage to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 40;
        this.width = 60;
        this.height = 200;
        this.setPercentage(0);
    }


    /**
    * Sets the percentage of the coin bar and updates the displayed image accordingly.
    * @param {number} percentage - The new percentage value to set.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Determines the correct image index from the IMAGES array based on the current percentage.
     * This allows the status bar to visually reflect the amount of coins collected.
     * @returns {number} The index of the image corresponding to the current percentage.
     */
    resolveImageIndex() {
        if (this.percentage <= 0) {
            return 0;
        } else if (this.percentage <= 20) {
            return 1;
        } else if (this.percentage <= 40) {
            return 2;
        } else if (this.percentage <= 60) {
            return 3;
        } else if (this.percentage <= 80) {
            return 4;
        } else {
            return 5;
        }
    }
}