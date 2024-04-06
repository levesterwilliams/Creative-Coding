let flowers = [
  { x: 150, y: 150, maxSize: 60, sizeIncrement: 1.5, petalWidth: 20, centerRadius: 20, petalSizes: [] },
  { x: 300, y: 150, maxSize: 40, sizeIncrement: 0.9, petalWidth: 16, centerRadius: 16, petalSizes: [] },
  { x: 225, y: 300, maxSize: 60, sizeIncrement: 1.2, petalWidth: 24, centerRadius: 24, petalSizes: [] }
];
let petals = 8;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  // Initialize all petal sizes for each flower
  flowers.forEach(flower => {
    for (let i = 0; i < petals; i++) {
      flower.petalSizes[i] = 10; // Starting size of petals
    }
  });
}

function draw() {
  background(255);
  
  flowers.forEach(flower => {
    drawFlower(flower);
  });
}

function drawFlower(flower) {
  push();
  translate(flower.x, flower.y);

  // Check if mouse is over this flower's center
  let d = dist(mouseX, mouseY, flower.x, flower.y);
  let mouseOverCenter = d < flower.centerRadius;

  // Draw each petal
  for (let i = 0; i < petals; i++) {
    push();
    rotate(i * (360 / petals));
    let currentSize = flower.petalSizes[i];
    fill(255); // White
    stroke(255, 0, 0); // Red stroke
    strokeWeight(1);
    ellipse(0, currentSize / 2 + 15, flower.petalWidth, currentSize);
    pop();

    // Grow petals if mouse is over the center
    if (mouseOverCenter && currentSize < flower.maxSize) {
      flower.petalSizes[i] += flower.sizeIncrement;
    } else if (!mouseOverCenter && currentSize > 10) {
      // Optionally make petals shrink if the mouse moves away
      flower.petalSizes[i] -= flower.sizeIncrement;
    }
  }

  // Draw the flower's center
  fill(255, 204, 0);
  noStroke();
  ellipse(0, 0, flower.centerRadius * 2, flower.centerRadius * 2);
  
  pop();
}
