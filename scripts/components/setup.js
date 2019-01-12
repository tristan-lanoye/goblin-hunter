const html = document.querySelector('html')
const body = document.querySelector('body')
const canvas = document.querySelector('.canvas-game')
const canvasb = document.querySelector('.canvas-background')
const ctx = canvas.getContext('2d')
const ctxb = canvasb.getContext('2d')
const popupPause = document.querySelector('.popup-pause')
const popupPauseResume = popupPause.querySelector('.popup-pause-resume')
const popupPauseRestart = popupPause.querySelector('.popup-pause-restart')
const popupPauseMenu = popupPause.querySelector('.popup-pause-quit')
const popupGameover = document.querySelector('.popup-gameover')
const popupGameoverRetry = document.querySelector('.popup-gameover-resume')
const popupGameoverMenu = document.querySelector('.popup-gameover-quit')
const popupGameoverTime = document.querySelector('.popup-gameover-time .value')
const popupGameoverBestTime = document.querySelector('.popup-gameover-time .record')
const popupGameoverKills = document.querySelector('.popup-gameover-kills .value')
const popupGameoverBestKills = document.querySelector('.popup-gameover-kills .record')
const popupWinner = document.querySelector('.popup-winner')
const popupWinnerRestart = document.querySelector('.popup-winner-resume')
const popupWinnerMenu = document.querySelector('.popup-winner-quit')
const popupWinnerWinner = document.querySelector('.popup-winner-winner .value')
const home = document.querySelector('.home')
const homeSingleplayer = document.querySelector('.home-mode-1')
const homeMultiplayer = document.querySelector('.home-mode-2')
const optionsSelectMode = document.querySelector('.options-select-mode')
const optionsSingleplayer = document.querySelector('.options-singleplayer')
const optionsMultiplayer = document.querySelector('.options-multiplayer')
const startGameSingleplayer = document.querySelector('.start-game-singleplayer')
const startGameMultiplayer = document.querySelector('.start-game-multiplayer')
const knightPreviewS = document.querySelector('.options-s-imageknight img')
const skeletonPreviewS = document.querySelector('.options-s-imageskeleton img')
const knightPreviewM1 = document.querySelector('.options-m-imageknight1 img')
const skeletonPreviewM1 = document.querySelector('.options-m-imageskeleton1 img')
const knightPreviewM2 = document.querySelector('.options-m-imageknight2 img')
const skeletonPreviewM2 = document.querySelector('.options-m-imageskeleton2 img')
const knightTextS = document.querySelector('.options-s-textknight')
const skeletonTextS = document.querySelector('.options-s-textskeleton')

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvasb.width = window.innerWidth
    canvasb.height = 2 * window.innerHeight
}
resizeCanvas()

const isEmpty = (object) => {
    for (var key in object) {
        if (object.hasOwnProperty(key))
            return false;
    }
    return true;
}

function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
    if (arguments.length === 2) {
        x = y = 0
        w = ctx.canvas.width
        h = ctx.canvas.height
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ?
        offsetX :
        0.5
    offsetY = typeof offsetY === "number" ?
        offsetY :
        0.5

    // keep bounds [0.0, 1.0]
    if (offsetX < 0)
        offsetX = 0
    if (offsetY < 0)
        offsetY = 0
    if (offsetX > 1)
        offsetX = 1
    if (offsetY > 1)
        offsetY = 1

    let iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r, // new prop. width
        nh = ih * r, // new prop. height
        cx,
        cy,
        cw,
        ch,
        ar = 1

    // decide which gap to fill
    if (nw < w)
        ar = w / nw
    if (Math.abs(ar - 1) < 1e-14 && nh < h)
        ar = h / nh // updated
    nw *= ar
    nh *= ar

    // calc source rectangle
    cw = iw / (nw / w)
    ch = ih / (nh / h)

    cx = (iw - cw) * offsetX
    cy = (ih - ch) * offsetY

    // make sure source rectangle is valid
    if (cx < 0)
        cx = 0
    if (cy < 0)
        cy = 0
    if (cw > iw)
        cw = iw
    if (ch > ih)
        ch = ih

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h)
}

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const canvasBackground = new Image()
const spritesheetKnight = new Image()
const spritesheetSkeleton = new Image()
const spritesheetEnemy = new Image()
const spritesheetTiles = new Image()
const bulletRed = new Image()
const bulletBlue = new Image()
const heartImage = new Image()

canvasBackground.src = './images/background.png'
spritesheetKnight.src = './images/spritesheetKnight.png'
spritesheetSkeleton.src = './images/spritesheetSkeleton.png'
spritesheetEnemy.src = './images/spritesheetEnemy.png'
spritesheetTiles.src = './images/spritesheetTiles.png'
bulletRed.src = './images/bulletred.png'
bulletBlue.src = './images/bulletblue.png'
heartImage.src = './images/heart.png'

let mouse = {
    x: 0,
    y: 0
}

