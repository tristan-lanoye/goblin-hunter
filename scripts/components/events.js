window.addEventListener('keydown', (e) => {
    if (playing && !gameOver) {
        if (e.keyCode === 37) {
            players[0].left = 1
            if (players[0].state != players[0].walkingLeft && players[0].state != players[0].shootingRight && players[0].state != players[0].shootingLeft0 && players[0].state != players[0].strikingLeft && players[0].state != players[0].strikingRight && !players[0].inJump) {
                players[0].changeState()
                players[0].state = players[0].walkingLeft
            } else if (players[0].inJump && players[0].state != players[0].shootingRight && players[0].state != players[0].shootingLeft && players[0].state != players[0].strikingLeft && players[0].state != players[0].strikingRight && players[0].state != players[0].jumpingLeft) {
                players[0].state = players[0].jumpingLeft
            }
        }
        if (e.keyCode === 81 && multiplayer) {
            players[1].left = 1
            if (players[1].state != players[1].walkingLeft && players[1].state != players[1].shootingRight && players[1].state != players[1].shootingLeft && players[1].state != players[1].strikingLeft && players[1].state != players[1].strikingRight && !players[1].inJump) {
                players[1].changeState()
                players[1].state = players[1].walkingLeft
            } else if (players[1].inJump && players[1].state != players[1].shootingRight && players[1].state != players[1].shootingLeft && players[1].state != players[1].strikingLeft && players[1].state != players[1].strikingRight && players[1].state != players[1].jumpingLeft) {
                players[1].state = players[1].jumpingLeft
            }
        }
        if (e.keyCode === 38) {
            if (players[0].left - players[0].right > 0 && !players[0].inJump) {
                if (players[0].state != players[0].shootingRight && players[0].state != players[0].shootingLeft && players[0].state != players[0].strikingLeft && players[0].state != players[0].strikingRight) {
                    players[0].changeState()
                    players[0].state = players[0].jumpingLeft
                }
                players[0].inJump = true
                players[0].onGround = false
                players[0].vy = players[0].speed * 2.3
            } else if (players[0].left - players[0].right < 0 && !players[0].inJump) {
                if (players[0].state != players[0].shootingRight && players[0].state != players[0].shootingLeft && players[0].state != players[0].strikingLeft && players[0].state != players[0].strikingRight) {
                    players[0].changeState()
                    players[0].state = players[0].jumpingRight
                }
                players[0].changeState()
                players[0].inJump = true
                players[0].onGround = false
                players[0].vy = players[0].speed * 2.3
            } else if (players[0].left - players[0].right == 0 && !players[0].inJump) {
                if (players[0].state != players[0].shootingRight && players[0].state != players[0].shootingLeft && players[0].state != players[0].strikingLeft && players[0].state != players[0].strikingRight) {
                    players[0].changeState()
                    players[0].state = players[0].jumpingFront
                }
                players[0].changeState()
                players[0].inJump = true
                players[0].onGround = false
                players[0].vy = players[0].speed * 2.3
            }
        }
        if (e.keyCode === 90 && multiplayer) {
            if (players[1].left - players[1].right > 0 && !players[1].inJump) {
                if (players[1].state != players[1].shootingRight && players[1].state != players[1].shootingLeft && players[1].state != players[1].strikingLeft && players[1].state != players[1].strikingRight) {
                    players[1].changeState()
                    players[1].state = players[1].jumpingLeft
                }
                players[1].inJump = true
                players[1].onGround = false
                players[1].vy = players[1].speed * 2.3
            } else if (players[1].left - players[1].right < 0 && !players[1].inJump) {
                if (players[1].state != players[1].shootingRight && players[1].state != players[1].shootingLeft && players[1].state != players[1].strikingLeft && players[1].state != players[1].strikingRight) {
                    players[1].changeState()
                    players[1].state = players[1].jumpingRight
                }
                players[1].changeState()
                players[1].inJump = true
                players[1].onGround = false
                players[1].vy = players[1].speed * 2.3
            } else if (players[1].left - players[1].right == 0 && !players[1].inJump) {
                if (players[1].state != players[1].shootingRight && players[1].state != players[1].shootingLeft && players[1].state != players[1].strikingLeft && players[1].state != players[1].strikingRight) {
                    players[1].changeState()
                    players[1].state = players[1].jumpingFront
                }
                players[1].changeState()
                players[1].inJump = true
                players[1].onGround = false
                players[1].vy = players[1].speed * 2.3
            }
        }
        if (e.keyCode === 39) {
            players[0].right = 1
            if (players[0].state != players[0].walkingRight && players[0].state != players[0].shootingRight && players[0].state != players[0].shootingLeft && players[0].state != players[0].strikingLeft && players[0].state != players[0].strikingRight && !players[0].inJump) {
                players[0].changeState()
                players[0].state = players[0].walkingRight
            } else if (players[0].inJump && players[0].state != players[0].shootingRight && players[0].state != players[0].shootingLeft && players[0].state != players[0].strikingLeft && players[0].state != players[0].strikingRight && players[0].state != players[0].jumpingRight) {
                players[0].state = players[0].jumpingRight
            }
        }
        if (e.keyCode === 68 && multiplayer) {
            players[1].right = 1
            if (players[1].state != players[1].walkingRight && players[1].state != players[1].shootingRight && players[1].state != players[1].shootingLeft && players[1].state != players[1].strikingLeft && players[1].state != players[1].strikingRight && !players[1].inJump) {
                players[1].changeState()
                players[1].state = players[1].walkingRight
            } else if (players[1].inJump && players[1].state != players[1].shootingRight && players[1].state != players[1].shootingLeft && players[1].state != players[1].strikingLeft && players[1].state != players[1].strikingRight && players[1].state != players[1].jumpingRight) {
                players[1].state = players[1].jumpingRight
            }
        }
        if (e.keyCode === 40 && players[0].inJump) {
            players[0].vy -= 2
        }
        if (e.keyCode === 83 && multiplayer && players[1].inJump) {
            players[1].vy -= 2
        }
        if (e.keyCode === 98) {
            if (!players[0].striking) {
                players[0].striking = true
                if (players[0].prevDirection < 0) {
                    if (players[0].state != players[0].strikingRight && players[0].state != players[0].strikingLeft) {
                        players[0].changeState()
                        players[0].state = players[0].strikingLeft
                    }
                } else {
                    if (players[0].state != players[0].strikingRight && players[0].state != players[0].strikingLeft) {
                        players[0].changeState()
                        players[0].state = players[0].strikingRight
                    }
                }
            }
        }
        if (e.keyCode === 71 && multiplayer) {
            if (!players[1].striking) {
                players[1].striking = true
                if (players[1].prevDirection < 0) {
                    if (players[1].state != players[1].strikingRight && players[1].state != players[1].strikingLeft) {
                        players[1].changeState()
                        players[1].state = players[1].strikingLeft
                    }
                } else {
                    if (players[1].state != players[1].strikingRight && players[1].state != players[1].strikingLeft) {
                        players[1].changeState()
                        players[1].state = players[1].strikingRight
                    }
                }
            }
        }
        if (e.keyCode === 99) {
            if (!players[0].shooting) {
                players[0].shooting = true
                players[0].shootingPressed = true
                if (players[0].prevDirection < 0) {
                    if (players[0].state != players[0].shootingRight && players[0].state != players[0].shootingLeft) {
                        players[0].changeState()
                        players[0].state = players[0].shootingLeft
                    }
                } else {
                    if (players[0].state != players[0].shootingRight && players[0].state != players[0].shootingLeft) {
                        players[0].changeState()
                        players[0].state = players[0].shootingRight
                    }
                }
            }
        }
        if (e.keyCode === 72 && multiplayer) {
            if (!players[1].shooting) {
                players[1].shooting = true
                if (players[1].prevDirection < 0) {
                    if (players[1].state != players[1].shootingRight && players[1].state != players[1].shootingLeft) {
                        players[1].changeState()
                        players[1].state = players[1].shootingLeft
                    }
                } else {
                    if (players[1].state != players[1].shootingRight && players[1].state != players[1].shootingLeft) {
                        players[1].changeState()
                        players[1].state = players[1].shootingRight
                    }
                }
            }
        }
        if (e.keyCode === 80) { //p 
            popupPause.classList.toggle('active-popup');
            !paused ? paused = true : (paused = false, requestAnimationFrame(updateCanvas))
        }
    }
})

