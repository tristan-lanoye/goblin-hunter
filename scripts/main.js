const setTime = () => {
    if (frameCount % 60 == 0) {
        time++
    }
    if (gameOver) {
        if(!multiplayer) {
            if (sessionStorage.getItem('bestTime') === null) {
                sessionStorage.setItem('bestTime', '0')
            }
            if (sessionStorage.getItem('bestKills') === null) {
                sessionStorage.setItem('bestKills', '0')
            }
    
            let bestTime = parseInt(sessionStorage.getItem('bestTime'))
            if (time > bestTime) {
                sessionStorage.setItem('bestTime', time)
                bestTime = time
            }
            popupGameoverTime.innerHTML = time
            popupGameoverBestTime.innerHTML = bestTime
    
    
            let bestKills = parseInt(sessionStorage.getItem('bestKills'))
            if (players[0].kill > bestKills) {
                sessionStorage.setItem('bestKills', players[0].kill)
                bestKills = players[0].kill
            }
            popupGameoverKills.innerHTML = players[0].kill
            popupGameoverBestKills.innerHTML = bestKills
        } else {
            players[0].life > 0 ? popupWinnerWinner.innerHTML = '1' : popupWinnerWinner.innerHTML = '2'
        }
    }
}

const createParticles = (number, x, y, color, minvx, maxvx, minvy, maxvy, size, minlifespan, maxlifespan, gravity) => {
    const position = {
        x: x,
        y: y,
    }

    for (let i = 0; i < number; i++) {
        const speed = {
            vx: randomNumber(minvx, maxvx),
            vy: randomNumber(minvy, maxvy)
        }
        const lifespan = randomNumber(minlifespan, maxlifespan)
        const particle = new Particle(position, color, speed, size, lifespan, gravity)
        particles.push(particle)
    }
}

const createEnemies = (limit) => {
    for (let i = 0; i < limit; i++) {
        const number = Math.floor(randomNumber(0, 6))
        let speed = randomNumber(1, 3)
        const choice = enemiesChoices[number]
        if (Math.random() > 0.5) {
            choice.row += 1;
            const enemy = new Enemy(canvas.width / 2, canvas.height / 2 - 10, speed, choice.column, choice.row, choice.maxFrame)
            enemies.push(enemy)
        } else {
            speed = -speed
            const enemy = new Enemy(canvas.width / 2, 50, speed, choice.column, choice.row, choice.maxFrame)
            enemies.push(enemy)
        }
    }
}

updateCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawImageProp(ctx, canvasBackground, 0, 0, canvas.width, canvas.height, 0, 0)

    ctx.font = 'Spectral SC 100px';
    ctx.fillText('press p to pause', 100, 100);

    ctx.beginPath()
    ctx.fillStyle = 'rgba(34,34,34,0.85)'
    ctx.arc(canvas.width / 2, canvas.height / 2 + 10, canvas.width / 20, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()

    frameCount++
    setTime()

    for (const tile of tiles) {
        tile.display()
    }

    for (let i = 0; i < bullets.length; i++) {
        bullets[i].display()
        if (bullets[i].checkCollision()) {
            bullets.splice(i, 1)
            i--
        }
    }

    for (const enemy of enemies) {
        enemy.updateFrame()
        enemy.checkCollision()
        enemy.move()
        enemy.display()
    }

    for (const heart of heartsplayer1) {
        heart.display()
    }
    if (multiplayer) {
        for (const heart of heartsplayer2) {
            heart.display()
        }
    }

    for (const player of players) {
        player.updateFrame()
        player.checkMovement()
        player.checkStriking()
        player.checkShooting()
        player.checkCollision()
        player.move()
        player.display()
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].display()
        if (particles[i].checkLifespan) {
            particles.splice(i, 1)
            i--
        }
    }

    if (frameCount % enemyRate == 0 && !multiplayer && enemies.length < 200) {
        createEnemies(1)
        enemyRate--
        if(enemyRate < 10) {
            enemyRate += 60
        }
    }

    if (!paused) {
        window.requestAnimationFrame(updateCanvas)
    }
}