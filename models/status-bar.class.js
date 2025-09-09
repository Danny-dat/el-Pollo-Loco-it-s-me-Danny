/**
 * Represents the player's health status bar. It extends DrawableObject to inherit
 * properties and methods for rendering. This class visually displays the player's
 * current health percentage.
 */
class StatusBar extends DrawableObject {
    /**
     * An array of image paths for the health status bar, representing different fill levels.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',

    ];

    /**
     * The current percentage of the health bar.
     * @type {number}
     */
    percentage = 100;


    /**
     * The constructor initializes a new status bar object. It loads the necessary images,
     * sets its position and dimensions on the screen, and initializes the percentage to 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 0;
        this.width = 60;
        this.height = 200;
        this.setPercentage(100);
    }


    /**
     * Sets the percentage of the status bar and updates the displayed image accordingly.
     * @param {number} percentage - The new percentage value to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Determines the correct image index from the IMAGES array based on the current percentage.
     * This allows the status bar to visually reflect the player's health.
     * @returns {number} The index of the image corresponding to the current percentage.
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