window.addEventListener('keyup', (e) => {
    if (playing) {
        if (e.keyCode === 37) {
            players[0].left = 0
        }
        if (e.keyCode === 81 && multiplayer) {
            players[1].left = 0
        }
        if (e.keyCode === 39) {
            players[0].right = 0
        }
        if (e.keyCode === 68 && multiplayer) {
            players[1].right = 0
        }
        if (e.keyCode === 98) {
            players[0].striking = false
        }
        if (e.keyCode === 71 && multiplayer) {
            window.setTimeout(() => {
                players[1].striking = false
            }, 1)
        }
        if (e.keyCode === 99) {
            players[0].shooting = false
        }
        if (e.keyCode === 72 && multiplayer) {
            window.setTimeout(() => {
                players[1].shooting = false
            }, 1)
        }
    }
})

canvas.addEventListener('mousedown', (e) => {
    if (!gameOver) {
        if (e.button == 0) {
            players[0].striking = true
            if (e.clientX < canvas.width / 2) {
                if (players[0].state != players[0].strikingRight && players[0].state != players[0].strikingLeft) {
                    players[0].changeState()
                    players[0].state = players[0].strikingLeft
                }
            } else {
                if (players[0].state != players[0].strikingRight && players[0].state != players[0].strikingLeft) {
                    players[0].changeState()
                    players[0].state = players[0].strikingRight
                }
            }
        } else if (e.button == 2) {
            players[0].shooting = true
            if (e.clientX < canvas.width / 2) {
                if (players[0].state != players[0].shootingRight && players[0].state != players[0].shootingLeft) {
                    players[0].changeState()
                    players[0].state = players[0].shootingLeft
                }
            } else {
                if (players[0].state != players[0].shootingRight && players[0].state != players[0].shootingLeft) {
                    players[0].changeState()
                    players[0].state = players[0].shootingRight
                }
            }
        }
    }
})

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
})

