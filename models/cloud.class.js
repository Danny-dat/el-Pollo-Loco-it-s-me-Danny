/**
 * Represents a cloud object in the game's background. It extends MovableObject
 * to inherit properties and methods for movement and rendering, creating a parallax
 * scrolling effect.
 */
class Cloud extends MovableObject {
    /**
     * The vertical position of the cloud.
     * @type {number}
     */
    y = 20;
    /**
     * The width of the cloud object.
     * @type {number}
     */
    width = 350;
    /**
     * The height of the cloud object.
     * @type {number}
     */
    height = 600;


    /**
     * The constructor initializes a new cloud object. It loads the cloud image,
     * sets a random horizontal position, assigns a random speed for a parallax effect,
     * and starts the animation.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 5000;
        this.speed = Math.random() * 0.5;
        this.animate();
    }


    /**
     * Animates the cloud by continuously moving it to the left. When the cloud
     * moves off-screen, its position is reset to the right, creating an infinite
     * scrolling loop.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x <= -2000) {
                this.x += 4000;
            }
        }, 1000 / 60);
    }
}