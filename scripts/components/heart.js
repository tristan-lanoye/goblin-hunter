class Heart {
    constructor(player, speed) {
        this.player = player
        this.speed = speed
        this.x = this.player.x
        this.y = this.player.y
        this.width = 15
        this.height = 15
    }

    display() {
        this.player.id === 1 ? this.x += (this.player.x - this.x + this.player.width / 3) * this.speed : this.x += (this.player.x - this.x + this.player.width / 2) * this.speed
        this.y += (this.player.y - this.y) * this.speed

        this.player.id === 1 ? ctx.drawImage(heartImage, this.x - this.speed * 500, this.y) : ctx.drawImage(heartImage, this.x + this.speed * 500, this.y)
    }
}