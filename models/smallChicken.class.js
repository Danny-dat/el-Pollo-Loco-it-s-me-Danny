/**
 * Represents a small chicken enemy in the game. This class extends MovableObject
 * to inherit properties and methods for movement, animation, and collision.
 */
class SmallChicken extends MovableObject {
    /**
     * The width of the small chicken.
     * @type {number}
     */
    width = 50;
    /**
     * The height of the small chicken.
     * @type {number}
     */
    height = 50;
    /**
     * The collision offset for the small chicken object. This defines the bounding box
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
     * An array of image paths for the small chicken's walking animation.
     * @type {string[]}
     */
    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    /**
     * An array of image paths for the small chicken's dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]


    /**
     * The constructor initializes a new small chicken enemy. It loads the necessary images,
     * sets its position and a random speed, and starts its animation and movement.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);
        this.y = 390
        this.x = 300 + Math.random() * 1700;
        this.animate();
        super.moveLeft();
        this.speed = 1 + Math.random() * 5;
    }


    /**
     * Controls the small chicken's animation and movement logic. If the chicken is dead,
     * it plays the dead animation. Otherwise, it moves to the left and plays the
     * walking animation.
     */
    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);

            } else {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 100);
    }
}