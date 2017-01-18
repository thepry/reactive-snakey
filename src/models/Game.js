import Snake from './Snake'

export default class Game {
  constructor(size = 15) {
    this.moveCallback = this.moveCallback.bind(this);
    this.size = size;
    this.reset()
  }

  reset() {
    this.direction = "down";
    this.newDirection = "down";
    this.snake = new Snake;
    this.apple = undefined;

    this.intervalTime = 500;
    this.resetInterval();
  }

  moveCallback() {
    this.move();
  }

  resetInterval() {
    clearInterval(this.interval)
    this.interval = setInterval(this.moveCallback, this.intervalTime)
  }

  hasSnake(rowId, cellId) {
    return this.snake.onCell(rowId, cellId)
  }

  hasApple(rowId, cellId) {
    return this.apple && this.apple[0] === rowId && this.apple[1] === cellId;
  }

  getRows() {
    return Array(this.size).fill().map( (_, index) => { return { id: index, size: this.size } });
  }

  move() {
    this.direction = this.newDirection;
    const keepTail = this._checkAppleTail()
    const snakeHead = this.snake.head()
    let row = snakeHead[0] + this._verticalChange()
    let cell = snakeHead[1] + this._horizontalChange()

    row = this._correctCoordinate(row)
    cell = this._correctCoordinate(cell)

    this.snake.move(row, cell);
    if (keepTail) { this.growSnake() }
    this._generateApple();
    if (this.snake.hitItself()){ this.reset() }
  }

  setDirection(direction) {
    if (this._checkDirection(direction)) {
      this.newDirection = direction;
    };
  }

  growSnake() {
    this.snake.grow(...this.apple);
    this.apple = undefined;
    this.increaseSpeed();
  }

  increaseSpeed() {
    this.intervalTime = this.intervalTime * 0.90;
    this.resetInterval();
  }

  _checkAppleTail() {
    if(!this.apple) { return false }
    const tail = this.snake.tail();
    return tail[0] === this.apple[0] && tail[1] === this.apple[1]
  }

  _generateApple() {
    if (this.apple) { return }
    let row = getRandomInt(0, this.size)
    let cell = getRandomInt(0, this.size)
    if (this.hasSnake(row, cell)) {
      this._generateApple();
    } else {
     this.apple = [row, cell]
    }
  }

  _checkDirection(direction) {
    const leftRight = ["left", "right"]
    const upDown = ["up", "down"]
    let wrong = leftRight.includes(direction) && leftRight.includes(this.direction)
    wrong = wrong || upDown.includes(direction) && upDown.includes(this.direction)

    return !wrong;
  }

  _correctCoordinate(coordinate) {
    if (coordinate < 0) {
      return this.size - 1
    } else if (coordinate >= this.size){
      return 0;
    } else {
      return coordinate;
    }
  }

  _verticalChange() {
    switch(this.direction){
      case "up":
        return -1
      case "down":
        return 1
      default:
       return 0
    }
  }

  _horizontalChange() {
     switch(this.direction){
      case "right":
        return 1
      case "left":
        return -1
      default:
       return 0
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

