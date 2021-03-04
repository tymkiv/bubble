import Particle from './Particle';

export default class Circle {
  constructor(props = {}) {
    this.x      = props.x      || 100;
    this.y      = props.y      || 100;
    this.radius = props.radius || 100;
    this.count  = props.count  || 20;

    this.mouse = props.mouse;
    this.particles = [];
    
    for (let i = 0; i < this.count; i += 1) {
      this.particles.push( new Particle({
        x: (this.x + this.radius * Math.cos(2 * Math.PI * i / this.count)),
        y: (this.y + this.radius * Math.sin(2 * Math.PI * i / this.count)),
        mouse: this.mouse,
        index: i
      }));
    }
  }

  draw(ctx) {
    this.ctx = ctx;
    this.particles.forEach(p => { p.move(); this.drawSingleBall(p.x, p.y) })
  }

  drawSingleBall(x, y, radius = 10) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'tomato';
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }
}