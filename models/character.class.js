/**
 * Represents the main character of the game. This class handles all character-related logic,
 * including movement, animations, and interactions with the game world. It extends the
 * MovableObject class to inherit basic movement and physics properties.
 */
class Character extends MovableObject {
    /**
     * The width of the character.
     * @type {number}
     */
    width = 350;
    /**
     * The height of the character.
     * @type {number}
     */
    height = 150;
    /**
     * The initial vertical position of the character.
     * @type {number}
     */
    y = 100;
    /**
     * The movement speed of the character.
     * @type {number}
     */
    speed = 5;
    /**
     * The collision offset for the character object. This defines the bounding box
     * for collision detection, making it more accurate.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 50,
        left: 30,
        right: 25,
        bottom: 20
    }
    /**
     * An array of image paths for the character's walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    /**
     * An array of image paths for the character's jumping animation.
     * @type {string[]}
     */
    IMAGES_JUMPUNG = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'

    ];
    /**
     * An array of image paths for the character's death animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    /**
     * An array of image paths for the character's hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    /**
     * An array of image paths for the character's standing animation.
     * @type {string[]}
     */
    IMAGES_STAND = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ]
    /**
     * An array of image paths for the character's long standing (idle) animation.
     * @type {string[]}
     */
    IMAGES_LONGSTAND = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]
    /**
     * Reference to the world object.
     * @type {World}
     */
    world;
    /**
     * Audio object for the walking sound.
     * @type {Audio}
     */
    walking_sound = new Audio('audio/walking_sound.mp3');
    /**
     * Audio object for the jumping sound.
     * @type {Audio}
     */
    jump_sound = new Audio('audio/jump_sound.mp3');
    /**
     * Audio object for the pain/death sound.
     * @type {Audio}
     */
    pains_sound = new Audio('audio/game-over-sound.mp3');
    /**
     * Audio object for the sleeping sound.
     * @type {Audio}
     */
    sleep_sound = new Audio('audio/sleep.mp3');
    /**
     * Flag to ensure the death sound only plays once.
     * @type {boolean}
     */
    hasPlayedDeathSound = false;
    /**
     * Timestamp of the last character movement.
     * @type {number}
     */
    lastMovementTime = Date.now();


    /**
     * The constructor initializes a new character object. It loads all necessary images,
     * applies gravity, and starts the animation loops.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPUNG);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STAND);
        this.loadImages(this.IMAGES_LONGSTAND);
        this.applygravity();
        this.animate();
    }


    /**
     * Initiates the main animation and logic loops for the character.
     * One loop handles movement and camera updates at 60 FPS.
     * The other loop handles character animation playback.
     */
    animate() {
        setInterval(() => {
            this.soundcharacter();
            this.moveCharacter();
            this.notThrowToTheLeft();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => this.playCharacter(), 150);
    }


    /**
     * Pauses the walking sound of the character. This is called in the main
     * animation loop to reset the sound state in each frame.
     */
    soundcharacter() {
        this.walking_sound.pause();
    }


    /**
     * Determines which animation to play based on the character's current state (dead, hurt, jumping, etc.).
     * This function acts as a state machine for character animations.
     */
    playCharacter() {
        if (this.isDead()) {
            this.playDeadAnimation();
            return;
        }
        if (this.isHurt()) {
            this.playHurtAnimation();
            return;
        }
        if (this.isAboveGround()) {
            this.playJumpAnimation();
            return;
        }
        if (this.isMovingRightOrLeft()) {
            return;
        }
        this.characterStand();
    }


    /**
     * Plays the death animation and the corresponding sound effect.
     * Ensures the death sound is only played once.
     */
    playDeadAnimation() {
        if (!this.hasPlayedDeathSound) {
            this.playAnimation(this.IMAGES_DEAD);
            if (this.world.sound && !this.hasPlayedPainsSound) {
                this.pains_sound.play();
                this.hasPlayedPainsSound = true;
                this.world.sound = false;
            }
        }
    }


    /**
     * Plays the hurt animation for the character.
     */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
    }


    /**
     * Plays the jumping animation for the character.
     */
    playJumpAnimation() {
        this.playAnimation(this.IMAGES_JUMPUNG);
    }


    /**
     * Checks if the character is moving left or right. If so, it updates the last
     * movement time, plays the walking animation, and pauses the sleep sound.
     * @returns {boolean} - True if the character is moving, otherwise false.
     */
    isMovingRightOrLeft() {
        if (this.world.keybord.RIGHT || this.world.keybord.LEFT) {
            this.lastMovementTime = Date.now();
            this.playAnimation(this.IMAGES_WALKING);
            this.sleep_sound.pause();
            return true;
        }
        return false;
    }


    /**
     * Handles the character's standing and idle animations. If the character is idle for
     * more than 5 seconds, it switches to the long idle animation and plays a sleep sound.
     */
    characterStand() {
        this.playAnimation(this.IMAGES_STAND);
        if (Date.now() - this.lastMovementTime >= 5000) {
            this.playAnimation(this.IMAGES_LONGSTAND);
            this.sleepSound();
        }
    }


    /**
     * Checks if the right or left arrow key is pressed.
     * Updates the last movement time, plays the walking animation, and pauses the sleep sound if moving.
     * @returns {boolean} True if a movement key is pressed, otherwise false.
     */
    pressedRightOrLeft() {
        if (this.world.keybord.RIGHT || this.world.keybord.LEFT) {
            this.lastMovementTime = Date.now();
            this.playAnimation(this.IMAGES_WALKING);
            this.sleep_sound.pause();
            return true;
        }
        return false;
    }


    /**
     * Manages the sleep sound. Plays or pauses the sound based on the global sound setting in the world.
     */
    sleepSound() {
        if (this.world.sound === false) {
            this.sleep_sound.pause();
        } else {
            this.sleep_sound.play();
        }
    }


    /**
     * Handles character movement based on keyboard input. Checks for right, left, and jump inputs.
     */
    moveCharacter() {
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canJump())
            this.isJump();
    }


    /**
     * Executes a jump, playing the jump sound if sound is enabled.
     */
    isJump() {
        if (this.world.sound === true) {
            this.jump_sound.play();
        }
        this.jump();
    }


    /**
     * Moves the character to the right and plays the walking sound.
     */
    moveRight() {
        if (this.world.sound === true) {
            this.walking_sound.play();
        }
        super.moveRight();
        this.otherDiretion = false;
    }


    /**
     * Moves the character to the left and plays the walking sound.
     */
    moveLeft() {
        if (this.world.sound === true) {
            this.walking_sound.play();
        }
        super.moveLeft();
        this.otherDiretion = true;
    }


    /**
     * Checks if the character is able to jump.
     * @returns {boolean} - True if the space key is pressed and the character is on the ground.
     */
    canJump() {
        return this.world.keybord.SPACE && !this.isAboveGround();
    }


    /**
     * Checks if the character is able to move right.
     * @returns {boolean} - True if the right arrow key is pressed and the character is within the level bounds.
     */
    canMoveRight() {
        return this.world.keybord.RIGHT && this.x < world.level.level_end_x;
    }


    /**
     * Checks if the character is able to move left.
     * @returns {boolean} - True if the left arrow key is pressed and the character is within the level bounds.
     */
    canMoveLeft() {
        return this.world.keybord.LEFT && this.x > -1330;
    }


    /**
     * Initiates a jump by setting the character's vertical speed.
     */
    jump() {
        this.speedY = 30;
    }


    /**
     * Prevents the character from throwing objects while facing left.
     */
    notThrowToTheLeft() {
        if (this.otherDiretion === true) {
            keybord.D = false;
        }
    }
}