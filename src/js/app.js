import Mouse from './Mouse';
import Ball from './Ball';

class Baller {
  constructor(container) {
    this.container = container;

    this.init();

    this.balls = [];

    for (let i = 0; i < 10; i += 1) {
      this.balls.push(new Ball({
        ctx: this.ctx,
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: 200,
        containerWidth: this.width,
        containerHeight: this.height
      }));
    }
    // this.ball1 = new Ball({
     
    // })
    // this.ball2 = new Ball({
    //   ctx: this.ctx,
    //   x: this.width / 2 + 10,
    //   y: this.height / 2 + 10,
    //   radius: 200,
    //   containerWidth: this.width,
    //   containerHeight: this.height
    // })
    // this.ball3 = new Ball({
    //   ctx: this.ctx,
    //   x: this.width / 2 + 10,
    //   y: this.height / 2 + 10,
    //   radius: 200,
    //   containerWidth: this.width,
    //   containerHeight: this.height
    // })

    window.requestAnimationFrame(this.raf.bind(this));
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.updateSize();

    this.mouse = new Mouse(this.canvas);
    this.container.appendChild(this.canvas);

    window.addEventListener('resize', this.onResize.bind(this));
  }

  updateSize() {
    this.width = this.container.clientWidth * window.devicePixelRatio;
    this.height = this.container.clientHeight * window.devicePixelRatio;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.canvas.style.width = `${this.container.clientWidth}px`;
    this.canvas.style.height = `${this.container.clientHeight}px`;
  }

  // drawBall(x, y, radius = 10) {
  //   this.ctx.save();
  //   this.ctx.beginPath();
  //   this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
  //   this.ctx.fillStyle = 'green';
  //   this.ctx.fill();
  //   this.ctx.closePath();
  //   this.ctx.restore();
  // }

  onResize() {
    this.updateSize();
    this.balls.forEach((ball, index) => {
      ball.resize({
        containerWidth: this.width,
        containerHeight: this.height
      });
    })
  }

  raf() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    // this.drawBall(this.mouse.x, this.mouse.y, 100);
    // this.circle.draw(this.ctx)

    this.balls.forEach((ball, index) => {
      ball.move([...this.balls.filter((b, i) => i  !== index)]);
      ball.draw();
    })

    // this.ball1.move([this.ball2, this.ball3, this.mouse]);
    // this.ball1.draw();

    // this.ball2.move([this.ball1, this.ball3]);
    // this.ball2.draw();

    // this.ball3.move([this.ball1, this.ball2]);
    // this.ball3.draw();

    window.requestAnimationFrame(this.raf.bind(this));
  }
}




const baller = new Baller(document.getElementById('container'));


