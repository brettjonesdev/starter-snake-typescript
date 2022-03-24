import { InfoResponse, GameState, MoveResponse, Game } from "./types"

export function info(): InfoResponse {
    console.log("INFO")
    const response: InfoResponse = {
        apiversion: "1",
        author: "",
        color: "#888888",
        head: "default",
        tail: "default"
    }
    return response
}

export function start(gameState: GameState): void {
    console.log(`${gameState.game.id} START`)
}

export function end(gameState: GameState): void {
    console.log(`${gameState.game.id} END\n`)
}

function avoidWalls(possibleMoves, gameState) {
    const moves = {...possibleMoves}
    const boardWidth = gameState.board.width;
    const boardHeight = gameState.board.height;
    console.log(`width: ${boardWidth}, height: ${boardHeight}`)
    const head = gameState.you.head
    console.log(head)
    // console.log(gameState.board)
    // console.log(boardHeight)
    if (boardWidth - 1 === head.x) {
        moves.right = false;
    }
    if (head.x === 0) {
        moves.left = false;
    }
    if (head.y === 0) {
        moves.down = false;
    }
    if (boardHeight - 1 === head.y) {
        moves.up = false;
    }
    return moves;
}

function avoidSnakes(possibleMoves, gameState) {
    const head = gameState.you.head
    const moves = {...possibleMoves}
    // console.log(gameState.board.snakes[0].body)
    const snakes = gameState.board.snakes;
    snakes.forEach(snake => {
        const snakeBody = snake.body
        const up = { x: head.x, y: head.y + 1 }
        const down = { x: head.x, y: head.y - 1 }
        const right = { x: head.x + 1, y: head.y }
        const left = { x: head.x - 1, y: head.y }
        if (snakeBody.some(c => c.x === up.x && c.y === up.y)) {
            moves.up = false;
        }
        if (snakeBody.some(c => c.x === down.x && c.y === down.y)) {
            moves.down = false;
        }
        if (snakeBody.some(c => c.x === left.x && c.y === left.y)) {
            moves.left = false;
        }
        if (snakeBody.some(c => c.x === right.x && c.y === right.y)) {
            moves.right = false;
        }
    })

    return moves
}

function collisionAvoidance(possibleMoves, gameState) {
    const moves = avoidWalls(possibleMoves, gameState)
    return avoidSnakes(moves, gameState);
}

let lastDirectionMove = 'right';

export function move(gameState) {
    let possibleMoves = {
        up: true,
        down: true,
        left: true,
        right: true
    }

    // Step 0: Don't let your Battlesnake move back on its own neck
    const myHead = gameState.you.head
    const myNeck = gameState.you.body[1]
    if (myNeck.x < myHead.x) {
        possibleMoves.left = false
    } else if (myNeck.x > myHead.x) {
        possibleMoves.right = false
    } else if (myNeck.y < myHead.y) {
        possibleMoves.down = false
    } else if (myNeck.y > myHead.y) {
        possibleMoves.up = false
    }

    possibleMoves = collisionAvoidance(possibleMoves, gameState);


    // TODO: Step 2 - Don't hit yourself.
    // Use information in gameState to prevent your Battlesnake from colliding with itself.
    // const mybody = gameState.you.body

    // TODO: Step 3 - Don't collide with others.
    // Use information in gameState to prevent your Battlesnake from colliding with others.

    // TODO: Step 4 - Find food.
    // Use information in gameState to seek out and find food.

    // Finally, choose a move from the available safe moves.
    // TODO: Step 5 - Select a move to make based on strategy, rather than random.
    const safeMoves = Object.keys(possibleMoves).filter(key => possibleMoves[key])
    return pickMove(gameState, safeMoves);
}

function pickMove(gameState: GameState, safeMoves: String[]) {
    let move;
    if (safeMoves.some((move) => move === lastDirectionMove)) {
        move = lastDirectionMove;
    } else {
        move = safeMoves[Math.floor(Math.random() * safeMoves.length)];
    }

    const response = {
        move
    }

    console.log(`${gameState.game.id} MOVE ${gameState.turn}: ${response.move}`)
    return response;
}
