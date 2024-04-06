let colors = ['#ADD8E6', '#87CEEB', '#87CEFA', '#00BFFF', '#1E90FF'];
let shapes = ['quadrilateral', 'circle', 'triangle', 'pentagon'];
let currentColorIndex = 0;
let currentShapeIndex = 0;
let clickCount = 0;
let lastClickTime = 0;
let clickDelay = 250; // Milliseconds allowed between clicks for a double click

function setup() {
  createCanvas(300, 300);
  background(220);
}

function drawShape(x, y) {
  fill(colors[currentColorIndex]);
  stroke('black');
  strokeWeight(3);

  switch (shapes[currentShapeIndex]) {
    case 'quadrilateral':
      quad(x - 20, y - 20, x + 20, y - 20, x + 20, y + 20, x - 20, y + 20);
      break;
    case 'circle':
      ellipse(x, y, 40, 40);
      break;
    case 'triangle':
      triangle(x, y - 20, x + 20, y + 20, x - 20, y + 20);
      break;
    case 'pentagon':
      let angleOffset = TWO_PI / 5;
      beginShape();
      for (let i = 0; i < 5; i++) {
        let sx = x + cos(angleOffset * i - HALF_PI) * 20;
        let sy = y + sin(angleOffset * i - HALF_PI) * 20;
        vertex(sx, sy);
      }
      endShape(CLOSE);
      break;
  }
}

function mousePressed() {
  let currentTime = millis();
  
  clickCount++;
  
  // Check if it's a double click (two clicks within the clickDelay time)
  if (clickCount === 2 && currentTime - lastClickTime <= clickDelay) {
    // Change shape
    currentShapeIndex = (currentShapeIndex + 1) % shapes.length;
    clickCount = 0; // Reset click count after a double click
  } else if (clickCount === 1 || currentTime - lastClickTime > clickDelay) {
    // Change color if it's a single click or clicks are too far apart
    if (clickCount > 1) {
      currentColorIndex = (currentColorIndex + 1) % colors.length;
    }
    clickCount = 1; // Reset to 1 to handle the case where clicks are too far apart
  }
  
  lastClickTime = currentTime; // Update the time of the last click
  
  // To prevent double action on double click, delay the color change until we're sure it's a single click
  setTimeout(() => {
    if (clickCount === 1) {
      currentColorIndex = (currentColorIndex + 1) % colors.length;
      clickCount = 0; // Reset click count after action
    }
  }, clickDelay);
}

function draw() {
  // Drawing is handled on mouse press
  if (mouseIsPressed) {
    drawShape(mouseX, mouseY);
  }
}
