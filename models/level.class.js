/**
 * Represents a game level, containing all the objects that make up the level's environment
 * and challenges. This class holds arrays of enemies, clouds, background objects, coins,
 * bottles, and the end boss.
 */
class Level {
    /**
     * An array of enemy objects in the level.
     * @type {MovableObject[]}
     */
    enemies;
    /**
     * An array of cloud objects for the background.
     * @type {Cloud[]}
     */
    clouds;
    /**
     * An array of background objects that create the scenery.
     * @type {BackgroundObject[]}
     */
    backgroundObjects;
    /**
     * An array of coin objects that can be collected by the player.
     * @type {Coin[]}
     */
    coin;
    /**
     * An array of bottle objects that can be collected or used.
     * @type {Bottle[]}
     */
    bottle;
    /**
     * An array containing the end boss object(s).
     * @type {Endboss[]}
     */
    endboss;
    /**
     * The x-coordinate that marks the end of the level.
     * @type {number}
     */
    level_end_x = 1530;


    /**
     * Constructs a new Level object.
     *
     * @param {MovableObject[]} enemies - An array of enemy objects.
     * @param {Cloud[]} clouds - An array of cloud objects.
     * @param {BackgroundObject[]} backgroundObjects - An array of background objects.
     * @param {Coin[]} coin - An array of coin objects.
     * @param {Bottle[]} bottle - An array of bottle objects.
     * @param {Endboss[]} endboss - An array of end boss objects.
     * @param {MovableObject[]} smallChicken - An array of small chicken enemy objects.
     */
    constructor(enemies, clouds, backgroundObjects, coin, bottle, endboss, smallChicken) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
        this.bottle = bottle;
        this.endboss = endboss;
        this.smallChicken = smallChicken;
    }


    /**
     * Removes a specific coin from the level.
     * @param {Coin} coin - The coin object to be removed.
     */
    removeCoin(coin) {
        const index = this.coin.indexOf(coin);
        if (index !== -1) {
            this.coin.splice(index, 1);
        }
    }
}