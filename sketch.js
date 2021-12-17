let inc = 0.1;
let scale = 10;
let cols, rows;
let r = 10;
let g = 10;
let b = 10;
let colorChange = 5;

let zoff = 0;

let fr;

let particles = [];

let flowfield;

function setup() {
  pixelDensity(1);
  createCanvas(800, 600);
  background(255);
  cols = floor(width / scale);
  rows = floor(height / scale);
  fr = createP();

  flowfield = new Array(cols * rows);

  for (let i = 0; i < 2500; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let vector = p5.Vector.fromAngle(angle);
      vector.setMag(0.5);
      flowfield[index] = vector;
      xoff += inc;
      // stroke(0, 50);
      // push();
      // translate(x * scale, y * scale);
      // rotate(vector.heading());
      // strokeWeight(1);
      // line(0, 0, scale, 0);
      // pop();
    }
    yoff += inc;

    zoff += 0.0005;
  }

  let rW = floor(random(6));
  if (rW === 0 && r > 0) {
    r -= colorChange;
  } else if (rW === 1 && r < 255) {
    r += colorChange;
  } else if (rW === 2 && g > 0) {
    g -= colorChange;
  } else if (rW === 3 && g < 255) {
    g += colorChange;
  } else if (rW === 4 && b > 0) {
    b -= colorChange;
  } else if (rW === 5 && b < 255) {
    b += colorChange;
  }
  stroke(r, g, b, 7);

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  fr.html(floor(frameRate()));
}