const spritesheetData = [{
    spritesheet: spritesheetKnight,
    width: 832,
    height: 640,
    rows: 10,
    columns: 13,
    box: 64
}, {
    spritesheet: spritesheetSkeleton,
    width: 832,
    height: 640,
    rows: 10,
    columns: 13,
    box: 64
}]

const enemiesChoices = [{
        column: 0,
        row: 0,
        maxFrame: 3,
    },
    {
        column: 3,
        row: 0,
        maxFrame: 3,
    },
    {
        column: 6,
        row: 0,
        maxFrame: 3,
    },
    {
        column: 9,
        row: 0,
        maxFrame: 3,
    },
    {
        column: 0,
        row: 2,
        maxFrame: 3,
    },
    {
        column: 3,
        row: 2,
        maxFrame: 3,
    },
    {
        column: 6,
        row: 2,
        maxFrame: 6,
    },
]

const platforms = {
    leftGround: {
        srcx: 87,
        srcy: 0,
        width: 87,
        height: 87
    },
    middleGround: {
        srcx: 2 * 87,
        srcy: 0,
        width: 87,
        height: 87
    },
    rightGround: {
        srcx: 3 * 87,
        srcy: 0,
        width: 87,
        height: 87
    },
    leftCeiling: {
        srcx: 0,
        srcy: 2 * 87,
        width: 87,
        height: 87
    },
    middleCeiling: {
        srcx: 87,
        srcy: 2 * 87,
        width: 87,
        height: 87
    },
    rightCeiling: {
        srcx: 2 * 87,
        srcy: 2 * 87,
        width: 87,
        height: 87
    },
    leftTopCorner: {
        srcx: 0,
        srcy: 7 * 87,
        width: 87,
        height: 87 * 3
    },
    leftTopCornerNext: {
        srcx: 87,
        srcy: 7 * 87,
        width: 87,
        height: 87
    },
    rightTopCorner: {
        srcx: 4 * 87,
        srcy: 7 * 87,
        width: 87,
        height: 87 * 3
    },
    rightTopCornerNext: {
        srcx: 3 * 87,
        srcy: 7 * 87,
        width: 87,
        height: 87
    },
    leftPlatform: {
        srcx: 0,
        srcy: 4 * 87,
        width: 87,
        height: 87
    },
    leftPlatform2: {
        srcx: 0,
        srcy: 6 * 87,
        width: 87,
        height: 87
    },
    leftTopPlatform: {
        srcx: 0,
        srcy: 3 * 87,
        width: 87,
        height: 87
    },
    rightTopPlatform: {
        srcx: 87,
        srcy: 3 * 87,
        width: 87,
        height: 87
    },
    middlePlatform: {
        srcx: 87,
        srcy: 4 * 87,
        width: 87,
        height: 87
    },
    rightPlatform: {
        srcx: 2 * 87,
        srcy: 4 * 87,
        width: 87,
        height: 87
    },
    rightPlatform2: {
        srcx: 87,
        srcy: 6 * 87,
        width: 87,
        height: 87
    }
}

let tilesSetupLeft = [],
    tilesSetupMiddle = [],
    tilesSetupRight = [],
    heartsplayer1 = [],
    heartsplayer2 = [],
    tiles = [],
    enemies = [],
    players = [],
    particles = [],
    bullets = [],
    paused = true,
    playing = false,
    multiplayer = undefined,
    player1 = undefined,
    player2 = undefined,
    start = true,
    gameOver = false
frameCount = 0,
    time = 0,
    enemyRate = 100

