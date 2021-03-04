export default class Particle {
  constructor(props = {}) {
    this.originalX = props.x;
    this.originalY = props.y;

    this.x = this.originalX;
    this.y = this.originalY;

    this.index = props.index;
    this.mouse = props.mouse;
    
    this.friction = 0.2;
    this.gravity = 0.1;
    this.radius = 100;

    this.vx = 0;
    this.vy = 0;
  }

  move() {
    const dx = this.x - this.mouse.x;
    const dy = this.y - this.mouse.y;
    const d = Math.sqrt(dx**2 + dy**2);
    
    const normalX = dx / d;
    const normalY = dy / d;

    const oDistX = this.originalX - this.x;
    const oDistY = this.originalY - this.y;

    // if (this.index === 0) console.log(oDistX);

    if (d < this.radius) {
      const angle = Math.atan2(dy,dx);
      const tx = this.mouse.x + Math.cos(angle) * this.radius;
      const ty = this.mouse.y + Math.sin(angle) * this.radius;
    
      this.vx += tx - this.x;
      this.vy += ty - this.y;
    }
    // go back
    this.vx += oDistX * this.gravity;
    this.vy += oDistY * this.gravity;

    // friction
    this.vx *= 1 - this.friction;
    this.vy *= 1 - this.friction;

    this.x += this.vx;
    this.y += this.vy;
    
    

    // this.x += normalX;
    // this.y += normalY;

    

    // this.x += this.speed / 10 * this.oDistX;
    // this.y += this.speed / 10 * this.oDistY;

    // // reaction on mouse
    // this.x -= this.normalX * this.s;
    // this.y -= this.normalY * this.s;
  }
}