canvas.addEventListener('mouseup', (e) => {
    if (e.button == 0) {
        window.setTimeout(() => {
            players[0].striking = false
        }, 1)
    }
    if (e.button == 2) {
        window.setTimeout(() => {
            players[0].shooting = false
        }, 1)
    }
})

canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    e.stopPropagation()
})

popupPauseResume.addEventListener('click', (e) => {
    e.stopPropagation()
    if (playing) {
        popupPause.classList.toggle('active-popup');
        !paused ? paused = true : (paused = false, requestAnimationFrame(updateCanvas))
    }
})

popupPauseRestart.addEventListener('click', (e) => {
    let tempplayer1 = player1
    let tempplayer2 = player2
    let tempmultiplayer = multiplayer
    reset()
    player1 = tempplayer1
    player2 = tempplayer2
    multiplayer = tempmultiplayer
    setup()
    popupPause.classList.remove('active-popup')
    window.setTimeout(() => {
        paused = false
        updateCanvas()
    }, 600)
})

popupPauseMenu.addEventListener('click', (e) => {
    if (playing) {
        if (popupPause.classList.contains('active-popup')) {
            popupPause.classList.remove('active-popup')
        }
        reset()
        html.style.overflow = 'visible'
        switchPannel()
        optionsSelectMode.classList.add('active-popup')        
    }
})

popupGameoverRetry.addEventListener('click', (e) => {
    let tempplayer1 = player1
    let tempplayer2 = player2
    let tempmultiplayer = multiplayer
    reset()
    player1 = tempplayer1
    player2 = tempplayer2
    multiplayer = tempmultiplayer
    setup()
    popupGameover.classList.remove('active-popup')
    window.setTimeout(() => {
        paused = false
        updateCanvas()
    }, 600)
})

