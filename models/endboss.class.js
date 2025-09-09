/**
 * Represents the final boss enemy in the game. It extends the MovableObject class
 * to inherit properties for movement, animation, and collision. This class
 * controls the behavior, animations, and interactions of the end boss.
 */
class Endboss extends MovableObject {
    /**
     * The height of the end boss.
     * @type {number}
     */
    height = 400;
    /**
     * The width of the end boss.
     * @type {number}
     */
    width = 400;
    /**
     * The vertical position of the end boss.
     * @type {number}
     */
    y = 50;
    /**
     * An array of image paths for the end boss's alert animation.
     * @type {string[]}
     */
    IMAGES_ALERT = ['img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    /**
     * An array of image paths for the end boss's death animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    /**
     * An array of image paths for the end boss's hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    /**
     * An array of image paths for the end boss's attack animation.
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    /**
     * The collision offset for the end boss object.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 20,
        left: 80,
        right: 80,
        bottom: 0
    }
    /**
     * A flag to check if the character has made first contact with the boss.
     * @type {boolean}
     */
    hadFirstContact = false;
    /**
     * Audio object for the chicken boss sound.
     * @type {Audio}
     */
    chickenBoss_sound = new Audio('audio/chickenBoss.mp3');


    /**
     * The constructor initializes a new end boss object. It loads all necessary images,
     * sets the initial position and speed, and starts the animation loop.
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 2100;
        this.speed = 40;
        this.animate();
    }


    /**
     * Initiates the animation and logic loop for the end boss.
     * This loop periodically checks game sounds and updates the boss's animation.
     */
    animate() {
        setInterval(() => {
            this.checkMexicoSound();
            this.checkFinalBossSound();
            this.bossAnimation();
        }, 250);
    }


    /**
     * Checks if the boss has been hit by a throwable object (a bottle).
     * @returns {boolean} - True if the boss is colliding with a bottle, otherwise false.
     */
    bossGetsHit() {
        let isHurt = false;
        world.throwableObject.forEach(bottle => {
            if (this.isColliding(bottle)) {
                isHurt = true;
            }
        });
        return isHurt;
    }


    /**
     * Checks if the character's energy is at or below zero.
     * @returns {boolean} - True if the character is out of energy, otherwise false.
     */
    energIsAtZero() {
        return world.character.energy <= 0;
    }


    /**
     * Manages the background music. Plays or pauses the "Mexico" sound based on the global sound setting.
     */
    checkMexicoSound() {
        if (world.sound === false) {
            world.mexico_sound.pause();
        } else {
            world.mexico_sound.play();
        }
    }


    /**
     * Manages the final boss music based on the game state.
     */
    checkFinalBossSound() {
        this.bossIsDead();
        this.characterSeesBoss();
    }


    /**
     * Controls the boss's animation state based on its health and whether it has been hit.
     * It switches between attack, hurt, and dead animations.
     */
    bossAnimation() {
        if (world.bossLife >= 80) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.bossGetsHit()) {
            this.playAnimation(this.IMAGES_HURT);
            this.chickenBossSound();
        } else if (world.bossLife <= 0) {
            this.playAnimation(this.IMAGES_DEAD);
            world.finalBoss_sound.pause();
        } else {
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }


    /**
     * Plays the sound effect for the chicken boss, if sound is enabled in the game.
     */
    chickenBossSound() {
        if (world.sound === true) {
            this.chickenBoss_sound.play();
        }
    }


    /**
     * Checks if the boss is dead and stops the game's music if so.
     */
    bossIsDead() {
        if (this.energIsAtZero()) {
            world.finalBoss_sound.pause();
            world.mexico_sound.pause();
        }
    }


    /**
     * Triggers the boss fight sequence when the character reaches a certain point.
     * It manages the transition of music and initiates the boss's attack behavior.
     */
    characterSeesBoss() {
        if (world.character.x >= 1160 || this.hadFirstContact) {
            this.hadFirstContact = true;
            world.mexico_sound.pause();
            if (world.sound === true) {
                world.finalBoss_sound.play();
                world.mexico_sound.sound = false;
            }
            if (world.sound === false) {
                world.finalBoss_sound.pause();
            }
            world.finalBoss_sound.volume = 0.8;
            this.bossRanUntiltheEnd();
        }
    }


    /**
     * Controls the boss's movement logic. The boss moves towards the character
     * as long as it is alive.
     */
    bossRanUntiltheEnd() {
        if (world.bossLife > 0) {
            if (world.character.x > this.x) {
                this.moveRight();
            } else {
                this.moveLeft();
            }
        } else {
            world.sound = false;
        }
    }
}