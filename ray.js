class Ray {
  constructor(pos, angle){
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
  }
  
  show(){
    stroke(255, 255, 255, 70);
    push();
    translate(this.pos.x, this.pos.y);
    // line(0, 0, 25 * this.dir.x, 25 * this.dir.y);
    pop();
  }

  update(x, y) {
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }
  
  setAngle(angle) {
    this.dir = p5.Vector.fromAngle(angle);
  }
  
  cast(wall){
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator == 0) {
      return;
    }
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;
    if (t > 0 && t < 1 && u > 0) {
      const pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return false;
    }
  }
}