popupGameoverMenu.addEventListener('click', (e) => {
    if (playing) {
        if (popupGameover.classList.contains('active-popup')) {
            popupGameover.classList.remove('active-popup')
        }
        reset()
        html.style.overflow = 'visible'
        switchPannel()
        optionsSelectMode.classList.add('active-popup')
    }
})

popupWinnerRestart.addEventListener('click', (e) => {
    let tempplayer1 = player1
    let tempplayer2 = player2
    let tempmultiplayer = multiplayer
    reset()
    player1 = tempplayer1
    player2 = tempplayer2
    multiplayer = tempmultiplayer
    setup()
    popupWinner.classList.remove('active-popup')
    window.setTimeout(() => {
        paused = false
        updateCanvas()
    }, 600)
})

popupWinnerMenu.addEventListener('click', (e) => {
    if (playing) {
        if (popupWinner.classList.contains('active-popup')) {
            popupWinner.classList.remove('active-popup')
        }
        reset()
        html.style.overflow = 'visible'
        switchPannel()
        optionsSelectMode.classList.add('active-popup')
    }
})

homeSingleplayer.addEventListener('click', (e) => {
    if (!optionsSingleplayer.classList.contains('active-popup')) {
        optionsSingleplayer.classList.add('active-popup')
        optionsSelectMode.classList.remove('active-popup') 
        optionsSingleplayer.scrollIntoView({
            behavior: 'smooth'
        })
        homeSingleplayer.classList.add('active-home-singleplayer')
        homeSingleplayer.classList.remove('inactive-home-singleplayer')
        multiplayer = false
        if (optionsMultiplayer.classList.contains('active-popup')) {
            optionsMultiplayer.classList.remove('active-popup')
            homeMultiplayer.classList.remove('active-home-multiplayer')
            homeMultiplayer.classList.add('inactive-home-multiplayer')
        }
    } else {
        optionsSingleplayer.classList.remove('active-popup')
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
        homeSingleplayer.classList.remove('active-home-singleplayer')
        homeSingleplayer.classList.add('inactive-home-singleplayer')
        optionsSelectMode.classList.add('active-popup')
        multiplayer = undefined
    }

    if (!multiplayer && player1 != undefined && !startGameSingleplayer.classList.contains('start-active')) {
        startGameSingleplayer.classList.add('start-active')
    } else if (!multiplayer && player1 == undefined && startGameSingleplayer.classList.contains('start-active')) {
        startGameSingleplayer.classList.remove('start-active')
    }
})
homeMultiplayer.addEventListener('click', (e) => {
    if (!optionsMultiplayer.classList.contains('active-popup')) {
        optionsMultiplayer.classList.add('active-popup')
        optionsSelectMode.classList.remove('active-popup')
        optionsMultiplayer.scrollIntoView({
            behavior: 'smooth'
        })
        homeMultiplayer.classList.remove('inactive-home-multiplayer')
        homeMultiplayer.classList.add('active-home-multiplayer')
        multiplayer = true
        if (optionsSingleplayer.classList.contains('active-popup')) {
            optionsSingleplayer.classList.remove('active-popup')
            homeSingleplayer.classList.remove('active-home-singleplayer')
            homeSingleplayer.classList.add('inactive-home-singleplayer')
        }
    } else {
        optionsMultiplayer.classList.remove('active-popup')
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
        optionsSelectMode.classList.add('active-popup')
        homeMultiplayer.classList.remove('active-home-multiplayer')
        homeMultiplayer.classList.add('inactive-home-multiplayer')
        multiplayer = undefined
    }
})
startGameSingleplayer.addEventListener('click', (e) => {
    if (start && !playing && player1 != undefined && !multiplayer && !canvas.classList.contains('active-canvas-game')) {
        start = false
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
        optionsSingleplayer.classList.remove('active-popup')
        homeSingleplayer.classList.remove('active-home-singleplayer')
        homeSingleplayer.classList.add('inactive-home-singleplayer')

        skeletonPreviewS.classList.remove('active-image')
        skeletonPreviewS.classList.add('inactive-image')
        skeletonTextS.classList.remove('active-text')
        skeletonTextS.classList.add('inactive-text')

        knightPreviewS.classList.remove('active-image')
        knightPreviewS.classList.add('inactive-image')
        knightTextS.classList.remove('active-text')
        knightTextS.classList.add('inactive-text')
        window.setTimeout(() => {
            html.style.overflow = 'hidden'
            setup()
            switchPannel()
            window.setTimeout(() => {
                paused = false
                updateCanvas()
            }, 600);
        }, 500)
    } else {
        window.alert('Please select a game mode and a character')
    }
})

