import Bullet from "./Bullet.js"
export default class BulletController {
    bullets = []
    timeTillNextBulletAllowed = 0

    constructor(canvas, maxBulletsAtTime, bulletColour, soundEnabled) {
        this.canvas = canvas
        this.maxBulletsAtTime = maxBulletsAtTime
        this.bulletColour = bulletColour
        this.soundEnabled = soundEnabled

        this.shootSound = new Audio("../JS/sounds/shoot.wav")
        this.shootSound.volume = 0.5
    }
    draw(ctx) {
        this.bullets = this.bullets.filter(
            (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
        );

        this.bullets.forEach((bullet) => bullet.draw(ctx));
        if (this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
    }
    collideWith(sprite) {
        const bTHSpriteIndex = this.bullets.findIndex((bullet) =>
            bullet.collideWith(sprite)
        )
        if (bTHSpriteIndex >= 0) {
            this.bullets.splice(bTHSpriteIndex, 1);
            return true;
        }

        return false;
    }
    //finds the index of the bullet that hit sprite
    shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
        if (this.timeTillNextBulletAllowed <= 0 &&
            this.bullets.length < this.maxBulletsAtTime) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColour)
            this.bullets.push(bullet)
            if (this.soundEnabled) {
                this.shootSound.currentTime = 0
                this.shootSound.play()
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed
        }


    }
}