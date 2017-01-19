import Snake from './Snake'

const getRandomInt = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default class Game {
  constructor(size = 15) {
    this.moveCallback = this.moveCallback.bind(this);
    this.size = size;
    this.reset()
  }

  reset() {
    this.direction = 'left';
    this.newDirection = this.direction;
    this.snake = new Snake();
    this.apple = null;

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
    return Array(this.size).
      fill().
      map((elem, index) => {
        return { id: index, size: this.size }
      });
  }

  move() {
    this.direction = this.newDirection;
    const keepTail = this._checkAppleTail()
    const row = this.moveRow()
    const cell = this.moveCell()

    this.snake.move(row, cell);
    if (keepTail) { this.growSnake() }
    this._generateApple();
    if (this.snake.hitItself()) { this.reset() }
  }

  moveRow() {
    const snakeHead = this.snake.head();
    const row = snakeHead[0] + this._verticalChange();

    return this._correctCoordinate(row);
  }

  moveCell() {
    const snakeHead = this.snake.head();
    const cell = snakeHead[1] + this._horizontalChange();

    return this._correctCoordinate(cell)
  }

  setDirection(direction) {
    if (this._checkDirection(direction)) {
      this.newDirection = direction;
    }
  }

  growSnake() {
    this.snake.grow(...this.apple);
    this.apple = null;
    this.increaseSpeed();
  }

  increaseSpeed() {
    this.intervalTime = this.intervalTime * 0.90;
    this.resetInterval();
  }

  _checkAppleTail() {
    if (!this.apple) { return false }
    const tail = this.snake.tail();

    return tail[0] === this.apple[0] && tail[1] === this.apple[1]
  }

  _generateApple() {
    if (this.apple) { return }
    const row = getRandomInt(0, this.size)
    const cell = getRandomInt(0, this.size)
    if (this.hasSnake(row, cell)) {
      this._generateApple();
    } else {
     this.apple = [row, cell]
    }
  }

  _checkDirection(direction) {
    const leftRight = ['left', 'right']
    const upDown = ['up', 'down']
    let wrong = leftRight.includes(direction) && leftRight.includes(this.direction)
    wrong = wrong ? wrong : upDown.includes(direction) && upDown.includes(this.direction)

    return !wrong;
  }

  _correctCoordinate(coordinate) {
    if (coordinate < 0) {
      return this.size - 1
    } else if (coordinate >= this.size) {
      return 0;
    }

    return coordinate;
  }

  _verticalChange() {
    switch (this.direction) {
      case 'up':
        return -1
      case 'down':
        return 1
      default:
       return 0
    }
  }

  _horizontalChange() {
     switch (this.direction) {
      case 'right':
        return 1
      case 'left':
        return -1
      default:
       return 0
    }
  }
}
