class Plane {
    constructor({ score = 0, level = 1 }) {
        this.scoreDom = document.querySelector('.num > span');
        this.levelDom = document.querySelector('.level > span');
        this.score = score;
        this.level = level;
    }
    addScore() {
        this.score += 20;
        const oldLevel = this.level;
        this.level = Math.ceil(this.score / 100);
        this.scoreDom.innerHTML = `${this.score}`;
        this.levelDom.innerHTML = `${this.level}`;
        return this.level === oldLevel;
    }
}
