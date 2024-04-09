/*
 * pollock_fibonaccit_drip_painting.js
 *
 *
 * A p5.js script that mimics expressionist painting by
 * (i) enlarging the circles through an implementation
 * of the Fibonacci sequence; (ii) allowing the user
 * to toggle between colors through one mouse click;
 * and (iii) allowing the user to toggle between two
 * brush sizes. (Mobile version)
 *
 * Author: Levester Williams
 * Date: 5 April 2024
 *
 *
 */

let a = 0;
let b = 1;
let growing = false; // Track if the sequence is currently growing
let clickCount = 0; // Count the number of clicks
let halfSizeToggle = false; // Whether to use half the size limit

let colorIndex = 0; // Index to keep track of the current color

let colors = [
  [56, 34, 95], // Dark blue
  [217, 54, 33], // Bright red
  [255, 195, 0], // Yellow
  [33, 97, 140], // Cerulean
  [108, 193, 49], // Green
  [255, 255, 255] // White
];

function setup() {
  createCanvas(350, 200);
  background(210, 180, 140);
  frameRate(120); 
  noFill();
}

function draw() {
  noStroke();
  if (mouseIsPressed && !growing) {
    a = 0;
    b = 1; // Reset Fibonacci sequence
    growing = true; // Start growing the sequence
  } else if (!mouseIsPressed) {
    growing = false; // Stop the sequence growth
  }

  if (growing) {
    drawFibonacciFromMouse();
  }
}

function drawFibonacciFromMouse() {
  let sum = a + b;
  a = b;
  b = sum;

  // Set the diameter to the current Fibonacci number
  let diameter = sum;

  fill(colors[colorIndex][0], colors[colorIndex][1], colors[colorIndex][2]);
  
  // Ensure the sequence starts at the mouse and grows outward
  ellipse(mouseX, mouseY, diameter, diameter);

  // Adjust the limit based on toggle state
  let sizeLimit = halfSizeToggle ? (width / 200) : (width / 100);

  // Limit the growth
  if (diameter > sizeLimit) {
    a = 0;
    b = 1; // Reset for next growth cycle
  }
}

function mousePressed() {
  growing = true;
  colorIndex = (colorIndex + 1) % colors.length; // Cycle through the colors
  clickCount++; // Increment click counter

  // Toggle size limit every second click
  if (clickCount % 2 === 0) {
    halfSizeToggle = !halfSizeToggle;
  }
}

function mouseReleased() {
  growing = false; // Stop growing the sequence when the mouse is released
}
