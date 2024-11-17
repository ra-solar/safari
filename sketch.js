let carImage;
let backgroundImage;
let animalImages = [];
let carX, carY;
let carSpeed = 5;
let angle = 0;
let showingAnimal = false;
let animalStartTime;
let currentAnimalImage;
let bgMusic; // Variable to hold the background music
let gameStarted = false; // Flag to track if the game has started

function preload() {
  // Load and resize the car image
  carImage = loadImage('images/toyota.png', function() {
    carImage.resize(carImage.width / 20, 0);
  });
  backgroundImage = loadImage('images/forest.png');

  // Load animal images
  for (let i = 1; i <= 28; i++) {
    // Format the number with leading zeros
    let number = String(i).padStart(2, '0');
    let img = loadImage(`images/animals/animal-${number}.png`);
    animalImages.push(img);
  }

  // Load the background music
  bgMusic = loadSound('music/forest.mp3'); // Ensure the file path and extension are correct
}

function setup() {
  createCanvas(1500, 800);
  carX = width / 2;
  carY = height / 2;
}

function draw() {
  if (!gameStarted) {
    // Display the start screen
    background(0); // Black background
    fill(255); // White text
    textAlign(CENTER, CENTER);
    textSize(32);
    text('Click to Start the Game', width / 2, height / 2);
  } else if (showingAnimal) {
    // Display the animal image fullscreen
    image(currentAnimalImage, 0, 0, width, height);

    // Check if 2 seconds have passed
    if (millis() - animalStartTime >= 2000) {
      showingAnimal = false; // Return to the game
    }
  } else {
    // Display the background image
    image(backgroundImage, 0, 0, width, height);

    // Move the car and update the angle based on arrow keys
    if (keyIsDown(LEFT_ARROW)) {
      carX -= carSpeed;
      angle = PI; // Rotate 180 degrees
    }
    if (keyIsDown(RIGHT_ARROW)) {
      carX += carSpeed;
      angle = 0; // No rotation
    }
    if (keyIsDown(UP_ARROW)) {
      carY -= carSpeed;
      angle = -HALF_PI; // Rotate -90 degrees (up)
    }
    if (keyIsDown(DOWN_ARROW)) {
      carY += carSpeed;
      angle = HALF_PI; // Rotate 90 degrees (down)
    }

    // Keep the car within the canvas boundaries
    carX = constrain(carX, 0, width);
    carY = constrain(carY, 0, height);

    // Display the car image with rotation
    push();
    translate(carX, carY);
    rotate(angle);
    imageMode(CENTER);
    image(carImage, 0, 0);
    pop();
  }
}

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;

    // Start the background music
    if (!bgMusic.isPlaying()) {
      bgMusic.loop();
    }
  }
}

function keyPressed() {
  if (keyCode === 32 && !showingAnimal) { // 32 is the keycode for the space bar
    // Pick a random animal image
    currentAnimalImage = random(animalImages);
    // Set the flag to show the animal image
    showingAnimal = true;
    // Record the start time
    animalStartTime = millis();
  }
}
