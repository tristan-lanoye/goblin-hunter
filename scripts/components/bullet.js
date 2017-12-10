class Bullet {
    constructor(x, y, vx, vy, id) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.speed = 5
        this.width = this.height = 13
        this.id = id
        this.id === 1 ? this.enemy = players[1] : this.enemy = players[0]
    }

    checkCollision() {
        for (let i = 0; i < tiles.length; i++) {
            if (this.x < tiles[i].x + tiles[i].width &&
                this.x + this.width > tiles[i].x &&
                this.y + this.height > tiles[i].y &&
                this.y < tiles[i].y + tiles[i].height) {
                return true
            }
        }
        if (!multiplayer) {
            for (let i = 0; i < enemies.length; i++) {
                if (this.x < enemies[i].x + enemies[i].width &&
                    this.x + this.width > enemies[i].x &&
                    this.y + this.height > enemies[i].y &&
                    this.y < enemies[i].y + enemies[i].height) {
                    enemies.splice(i, 1)
                    i--
                    players[0].kill++;
                    players[0].screenGreen()
                    return true
                }
            }
        } else {
            if (this.x < this.enemy.x + this.enemy.width / 3 &&
                this.x + this.width > this.enemy.x + this.enemy.width / 3 &&
                this.y + this.height > this.enemy.y + this.height &&
                this.y < this.enemy.y + this.enemy.height - this.height &&
                !this.enemy.invincible) {
                this.id === 1 ? players[0].touchEnemy() : players[1].touchEnemy()
                return true
            }
        }
    }

    display() {
        this.x += this.vx * this.speed
        this.y += this.vy * this.speed
        this.id === 1 ? ctx.drawImage(bulletRed, this.x, this.y) : ctx.drawImage(bulletBlue, this.x, this.y)
    }
}