import { getInputDirection } from "./input.js"

//speed
export const SNAKE_SPEED = 5

//snake start body position 
const snakeBody = [{ x: 11, y: 11 }]

let newSegments = 0

//updating snake position
export function update() {
  addSegments()

  //direction by keyboard 
  const inputDirection = getInputDirection()
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }

  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y
}

//making and add the snake 
export function draw(gameBoard) {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = segment.y
    snakeElement.style.gridColumnStart = segment.x
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement)
  })
}

//body increase
export function expandSnake(amount) {
  newSegments += amount
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false
    return equalPositions(segment, position)
  })
}

//defied snake head
export function getSnakeHead() {
  return snakeBody[0]
}

//if snake hit with his body onSnake will be true
export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true })
}

//position checking
function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }

  newSegments = 0
}