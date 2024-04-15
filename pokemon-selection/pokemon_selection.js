/*
 * pokemon_selection.js
 *
 *
 * A p5.js script that lets you choose between
 * the three original starter Pokemon in the 
 * the Kanto region: Bulbasaur, Squirtle, and 
 * Charmander. Clicking on oen of the three circles
 * will switch the screen to one of these starters
 * with the corresponding text: 
 * "I CHOOSE YOU, {starter_pokemon_name}!"
 *
 * Author: Levester Williams
 * Date: 14 April 2024
 *
 *
 */


let circleCenters = [110, 300, 490];
let circleY = 165;
let circleRadius = 15;
let images = [];
let bgImage;
let selectedIndex = -1;
let pulsateAmounts = [0, 0, 0];
let confetti = [];
let popConfetti = false;

function preload() {
  bgImage = loadImage('assets/three_pokeballs.png');
  images[0] = loadImage('assets/bulbasaur.png');
  images[1] = loadImage('assets/squirtle.png');
  images[2] = loadImage('assets/charmander.png');
}

function setup() {
  createCanvas(600, 300);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  stroke(0);
  strokeWeight(2);
}

function draw() {
  if (selectedIndex === -1) {
    background(bgImage);
    for (let i = 0; i < circleCenters.length; i++) {
      // Reset pulsate amount for each circle
      if (dist(mouseX, mouseY, circleCenters[i], circleY) < circleRadius) {
        // Update only the hovered circle's pulsate amount
        pulsateAmounts[i] = 5 * sin(frameCount * 0.05); 
      } else {
        pulsateAmounts[i] = 0; // Keep static if not hovered
      }
      ellipse(circleCenters[i], circleY, circleRadius * 2 + pulsateAmounts[i]);
    }
  } else {
    background(255);
    background(images[selectedIndex]);
    fill(255, 255, 0);
    stroke(0);
    strokeWeight(3);
    updateConfetti();
    switch (selectedIndex) {
      case 0:
        text("I CHOOSE YOU, BULBASAUR!", width / 2, height - 50);
        break;
      case 1:
        text("I CHOOSE YOU, SQUIRTLE!", width / 2, height - 50);
        break;
      case 2:
        text("I CHOOSE YOU, CHARMANDER!", width / 2, height - 50);
        break;
    }
  }
}

function mousePressed() {
  if(!popConfetti){
      for (let i = 0; i < circleCenters.length; i++) {
        if (dist(mouseX, mouseY, circleCenters[i], circleY) <= circleRadius) {
          selectedIndex = i;
        if(!popConfetti){
          triggerConfetti();
          popConfetti = true;
        } 
        break;
      }
    } 
  }
}

function triggerConfetti() {
  for (let i = 0; i < 100; i++) {
    confetti.push(new ConfettiParticle(width / 2, height / 2));
  }
}

function updateConfetti() {
  for (let i = confetti.length - 1; i >= 0; i--) {
    confetti[i].update();
    confetti[i].display();
    if (confetti[i].isFinished()) {
      confetti.splice(i, 1);
    }
  }
}

class ConfettiParticle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 6));
    this.acc = createVector(0, 0.05);
    this.lifespan = 255;
    this.size = random(3, 8);
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 4;
  }

  display() {
    noStroke();
    fill(this.color, this.lifespan);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  isFinished() {
    return this.lifespan < 0;
  }
}
