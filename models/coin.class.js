/**
 * Represents a coin object in the game. It extends MovableObject to inherit
 * properties and methods for movement and rendering.
 */
class Coin extends MovableObject {
    /**
     * An array of image paths for the coin's animation.
     * @type {string[]}
     */
    IMAGES_COIN = ['img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];
    
    /**
     * The collision offset for the coin object. This defines the bounding box
     * for collision detection, making it more accurate.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 80,
        left: 100,
        right: 100,
        bottom: 80
    }


    /**
     * The constructor initializes a new coin object. It sets a random horizontal position,
     * a random vertical position, and defines its dimensions. It also starts the animation.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = Math.random() * -1400 + Math.random() * 1800;
        this.loadImages(this.IMAGES_COIN);
        this.y = 100 + Math.random() * 200; // Spawns the coin at a random height between 100 and 300
        this.height = 100;
        this.width = 100;
        this.animate();
    }


    /**
    * Animates the coin by repeatedly playing its animation sequence.
    * This creates the spinning effect of the coin.
    */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 500);
    }
}