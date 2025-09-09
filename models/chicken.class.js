/**
 * Represents a chicken enemy in the game. It extends MovableObject to inherit
 * properties and methods for movement, animation, and collision.
 */
class Chicken extends MovableObject {
    /**
     * The vertical position of the chicken.
     * @type {number}
     */
    y = 360;
    /**
     * The width of the chicken.
     * @type {number}
     */
    width = 80;
    /**
     * The height of the chicken.
     * @type {number}
     */
    height = 80;
    /**
     * The collision offset for the chicken object. This defines the bounding box
     * for collision detection, making it more accurate.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 20,
        right: 20,
        bottom: 0
    }
    /**
     * An array of image paths for the chicken's walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = ['img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    /**
     * An array of image paths for the chicken's dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]


    /**
     * The constructor initializes a new chicken enemy. It loads the necessary images,
     * sets a random horizontal starting position, a random speed, and starts the animation.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 300 + Math.random() * 1200;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 1 + Math.random() * 5;
        this.animate();
    }


    /**
     * Controls the chicken's animation and movement logic. It checks if the chicken is dead
     * to play the dead animation, otherwise, it moves the chicken to the left and plays the
     * walking animation.
     */
    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 100);
    }
}