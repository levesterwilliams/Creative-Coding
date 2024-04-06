/*
 *  initial_name_to_full_name_sliding.js
 *
 *  This program slides the initial of first name and last name 
 *  when mouse hovers over the initial. The initials "slide" to 
 *  the left to reveal full first name and last name. 
 *
 *  Author: Levester Williams
 *  Date: 5 April 2024
 *
 *  Note: Completed on Processing 4.3
 *  This file can be embbed in webpages
 *  when index.html is included
 *
 */

let firstNameInitial = "L";
let lastNameInitial = "W";
let firstName = "Levester";
let lastName = "Williams";
let yPos; // Position of the texts
let maxWidth, textHeight; // Width and height of the largest text
let firstNameProgress = 0; // Transition progress for the first name
let lastNameProgress = 0; // Transition progress for the last name

function setup() {
  createCanvas(180, 76);
  textAlign(LEFT, CENTER);
  textSize(32);
  yPos = height / 2 - 24; // Starting position of the first name
  background(255);
  
  // Calculate the size of the largest possible text
  maxWidth = max(textWidth(firstName), textWidth(lastName));
  textHeight = textAscent() + textDescent();
}

function draw() {
  background(255);
  
  // Update the progress based on the mouse position for both names
  updateProgress();
  
  // Calculate the x positions based on progress
  let currentFirstNameXPos = map(firstNameProgress, 0, 1, width / 2, width / 2 - maxWidth/2);
  let currentLastNameXPos = map(lastNameProgress, 0, 1, width / 2, width / 2 - maxWidth/2);
  
  // Use progress to determine how much of each full name to show
  let displayFirstName = firstName.substring(0, Math.min(firstName.length, 1 + Math.floor(firstNameProgress * (firstName.length - 1))));  // let displayLastName = lastName.substring(0, min(lastName.length(), 1 + int(lastNameProgress * (lastName.length() - 1))));
  let displayLastName = lastName.substring(0, Math.min(lastName.length, 1 +  Math.floor(lastNameProgress * (lastName.length - 1))));
  
  
  // Display the texts
  fill('#809df1');
  text(displayFirstName, currentFirstNameXPos, yPos);
  
  /*
  noFill(); // Ensure the rectangle is not filled
  stroke(255, 0, 0); // Set the stroke color to red for visibility
  rect(width / 2 - maxWidth / 2, yPos - textHeight / 2, maxWidth, textHeight);
  */
  
  text(displayLastName, currentLastNameXPos, yPos + 32); // Adjust as necessary for spacing
}

function updateProgress() {
  /*
  noFill(); // Ensure the rectangle is not filled
  stroke(255, 0, 0); // Set the stroke color to red for visibility
  // Rectangle for the first name
  rect(width / 2 - maxWidth / 2, yPos - textHeight / 2, maxWidth, textHeight);
  // Rectangle for the last name
  rect(width / 2 - maxWidth / 2, yPos  - textHeight / 2 + 64, maxWidth, textHeight);
  */
  console.log(mouseX, mouseY);
  // First name hover detection
  if (mouseX >= width / 2 - maxWidth / 2 && mouseX <= width / 2 + maxWidth / 2 &&
      mouseY >= yPos - textHeight / 2 && mouseY <= yPos + textHeight / 2) {
    firstNameProgress += 0.05;
  } else {
    firstNameProgress -= 0.05;
  }
  firstNameProgress = constrain(firstNameProgress, 0, 1);
  
  // Last name hover detection
 if (mouseX >= width / 2 - maxWidth / 2 && mouseX <= width / 2 + maxWidth / 2 &&
      mouseY >= yPos + 24 - textHeight / 2 && mouseY <= yPos + 72 + textHeight / 2) { // Adjust yPos for last name
    lastNameProgress += 0.05;
  } else {
    lastNameProgress -= 0.05;
  }
  lastNameProgress = constrain(lastNameProgress, 0, 1);
  
}
