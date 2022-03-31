let stars = [];
let astros = [];
let maxStars = 200;
let astroSpeed = 1;

function setup() {
  let cnv = createCanvas((w = window.innerWidth), (h = window.innerHeight));
  p5.DisableFriendlyErrors = true;
  cnv.parent("bg-sketch");
  colorMode(HSB);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);
  strokeWeight(0);

  if (stars.length < maxStars) stars.push(new Star());

  if (people.length != 0 && astros.length < people.length) {
    for (let i = 0; i < people.length; i++) {
      astros[i] = new Astro(people[i].name);
    }
  }

  for (var i = 0; i < stars.length; i++) {
    stars[i].show();
    stars[i].update();
    if (stars[i].x < 0) stars[i].x = w;
    if (stars[i].x > w) stars[i].x = 0;
    if (stars[i].y < 0) stars[i].y = h;
    if (stars[i].y > h) stars[i].y = 0;
  }

  for (var i = 0; i < astros.length; i++) {
    astros[i].show();
    astros[i].update();
    if (astros[i].x < 0) astros[i].x = w;
    if (astros[i].x > w) astros[i].x = 0;
    if (astros[i].y < 0) astros[i].y = h;
    if (astros[i].y > h) astros[i].y = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Astro {
  constructor(_name) {
    this.pos = createVector(random(w), random(h));
    this.vel = createVector(random(-astroSpeed, astroSpeed), random(-astroSpeed, astroSpeed));
    this.name = _name;
  }

  update() {
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
    this.pos.add(this.vel);

    if (this.pos.x > w || this.pos.x < 0) {
      this.vel.x *= -1;
    }
    if (this.pos.y > h || this.pos.y < 0) {
      this.vel.y *= -1;
    }

    let mousedistance = dist(this.pos.x, this.pos.y, mouseX, mouseY);
    let mouse = createVector(mouseX, mouseY);
    let difference = p5.Vector.sub(mouse, this.pos);
    difference.setMag(1);

    if (mousedistance < 100) {
      this.pos.sub(difference);
    }
  }

  show() {
    fill(255);
    stroke(0);
    textSize(32);
    strokeWeight(2);
    text("👩‍🚀", this.pos.x, this.pos.y);

    textSize(20);
    text(this.name, this.pos.x, this.pos.y + 35);
  }
}

class Star {
  constructor() {
    this.x = random(w);
    this.y = random(h);
    this.speed = random(1, 10);
    this.life = 0;
    this.angle = random(TWO_PI);
    this.size = random(1, 5);
    this.offset = random(200);
  }

  update() {
    this.life += 1;
    this.x += (cos(this.angle) * this.speed) / 30;
    this.y += (sin(this.angle) * this.speed) / 30;
  }

  show() {
    stroke(2 * this.life);
    strokeWeight(this.size * abs(cos(this.offset + frameCount / 100)));
    point(this.x, this.y);
  }
}
