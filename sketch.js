let walls = [];
let ray;
let sceneW;
let sceneH;

function setup() {
  createCanvas(1200, 600);
  sceneW = width / 2;
  sceneH = height;
  for (let i = 0; i < 6; i++){
    let x1 = random(sceneW);
    let x2 = random(sceneH);
    let y1 = random(sceneW);
    let y2 = random(sceneH);
    walls[i] = new Wall(x1, x2, y1, y2);
  }
  walls.push(new Wall(0, 0, sceneW, 0));
  walls.push(new Wall(sceneW, 0, sceneW, sceneH));
  walls.push(new Wall(sceneW, sceneH, 0, sceneH));
  walls.push(new Wall(0, sceneH, 0, 0));
  particle = new Particle();
  particle.rotate(0);
}

function draw() {
  background(0);

  if (keyIsDown(LEFT_ARROW)) {
    particle.rotate(-3);
  } else if (keyIsDown(RIGHT_ARROW)) {
    particle.rotate(3);
  } else if (keyIsDown(UP_ARROW)) {
    particle.update(1);
  } else if (keyIsDown(DOWN_ARROW)) {
    particle.update(-1);
  }

  for (wall of walls) {
    wall.show();
  }
  particle.show();
  const scene = particle.look(walls);
  const w = sceneW / scene.length;
  push();
  translate(sceneW, 0);
  for (let i = 0; i < scene.length; i++){
    const h = map(scene[i], 0, sceneW, sceneH, 0)
    noStroke();
    const sq = scene[i] * scene[i];
    const wSq = sceneW * sceneW;
    const brightness = map(sq, 0, wSq, 200, 0);
    fill(brightness);
    rectMode(CENTER);
    rect(i * w + w/2, sceneH / 2, w+1, h);
  }
  pop();
}

