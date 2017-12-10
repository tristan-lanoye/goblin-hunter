class Particle {
    constructor(position, color, speed, size, lifespan, gravity) {
        this.x = position.x
        this.y = position.y
        this.vx = speed.vx
        this.vy = speed.vy
        this.size = size
        this.lifespan = lifespan
        this.gravity = gravity
        this.color = color
    }

    checkLifespan() {
        this.lifespan -= 0.01
        if (this.lifespan <= 0) {
            return true
            particles.splice(i, 1)
        }
    }

    display() {
        this.x += this.vx
        this.vy += this.gravity
        this.y += this.vy
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2, false)
        ctx.fill()
    }
}