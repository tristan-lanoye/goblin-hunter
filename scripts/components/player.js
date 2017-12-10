class Player {
    constructor(data, position, id) {
        this.data = data
        this.sheet = this.data.spritesheet
        this.x = position.x
        this.y = position.y
        this.speed = 3.8
        this.vx = 0
        this.vy = 0
        this.id = id
        this.idling = {
            maxFrame: 3,
            srcy: 0,
            frameSpeed: 0.08
        }
        this.walkingLeft = {
            maxFrame: 9,
            srcy: 1,
            frameSpeed: 0.2
        }
        this.walkingRight = {
            maxFrame: 9,
            srcy: 2,
            frameSpeed: 0.2
        }
        this.jumpingLeft = {
            maxFrame: 2,
            srcy: 3,
            frameSpeed: 0.12
        }
        this.jumpingFront = {
            maxFrame: 2,
            srcy: 4,
            frameSpeed: 0.12
        }
        this.jumpingRight = {
            maxFrame: 2,
            srcy: 5,
            frameSpeed: 0.12
        }
        this.shootingLeft = {
            maxFrame: 13,
            srcy: 6,
            frameSpeed: 0.30
        }
        this.shootingRight = {
            maxFrame: 13,
            srcy: 7,
            frameSpeed: 0.30
        }
        this.strikingLeft = {
            maxFrame: 5,
            srcy: 8,
            frameSpeed: 0.28
        }
        this.strikingRight = {
            maxFrame: 5,
            srcy: 9,
            frameSpeed: 0.28
        }
        this.dying = {
            maxFrame: 7,
            srcy: 10,
            frameSpeed: 0.1
        }
        this.state = this.idling
        this.left = 0
        this.right = 0
        this.life = 3
        this.movement = false
        this.inJump = true
        this.canFall = true
        this.onGround = false
        this.collision = false
        this.invincible = false
        this.invincibleCount = 5
        this.enemy = undefined
        this.kill = 0
        this.shooting = false
        this.lastShot = 0
        this.striking = false
        this.screenr = false
        this.screeng = false
        this.gameOver = false
        this.prevDirection = undefined
        this.currentFrame = 0
        this.frameCount = 0
        this.widthSword = 110
        this.adjustSword = false
        this.stopAnim = false
        this.newX = 0
        this.width = this.data.width / this.data.columns
        this.height = this.data.height / this.data.rows
        this.srcx = this.currentFrame * this.width
    }

    changeState() {
        this.frameCount = 0
    }

    updateFrame() {
        if (this.stopAnim && this.state == this.dying) {
            paused = true
            !multiplayer ? popupGameover.classList.add('active-popup') : popupWinner.classList.add('active-popup')
        } else if (this.stopAnim && !this.inJump) {
            this.changeState()
            if (!this.movement) {
                this.state = this.idling
            } else {
                this.left - this.right > 0 ? this.state = this.walkingLeft : this.state = this.walkingRight
            }
            this.stopAnim = false
        } else if (this.stopAnim && this.inJump) {
            if (this.right - this.left < 0) {
                this.state = this.jumpingLeft
            } else if (this.right - this.left > 0) {
                this.state = this.jumpingRight
            } else {
                this.state = this.jumpingFront
            }
            this.changeState()
            this.stopAnim = false
        }

        this.frameCount += this.state.frameSpeed
        this.currentFrame = Math.floor(this.frameCount) % this.state.maxFrame

        if ((this.state == this.strikingRight || this.state == this.strikingLeft) && this.currentFrame >= this.state.maxFrame - 2) {
            this.srcx = this.currentFrame * this.width
            this.adjustSword = true
            if (this.currentFrame == this.state.maxFrame - 1) {
                this.srcx = (this.currentFrame - 1) * this.width + this.widthSword
                if (!this.striking) {
                    this.stopAnim = true
                }
            }
        } else if (this.state == this.dying && this.currentFrame == this.state.maxFrame - 1) {
            this.stopAnim = true
        } else if ((this.state == this.shootingLeft || this.state == this.shootingRight) && this.currentFrame == this.state.maxFrame - 1 && !this.shooting) {
            this.stopAnim = true
        } else {
            this.srcx = this.currentFrame * this.width
            this.adjustSword = false
        }
    }

    checkStriking() {
        if (this.striking) {
            if (this.state == this.strikingLeft) {
                if (this.prevDirection > 0) {
                    this.state = this.strikingRight
                }
            } else if (this.state == this.strikingRight) {
                if (this.prevDirection < 0) {
                    this.state = this.strikingLeft
                }
            }
        }
    }

    checkShooting() {
        if (this.shooting) {
            if (this.state == this.shootingLeft) {
                if (this.prevDirection > 0) {
                    this.state = this.shootingRight
                }
            } else if (this.state == this.shootingRight) {
                if (this.prevDirection < 0) {
                    this.state = this.shootingLeft
                }
            } else {
                this.shooting = false
            }

            if (frameCount - this.lastShot >= 10) {
                let vx = 0
                let vy = [-1, 0, 1]
                this.state == this.shootingLeft ? vx = -1 : vx = 1
                for (let i = 0; i < 3; i++) {
                    const bullet = new Bullet(this.x + this.width / 2, this.y + this.height / 2, vx, vy[i], this.id)
                    bullets.push(bullet)
                }
                this.lastShot = frameCount
            }
        }
    }

    checkMovement() {
        if (this.invincibleCount > 0 && this.invincible) {
            this.invincibleCount -= 0.025
        } else {
            this.invincibleCount = 5
            this.invincible = false
        }
        if (this.left != 0 ||
            this.right != 0 ||
            this.inJump ||
            this.state == this.strikingLeft ||
            this.state == this.strikingRight ||
            this.state == this.shootingLeft ||
            this.state == this.shootingRight ||
            this.state == this.dying) {
            this.movement = true
        } else {
            this.movement = false
            if (this.state != this.idling) {
                this.changeState()
                this.state = this.idling
            }
        }
    }

    checkCollision() {
        let temp = []
        let tiley = undefined
        this.canFall = true
        for (const tile of tiles) {
            if (this.y + this.height - 6 > tile.y &&
                this.y + this.height - 6 < tile.y + tile.height / 6 &&
                this.x + this.width - 22 > tile.x &&
                this.x < tile.x + tile.width - 22) {
                tiley = tile.y
                this.collision = true
            } else if (this.x + this.width - 22 > tile.x &&
                this.x < tile.x + tile.width - 22 &&
                this.y + this.height - tile.y < 10 &&
                this.y + this.height - tile.y > 0) {
                temp.push(false)
            } else if (this.x + this.width - 22 < tile.x ||
                this.x > tile.x + tile.width - 22) {
                temp.push(true)
            }
        }
        for (const elem of temp) {
            if (elem == false) {
                this.canFall = false
            }
        }
        if (this.collision && this.vy < 0) {
            createParticles(200, this.x + this.width / 2, this.y + this.height, 'rgba(34,34,34,0.15)', -25, 25, -1, -20, 1, 200, 300, 0.5)
            this.onGround = true
            this.inJump = false
            this.vy = 0
            this.y = tiley - this.height + 6
            if (!gameOver) {
                this.left - this.right > 0 ? this.state = this.walkingLeft : this.state = this.walkingRight
            }
            this.collision = false
        } else if (this.canFall) {
            this.inJump = true
            this.collision = false
        }

        if (!multiplayer) {
            for (let i = 0; i < enemies.length; i++) {
                if (this.x + this.width - 18 > enemies[i].x &&
                    this.x + 18 < enemies[i].x + enemies[i].width &&
                    this.y + this.height - 9 > enemies[i].y &&
                    this.y + 9 < enemies[i].y + enemies[i].height &&
                    this.state != this.strikingLeft &&
                    this.state != this.strikingRight &&
                    !this.invincible
                ) {
                    this.life--;
                    heartsplayer1.shift()
                    this.screenRed()
                    if (this.life == 0 && this.state != this.dying) {
                        this.changeState()
                        this.state = this.dying
                        gameOver = true
                    } else {
                        this.invincible = true
                    }
                } else if (this.x + this.width * 1.5 > enemies[i].x &&
                    this.x - this.width < enemies[i].x + enemies[i].width &&
                    this.y + this.height > enemies[i].y &&
                    this.y < enemies[i].y + enemies[i].height &&
                    (this.state == this.strikingLeft || this.state == this.strikingRight) && this.frameCount > 2) {
                    this.kill++;
                    this.screenGreen()
                    enemies.splice(i, 1)
                }
            }
        } else {
            this.id === 1 ? this.enemy = players[1] : this.enemy = players[0]
            if (this.x + this.width * 1.5 > this.enemy.x &&
                this.x < this.enemy.x + this.enemy.width / 1.5 &&
                this.y + this.height > this.enemy.y &&
                this.y < this.enemy.y + this.enemy.height &&
                this.state == this.strikingRight &&
                this.frameCount > 2 &&
                !this.enemy.invincible) {
                this.touchEnemy()
            } else if (this.x - this.width / 2 < this.enemy.x + this.enemy.width &&
                this.x > this.enemy.x - this.enemy.width / 1.5 &&
                this.y + this.height > this.enemy.y &&
                this.y < this.enemy.y + this.enemy.height &&
                this.state == this.strikingLeft &&
                this.frameCount > 2 &&
                !this.enemy.invincible) {
                this.touchEnemy()
            }
        }
    }

    screenGreen() {
        this.screeng = true
        window.setTimeout(() => {
            this.screeng = false
        }, 100)
    }

    screenRed() {
        this.screenr = true
        window.setTimeout(() => {
            this.screenr = false
        }, 100)
    }

    touchEnemy() {
        this.kill++;
        this.enemy.life--;
        if (this.enemy.life == 0 && this.enemy.state != this.enemy.dying) {
            this.enemy.changeState()
            this.enemy.state = this.enemy.dying
            gameOver = true
        } else {
            this.enemy.invincible = true
        }
        this.id === 1 ? heartsplayer2.shift() : heartsplayer1.shift()
        this.enemy.invincible = true
        this.enemy.invincibleCount = 4
        this.invincible = true
        this.invincibleCount = 4
        this.screenRed()
    }

    move() {
        if (this.inJump) {
            this.vy > 0 ? this.vy -= 0.25 : this.vy = Math.max(this.vy - 0.45, -6)
            this.y -= this.vy
        }
        if ((this.right - this.left) * this.speed != 0) {
            this.prevDirection = (this.right - this.left) * this.speed
        }
        if (this.y > canvas.height) {
            this.y = 0 - this.height
        }
        if (this.x + this.width / 2 < 0) {
            this.x = canvas.width
        } else if (this.x > canvas.width) {
            this.x = 0 - this.width / 3
        }
        if (!gameOver) {
            this.x += (this.right - this.left) * this.speed
        }
    }

    display() {
        if (this.screenr) {
            ctx.beginPath()
            ctx.fillStyle = 'rgba(255,0,0,0.04)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        if (this.screeng) {
            ctx.beginPath()
            ctx.fillStyle = 'rgba(0,255,0,0.04)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        if (this.invincible) {
            ctx.fillStyle = 'rgba(61,139,184,0.5)'
            ctx.beginPath()
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2)
            ctx.closePath()
            ctx.fill()
        }
        this.newx = this.x - this.width
        if (this.adjustSword && this.state == this.strikingRight) {
            ctx.drawImage(this.sheet, this.srcx, this.state.srcy * this.height, this.widthSword, this.height, this.x, this.y, this.widthSword, this.height)
        } else if (this.adjustSword && this.state == this.strikingLeft) {
            ctx.drawImage(this.sheet, this.srcx, this.state.srcy * this.height, this.widthSword, this.height, this.newx, this.y, this.widthSword, this.height)
        } else {
            ctx.drawImage(this.sheet, this.srcx, this.state.srcy * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
        }
    }
}