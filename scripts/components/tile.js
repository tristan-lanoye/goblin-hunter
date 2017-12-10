class Tile {
    constructor(data, column, row, side) {
        this.x = 0
        this.y = 0
        this.srcx = data.srcx
        this.srcy = data.srcy
        this.width = data.width
        this.height = data.height
        this.column = column
        this.row = row
        this.side = side
    }

    display() {
        if (this.side === 'left') {
            if (this.row != undefined) {
                this.x = this.column * this.width
                this.y = canvas.height - this.height / 1.5 - this.row * this.height
            } else {
                this.x = this.column * this.width - this.width / 2
                if (this.height > 87) {
                    this.y = 0 - this.height / 6
                } else {
                    this.y = 0 - this.height / 2
                }
            }
        } else if (this.side === 'right') {
            this.x = canvas.width - this.column * this.width - this.width
            if (this.row != undefined) {
                this.y = canvas.height - this.height / 1.5 - this.row * this.height
            } else {
                this.x = canvas.width - (this.column * this.width + this.width / 2)             
                if (this.height > 87) {
                    this.y = 0 - this.height / 6
                } else {
                    this.y = 0 - this.height / 2
                }
            }
        } else {
            this.x = canvas.width / 2 - this.width / 2 + this.column * this.width
            this.y = canvas.height - this.height - this.row * this.height
        }
        ctx.drawImage(spritesheetTiles, this.srcx, this.srcy, this.width, this.height, this.x, this.y, this.width, this.height)
    }
}