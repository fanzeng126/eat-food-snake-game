enum Direction {
  top="top",
  left="left",
  right="right",
  bottom="bottom"
}

class Snake {
  // 蛇的集合
  public collection: NodeListOf<HTMLElement>
  // 🐍头
  public domHead: HTMLElement
  // 🐍尾巴
  public domTail: HTMLElement
  // 单位距离
  public unitLength: number
  // 加速度
  public speedA: number
  // 运行方向
  private _direction: Direction

  constructor ({ unitLength, speedA, direction }: { unitLength: number; speedA: number, direction: Direction }) {
    this.collection = document.querySelectorAll('.snake')
    this.domHead = this.collection.item(0)
    this.domTail = this.collection.item(this.collection.length - 1)
    this.unitLength = unitLength
    this.speedA = speedA
    this._direction = direction
  }

  get X (): number {
    // 🐍头
    return this.domHead.offsetLeft
  }

  get Y (): number {
    // 🐍头
    return this.domHead.offsetTop
  }

  get UnitSpeed (): number {
    return this.unitLength * this.speedA
  }

  // 获取当前运行的方向
  get direction (): Direction {
    return this._direction
  }

  // 改变方向
  set direction (value: Direction) {
    this._direction = value
  }

  move (): void {
    let nextX: number
    let nextY: number
    let previousX: number
    let previousY: number
    this.collection.forEach((v: HTMLElement, k: number) => {
      const tempX = previousX
      const tempY = previousY
      previousX = v.offsetLeft
      previousY = v.offsetTop
      if (k === 0) {
        // 🐍头移动的位置
        if (this.direction === Direction.left) {
          nextX = this.X + this.UnitSpeed * -1
          v.style.left = `${nextX}px`
        } else if (this.direction === Direction.right) {
          nextX = this.X + this.UnitSpeed * 1
          v.style.left = `${nextX}px`
        } else if (this.direction === Direction.top) {
          nextY = this.Y + this.UnitSpeed * -1
          v.style.top = `${nextY}px`
        } else {
          nextY = this.Y + this.UnitSpeed * 1
          v.style.top = `${nextY}px`
        }
      } else {
        v.style.left = `${tempX}px`
        v.style.top = `${tempY}px`
      }
    })
  }

  // 🐍吃掉小虫子然后成长的方法
  grow () {
    // 画布
    const plane: HTMLElement = document.querySelector('.plane')

    const snakeTail = document.createElement('div')
    snakeTail.classList.add('snake')
    snakeTail.classList.add('body')
    
    // 蛇尾的坐标
    let tailX: number = this.domTail.offsetLeft
    let tailY: number = this.domTail.offsetTop


    // 🐍头移动的方向判断蛇尾的添加的坐标
    if (this.direction === Direction.left) {
      tailX += 10
    } else if (this.direction === Direction.right) {
      tailX -= 10
    } else if (this.direction === Direction.top) {
      tailY += 10
    } else {
      tailY -= 10
    }
    snakeTail.style.left = `${tailX}px`
    snakeTail.style.top = `${tailY}px`
    plane.appendChild(snakeTail)

    // 重新更新一次蛇的集合和蛇尾
    this.collection = document.querySelectorAll('.snake')
    this.domTail = this.collection.item(this.collection.length - 1)
  }

  // 检查碰撞
}

// const snake = new Snake({ unitLength: 10, speedA: 1, direction: Direction.right })

// const timer = setInterval(() => {
//   snake.move()
// }, 500)

// setTimeout(() => {
//   snake.grow()
//   snake.direction = Direction.bottom
//   // clearInterval(timer)
//   // setTimeout(() => {
//   //   snake.move()
//   // }, 500)
// }, 5000)


// setTimeout(() => {
//   snake.direction = Direction.bottom
// }, 10000)

// setTimeout(() => {
//   snake.direction = Direction.top
// }, 15000)

