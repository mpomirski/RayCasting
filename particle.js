class Particle {
    constructor() {
        this.pos = createVector(sceneW/2, sceneH/2);
        this.rays = [];
        this.offset = 0;
        this.closest = null;
        for (let i = 0; i < 15; i += 0.2){
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 8);
        for (ray of this.rays){
            ray.show();
        }
    }

    rotate(angle) {
        this.offset += angle;
        for (let i = 0; i < this.rays.length; i += 1){
            this.rays[i].setAngle(radians(i + this.offset));
        }
    }
    
    look(walls) {
        const scene = [];
        for (let i = 0; i < this.rays.length; i++){
            const ray = this.rays[i]
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    let d = p5.Vector.dist(this.pos, pt);
                    const a = ray.dir.heading() - radians(this.offset);
                    d *= Math.cos(a);
                    if (d < record) {
                        record = d;
                        this.closest = pt;
                    }
                }    
            }
            if (this.closest) {
                line(this.pos.x, this.pos.y, this.closest.x, this.closest.y);
                scene[i] = record;
            }
            scene[i] = record;
        }
        return scene;
    }

    update(speed) {
        if (!(Math.abs(this.pos.x - this.closest.x) < 3 || Math.abs(this.pos.y - this.closest.y) < 3)) {
            this.pos.x += speed * Math.cos(radians(this.offset + this.rays.length / 2));
            this.pos.y += speed * Math.sin(radians(this.offset + this.rays.length / 2));
        }
    }
}