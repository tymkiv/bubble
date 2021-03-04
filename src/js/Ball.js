export default class Ball {
  constructor(props = {}) {
    this.ctx = props.ctx;
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.radius = props.radius || 100;

    this.containerWidth = props.containerWidth;
    this.containerHeight = props.containerHeight;
    
    this.originalX = this.x;
    this.originalY = this.y;

    this.color = `rgb(${
      Math.floor(Math.random()*256)},${
      Math.floor(Math.random()*256)},${
      Math.floor(Math.random()*256)})`;

    this.vx = 0;
    this.vy = 0;

    this.springFactor = 0.01;
    this.friction = 0.1;
  }

  move(targets) {
    const top = {
      y: 0,
      power: 2,
    };
    const left = {
      x: 0,
    };
    const right = {
      x: this.containerWidth,
    };
    [...targets, top, right, left].forEach(otarget => {
      const target = {};
      target.x = otarget.x !== undefined ? otarget.x : this.x;
      target.y = otarget.y !== undefined ? otarget.y : this.y;


      const dx = this.x - (target.x) + Math.random()/2;
      const dy = this.y - (target.y) + Math.random()/2;
      
      const dist = Math.sqrt(dx*dx + dy*dy) ;

      // interaction
      if(dist<this.radius*2.5){
          const angle = Math.atan2(dy,dx);
          const tx = target.x + Math.cos(angle) * this.radius*2.5;
          const ty = target.y + Math.sin(angle) * this.radius*2.5;

          this.vx += (tx - this.x) * 3;
          this.vy += (ty - this.y) * 3;

      }

      // spring back
      const dx1 = -(this.x - this.originalX);
      const dy1 = -(this.y - this.originalY);

      

      
      // friction
      this.vx *= this.friction;
      this.vy *= this.friction;

      // actual move
      this.x += this.vx;
      this.y += this.vy;

      // this.x += dx1 * this.springFactor;
      // this.y += dy1 * this.springFactor;
      // this.y -= 0.5;
    });


    // const dx = this.x - mouse.x;
    // const dy = this.y - mouse.y;
    
    // const dist = Math.sqrt(dx*dx + dy*dy);

    // // interaction
    // if(dist<this.radius * 2){
    //     const angle = Math.atan2(dy,dx);
    //     const tx = mouse.x + Math.cos(angle) * this.radius * 2;
    //     const ty = mouse.y + Math.sin(angle) * this.radius * 2;

    //     this.vx += tx - this.x;
    //     this.vy += ty - this.y;
    // }

    // // spring back
    // const dx1 = -(this.x - this.originalX);
    // const dy1 = -(this.y - this.originalY);

    // // this.vx += dx1 * this.springFactor;
    // // this.vy += dy1 * this.springFactor;

    
    // // friction
    // this.vx *= this.friction;
    // this.vy *= this.friction;

    // // actual move
    // this.x += this.vx;
    // this.y += this.vy;
  }

  resize(props) {
    this.containerWidth = props.containerWidth;
    this.containerHeight = props.containerHeight;
  }

  draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }
}