class Enemy {
    constructor(x, y, vx, column, row, maxFrame) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = 0
        this.width = 20
        this.height = 20
        this.inJump = true
        this.canFall = true
        this.onGround = false
        this.collision = false
        this.currentFrame = 0
        this.frameCount = 0
        this.maxFrame = maxFrame
        this.frameSpeed = 0.1
        this.sheetWidth = 356
        this.sheetHeight = 122
        this.sheetColumns = 12
        this.sheetRows = 4
        this.column = column
        this.width = this.sheetWidth / this.sheetColumns
        this.height = this.sheetHeight / this.sheetRows
        this.srcx = this.column * this.width
        this.srcy = row * this.height
    }

    updateFrame() {
        this.frameCount += this.frameSpeed
        this.currentFrame = Math.floor(this.frameCount) % this.maxFrame
        this.srcx = (this.currentFrame + this.column) * this.width
    }

    checkCollision() {
        let temp = []
        let tiley = undefined
        this.canFall = true
        for (const tile of tiles) {
            if (this.y + this.height - 4 > tile.y &&
                this.y + this.height - 4 < tile.y + tile.height / 6 &&
                this.x + this.width > tile.x &&
                this.x < tile.x + tile.width) {
                tiley = tile.y
                this.collision = true
            } else if (this.x + this.width > tile.x &&
                this.x < tile.x + tile.width &&
                this.y + this.height - tile.y < 10 &&
                this.y + this.height - tile.y > 0) {
                temp.push(false)
            } else if (this.x + this.width < tile.x ||
                this.x > tile.x + tile.width) {
                temp.push(true)
            }
        }
        for (const elem of temp) {
            if (elem == false) {
                this.canFall = false
            }
        }
        if (this.collision && this.vy < 0) {
            this.onGround = true
            this.inJump = false
            this.vy = 0
            this.y = tiley - this.height + 4
            this.collision = false
        } else if (this.canFall) {
            this.inJump = true
            this.collision = false
        }
    }

    move() {
        if (this.inJump) {
            this.vy > 0 ? this.vy -= 0.25 : this.vy = Math.max(this.vy - 0.45, -6)
            this.y -= this.vy
        }
        if (this.y > canvas.height) {
            this.y = 0 - this.height
        }
        if (this.x + this.width / 2 < 0) {
            this.x = canvas.width
        } else if (this.x > canvas.width) {
            this.x = 0 - this.width / 3
        }
        this.x += this.vx
    }

    display() {
        ctx.drawImage(spritesheetEnemy, this.srcx, this.srcy, this.width, this.height, this.x, this.y, this.width, this.height)
    }
}