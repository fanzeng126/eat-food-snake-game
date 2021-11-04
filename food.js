class Food {
    constructor() {
        this.dom = document.querySelector('.food');
    }
    get X() {
        return this.dom.offsetLeft;
    }
    get Y() {
        return this.dom.offsetTop;
    }
    refreshPosition() {
        const nextX = Math.floor(Math.random() * 400 / 10) * 10;
        const nextY = Math.floor(Math.random() * 500 / 10) * 10;
        this.dom.style.left = `${nextX}px`;
        this.dom.style.top = `${nextY}px`;
    }
}