const reset = () => {
    playing = false
    paused = true
    tilesSetupLeft = []
    tilesSetupMiddle = []
    tilesSetupRight = []
    heartsplayer1 = []
    heartsplayer2 = []
    tiles = []
    particles = []
    bullets = []
    enemies = []
    players = []
    player1 = undefined
    player2 = undefined
    mutliplayer = undefined
    start = true
    gameOver = false
    frameCount = 0
    time = 0
    enemyRate = 100
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const switchPannel = () => {
    canvas.classList.toggle('active-canvas-game')
    canvasb.classList.toggle('active-canvas-background')
    home.classList.toggle('active-home')
}

const setup = () => {
    tilesSetupLeft = [{
        data: platforms.leftGround,
        column: -1,
        row: 0,
        side: 'left'
    }, {
        data: platforms.middleGround,
        column: 0,
        row: 0,
        side: 'left'
    }, {
        data: platforms.leftTopCorner,
        column: 0,
        side: 'left'
    }, {
        data: platforms.leftTopCornerNext,
        column: 1,
        side: 'left'
    }, {
        data: platforms.rightCeiling,
        column: 2,
        side: 'left'
    }, {
        data: platforms.middleGround,
        column: 1,
        row: 0,
        side: 'left'
    }, {
        data: platforms.middleGround,
        column: 2,
        row: 0,
        side: 'left'
    }, {
        data: platforms.middleGround,
        column: 3,
        row: 0,
        side: 'left'
    }, {
        data: platforms.rightGround,
        column: 4,
        row: 0,
        side: 'left'
    }, {
        data: platforms.leftPlatform,
        column: -1,
        row: 1.7,
        side: 'left'
    }, {
        data: platforms.middlePlatform,
        column: 0,
        row: 1.7,
        side: 'left'
    }, {
        data: platforms.middlePlatform,
        column: 1,
        row: 1.7,
        side: 'left'
    }, {
        data: platforms.rightPlatform,
        column: 2,
        row: 1.7,
        side: 'left'
    }]

    tilesSetupRight = [{
        data: platforms.rightGround,
        column: -1,
        row: 0,
        side: 'right'
    }, {
        data: platforms.middleGround,
        column: 0,
        row: 0,
        side: 'right'
    }, {
        data: platforms.rightTopCorner,
        column: 0,
        side: 'right'
    }, {
        data: platforms.rightTopCornerNext,
        column: 1,
        side: 'right'
    }, {
        data: platforms.leftCeiling,
        column: 2,
        side: 'right'
    }, {
        data: platforms.middleGround,
        column: 1,
        row: 0,
        side: 'right'
    }, {
        data: platforms.middleGround,
        column: 2,
        row: 0,
        side: 'right'
    }, {
        data: platforms.middleGround,
        column: 3,
        row: 0,
        side: 'right'
    }, {
        data: platforms.leftGround,
        column: 4,
        row: 0,
        side: 'right'
    }, {
        data: platforms.rightPlatform,
        column: -1,
        row: 1.7,
        side: 'right'
    }, {
        data: platforms.middlePlatform,
        column: 0,
        row: 1.7,
        side: 'right'
    }, {
        data: platforms.middlePlatform,
        column: 1,
        row: 1.7,
        side: 'right'
    }, {
        data: platforms.leftPlatform,
        column: 2,
        row: 1.7,
        side: 'right'
    }]

    tilesSetupMiddle = [{
        data: platforms.leftPlatform,
        column: -1,
        row: 1.3,
        side: 'middle'
    }, {
        data: platforms.middlePlatform,
        column: 0,
        row: 1.3,
        side: 'middle'
    }, {
        data: platforms.rightPlatform,
        column: 1,
        row: 1.3,
        side: 'middle'
    }, {
        data: platforms.leftPlatform2,
        column: -3,
        row: 2.9,
        side: 'middle'
    }, {
        data: platforms.rightPlatform2,
        column: -2,
        row: 2.9,
        side: 'middle'
    }, {
        data: platforms.leftPlatform2,
        column: 2,
        row: 2.9,
        side: 'middle'
    }, {
        data: platforms.rightPlatform2,
        column: 3,
        row: 2.9,
        side: 'middle'
    }, {
        data: platforms.leftTopPlatform,
        column: -0.5,
        row: 4.5,
        side: 'middle'
    }, {
        data: platforms.rightTopPlatform,
        column: 0.5,
        row: 4.5,
        side: 'middle'
    }]
    if (multiplayer) {
        const char1 = new Player(spritesheetData[player1], {
            x: canvas.width / 2 - 2.9 * 87,
            y: 50
        }, 1)
        players.push(char1)
        for (let i = 0; i < 3; i++) {
            const heart = new Heart(players[0], 0.08 + 0.02 * i)
            heartsplayer1.push(heart)
        }
        const char2 = new Player(spritesheetData[player2], {
            x: canvas.width / 2 + 2.1 * 87,
            y: 50
        }, 2)
        players.push(char2)
        for (let i = 0; i < 3; i++) {
            const heart = new Heart(players[1], 0.08 + 0.02 * i)
            heartsplayer2.push(heart)
        }
    } else if (!multiplayer) {
        const char = new Player(spritesheetData[player1], {
            x: canvas.width / 2 - spritesheetData[player1].box / 2,
            y: 50
        }, 1)
        players.push(char)
        for (let i = 0; i < 3; i++) {
            const heart = new Heart(players[0], 0.08 + 0.02 * i)
            heartsplayer1.push(heart)
        }
    }

    for (let i = 0; i < tilesSetupLeft.length; i++) {
        const obj = tilesSetupLeft[i]
        if (obj.hasOwnProperty('row')) {
            const tile = new Tile(obj.data, obj.column, obj.row, obj.side)
            tiles.push(tile)
        } else {
            const tile = new Tile(obj.data, obj.column, undefined, obj.side)
            tiles.push(tile)
        }
    }

    for (let i = 0; i < tilesSetupMiddle.length; i++) {
        const obj = tilesSetupMiddle[i]
        if (obj.hasOwnProperty('row')) {
            const tile = new Tile(obj.data, obj.column, obj.row, obj.side)
            tiles.push(tile)
        } else {
            const tile = new Tile(obj.data, obj.column, undefined, obj.side)
            tiles.push(tile)
        }
    }

    for (let i = 0; i < tilesSetupRight.length; i++) {
        const obj = tilesSetupRight[i]
        if (obj.hasOwnProperty('row')) {
            const tile = new Tile(obj.data, obj.column, obj.row, obj.side)
            tiles.push(tile)
        } else {
            const tile = new Tile(obj.data, obj.column, undefined, obj.side)
            tiles.push(tile)
        }
    }
    paused = true
    playing = true
    updateCanvas()
}