var Direction;
(function (Direction) {
    Direction["top"] = "top";
    Direction["left"] = "left";
    Direction["right"] = "right";
    Direction["bottom"] = "bottom";
})(Direction || (Direction = {}));
class Snake {
    constructor({ unitLength, speedA, direction }) {
        this.collection = document.querySelectorAll('.snake');
        this.domHead = this.collection.item(0);
        this.domTail = this.collection.item(this.collection.length - 1);
        this.unitLength = unitLength;
        this.speedA = speedA;
        this._direction = direction;
    }
    get X() {
        // 🐍头
        return this.domHead.offsetLeft;
    }
    get Y() {
        // 🐍头
        return this.domHead.offsetTop;
    }
    get UnitSpeed() {
        return this.unitLength * this.speedA;
    }
    // 获取当前运行的方向
    get direction() {
        return this._direction;
    }
    // 改变方向
    set direction(value) {
        // 如果方向相反，则设置操作无效果
        if ((value === Direction.top || value === Direction.bottom) && this.direction === Direction.bottom) {
            console.log('操作异常');
        }
        else if ((value === Direction.bottom || value === Direction.top) && this.direction === Direction.top) {
            console.log('操作异常');
        }
        else if ((value === Direction.left || value === Direction.right) && this.direction === Direction.right) {
            console.log('操作异常');
        }
        else if ((value === Direction.right || value === Direction.left) && this.direction === Direction.left) {
            console.log('操作异常');
        }
        else {
            this._direction = value;
        }
    }
    move() {
        let nextX;
        let nextY;
        let previousX;
        let previousY;
        this.collection.forEach((v, k) => {
            const tempX = previousX;
            const tempY = previousY;
            previousX = v.offsetLeft;
            previousY = v.offsetTop;
            if (k === 0) {
                // 🐍头移动的位置
                if (this.direction === Direction.left) {
                    nextX = this.X + this.UnitSpeed * -1;
                    v.style.left = `${nextX}px`;
                }
                else if (this.direction === Direction.right) {
                    nextX = this.X + this.UnitSpeed * 1;
                    v.style.left = `${nextX}px`;
                }
                else if (this.direction === Direction.top) {
                    nextY = this.Y + this.UnitSpeed * -1;
                    v.style.top = `${nextY}px`;
                }
                else {
                    nextY = this.Y + this.UnitSpeed * 1;
                    v.style.top = `${nextY}px`;
                }
            }
            else {
                v.style.left = `${tempX}px`;
                v.style.top = `${tempY}px`;
            }
        });
    }
    // 🐍吃掉小虫子然后成长的方法
    grow() {
        // 画布
        const plane = document.querySelector('.plane');
        const snakeTail = document.createElement('div');
        snakeTail.classList.add('snake');
        snakeTail.classList.add('body');
        // 蛇尾的坐标
        let tailX = this.domTail.offsetLeft;
        let tailY = this.domTail.offsetTop;
        // 🐍头移动的方向判断蛇尾的添加的坐标
        if (this.direction === Direction.left) {
            tailX += 10;
        }
        else if (this.direction === Direction.right) {
            tailX -= 10;
        }
        else if (this.direction === Direction.top) {
            tailY += 10;
        }
        else {
            tailY -= 10;
        }
        snakeTail.style.left = `${tailX}px`;
        snakeTail.style.top = `${tailY}px`;
        plane.appendChild(snakeTail);
        // 重新更新一次蛇的集合和蛇尾
        this.collection = document.querySelectorAll('.snake');
        this.domTail = this.collection.item(this.collection.length - 1);
    }
}
