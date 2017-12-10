let bubbles = []

class Bubble {
    constructor(data) {
        this.x = data.x
        this.y = data.y
        this.radius = data.radius
        this.vx = data.radius
        this.vy = data.radius
        this.r = data.r
        this.g = data.g
        this.b = data.b
        this.a = 0.1
    }

    checkCollision() {
        if (this.x <= 0 || this.x + this.radius >= canvasb.width) {
            this.vx *= -1
        }
        if (this.y <= 0 || this.y + this.radius >= canvasb.height) {
            this.vy *= -1
        }
    }

    display() {
        this.x += this.vx
        this.y += this.vy

        ctxb.beginPath()
        ctxb.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.a})`
        ctxb.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctxb.fill()
        ctxb.closePath()
    }
}

for (let i = 0; i < 100; i++) {
    let data = {
        x: randomNumber(100, canvas.width - 100),
        y: randomNumber(100, canvas.height - 100),
        radius: randomNumber(2, 8),
        vx: randomNumber(0, 1),
        vy: randomNumber(0, 1),
        r: randomNumber(0, 255),
        g: randomNumber(0, 255),
        b: randomNumber(0, 255),
    }
    const bubble = new Bubble(data)
    bubbles.push(bubble)
}

const updateBackground = () => {
    ctxb.fillStyle = 'rgba(34,34,34,0.5)'
    ctxb.fillRect(0, 0, canvasb.width, canvasb.height)

    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].checkCollision()
        bubbles[i].display()
    }

    window.requestAnimationFrame(updateBackground)
}
updateBackground()