const defaultRow = 2;
const defaultCell = 1;

export default class Snake {
  constructor() {
    this.body = [
        [defaultRow, defaultCell],
        [defaultRow, defaultCell + 1],
        [defaultRow, defaultCell + 2]
      ]
  }

  head() {
    return this.body[0];
  }

  tail() {
    return this.body[this.body.length - 1]
  }

  move(rowId, cellId) {
    this.body.unshift([rowId, cellId])
    this.body.pop()
  }

  grow(rowId, cellId) {
    this.body.push([rowId, cellId])
  }

  onCell(rowId, cellId, body = this.body) {
    return Boolean(body.find((elem) => { return elem[0] === rowId && elem[1] === cellId }))
  }

  hitItself() {
    const head = this.head();

    return this.onCell(head[0], head[1], this.body.slice(1))
  }
}