startGameMultiplayer.addEventListener('click', (e) => {
    if (start && !playing && player1 != undefined && player2 != undefined && multiplayer && !canvas.classList.contains('active-canvas-game')) {
        start = false
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        optionsMultiplayer.classList.remove('active-popup')
        homeMultiplayer.classList.remove('active-home-multiplayer')
        homeMultiplayer.classList.add('inactive-home-multiplayer')

        skeletonPreviewS.classList.remove('active-image')
        skeletonPreviewS.classList.add('inactive-image')
        skeletonTextS.classList.remove('active-text')
        skeletonTextS.classList.add('inactive-text')

        knightPreviewS.classList.remove('active-image')
        knightPreviewS.classList.add('inactive-image')
        knightTextS.classList.remove('active-text')
        knightTextS.classList.add('inactive-text')
        window.setTimeout(() => {
            html.style.overflow = 'hidden'
            setup()
            switchPannel()
            window.setTimeout(() => {
                paused = false
                updateCanvas()
            }, 600);
        }, 500)
    } else {
        window.alert('Please select a game mode and a character for each player')
    }
})

knightPreviewS.addEventListener('click', (e) => {
    knightPreviewS.classList.toggle('inactive-image')
    knightPreviewS.classList.toggle('active-image')
    knightTextS.classList.toggle('inactive-text')
    knightTextS.classList.toggle('active-text')
    if (skeletonPreviewS.classList.contains('active-image')) {
        skeletonPreviewS.classList.toggle('inactive-image')
        skeletonPreviewS.classList.toggle('active-image')
        skeletonTextS.classList.toggle('inactive-text')
        skeletonTextS.classList.toggle('active-text')
    }
    if (knightPreviewS.classList.contains('active-image')) {
        player1 = 0
    } else if (!skeletonPreviewS.classList.contains('active-image')) {
        player1 = undefined
    }
    if (!multiplayer && player1 != undefined && !startGameSingleplayer.classList.contains('start-active')) {
        startGameSingleplayer.classList.add('start-active')
    } else if (!multiplayer && player1 == undefined && startGameSingleplayer.classList.contains('start-active')) {
        startGameSingleplayer.classList.remove('start-active')
    }
})
knightPreviewM1.addEventListener('click', (e) => {
    knightPreviewM1.classList.toggle('inactive-image')
    knightPreviewM1.classList.toggle('active-image')
    if (skeletonPreviewM1.classList.contains('active-image')) {
        skeletonPreviewM1.classList.toggle('inactive-image')
        skeletonPreviewM1.classList.toggle('active-image')
    }
    if (knightPreviewM1.classList.contains('active-image')) {
        player1 = 0
    } else if (!skeletonPreviewM1.classList.contains('active-image')) {
        player1 = undefined
    }
    if (multiplayer && player1 != undefined && player2 != undefined && !startGameMultiplayer.classList.contains('start-active')) {
        startGameMultiplayer.classList.add('start-active')
    } else if (!multiplayer || player1 == undefined || player2 == undefined && startGameMultiplayer.classList.contains('start-active')) {
        startGameMultiplayer.classList.remove('start-active')
    }
})
knightPreviewM2.addEventListener('click', (e) => {
    knightPreviewM2.classList.toggle('inactive-image')
    knightPreviewM2.classList.toggle('active-image')
    if (skeletonPreviewM2.classList.contains('active-image')) {
        skeletonPreviewM2.classList.toggle('inactive-image')
        skeletonPreviewM2.classList.toggle('active-image')
    }
    if (knightPreviewM2.classList.contains('active-image')) {
        player2 = 0
    } else if (!skeletonPreviewM2.classList.contains('active-image')) {
        player2 = undefined
    }
    if (multiplayer && player1 != undefined && player2 != undefined && !startGameMultiplayer.classList.contains('start-active')) {
        startGameMultiplayer.classList.add('start-active')
    } else if (!multiplayer || player1 == undefined || player2 == undefined && startGameMultiplayer.classList.contains('start-active')) {
        startGameMultiplayer.classList.remove('start-active')
    }
})
skeletonPreviewS.addEventListener('click', (e) => {
    skeletonPreviewS.classList.toggle('inactive-image')
    skeletonPreviewS.classList.toggle('active-image')
    skeletonTextS.classList.toggle('inactive-text')
    skeletonTextS.classList.toggle('active-text')
    if (knightPreviewS.classList.contains('active-image')) {
        knightPreviewS.classList.toggle('inactive-image')
        knightPreviewS.classList.toggle('active-image')
        knightTextS.classList.toggle('inactive-text')
        knightTextS.classList.toggle('active-text')
    }
    if (skeletonPreviewS.classList.contains('active-image')) {
        player1 = 1
    } else if (!knightPreviewS.classList.contains('active-image')) {
        player1 = undefined
    }
    if (!multiplayer && player1 != undefined && !startGameSingleplayer.classList.contains('start-active')) {
        startGameSingleplayer.classList.add('start-active')
    } else if (!multiplayer && player1 == undefined && startGameSingleplayer.classList.contains('start-active')) {
        startGameSingleplayer.classList.remove('start-active')
    }
})
skeletonPreviewM1.addEventListener('click', (e) => {
    skeletonPreviewM1.classList.toggle('inactive-image')
    skeletonPreviewM1.classList.toggle('active-image')
    if (knightPreviewM1.classList.contains('active-image')) {
        knightPreviewM1.classList.toggle('inactive-image')
        knightPreviewM1.classList.toggle('active-image')
    }
    if (skeletonPreviewM1.classList.contains('active-image')) {
        player1 = 1
    } else if (!knightPreviewM1.classList.contains('active-image')) {
        player1 = undefined
    }
    if (multiplayer && player1 != undefined && player2 != undefined && !startGameMultiplayer.classList.contains('start-active')) {
        startGameMultiplayer.classList.add('start-active')
    } else if (!multiplayer || player1 == undefined || player2 == undefined && startGameMultiplayer.classList.contains('start-active')) {
        startGameMultiplayer.classList.remove('start-active')
    }
})
skeletonPreviewM2.addEventListener('click', (e) => {
    skeletonPreviewM2.classList.toggle('inactive-image')
    skeletonPreviewM2.classList.toggle('active-image')
    if (knightPreviewM2.classList.contains('active-image')) {
        knightPreviewM2.classList.toggle('inactive-image')
        knightPreviewM2.classList.toggle('active-image')
    }
    if (skeletonPreviewM2.classList.contains('active-image')) {
        player2 = 1
    } else if (!knightPreviewM2.classList.contains('active-image')) {
        player2 = undefined
    }
    if (multiplayer && player1 != undefined && player2 != undefined && !startGameMultiplayer.classList.contains('start-active')) {
        startGameMultiplayer.classList.add('start-active')
    } else if (!multiplayer || player1 == undefined || player2 == undefined && startGameMultiplayer.classList.contains('start-active')) {
        startGameMultiplayer.classList.remove('start-active')
    }
})

window.addEventListener('resize', () => {
    resizeCanvas()
})