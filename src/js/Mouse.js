export default class Mouse {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = 0;
    this.y = 0;

    this.canvas.addEventListener('mousemove', this.move.bind(this));
  }

  move(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.x = (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width;
    this.y = (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height;
  }
}