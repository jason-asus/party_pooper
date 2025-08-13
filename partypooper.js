const backround = document.getElementById("backround");
const ctx = backround.getContext("2d");
// gameover
let gameover = false;

//score
//
let score = 0;
ctx.font = "50px Arial"; // Font style and size
ctx.fillStyle = "white"; // Text color

// 3. Draw the text
ctx.fillText(`${score}`, backround.width / 2 - 25, 50);
//  canvas
backround.width = window.innerWidth - 10;
backround.height = window.innerHeight - 10;

let textStayFrame = 0;

//pin
let pin = {
  x: backround.width / 2,
  y: backround.height / 2,
  size: 10,
};
//balloon
let balloonz = [];
//balloon spawning

for (let i = 0; i < 999; i++) {
  setTimeout(() => {
    balloonz.push({
      x: Math.random() * (backround.width - 30),
      y: 0,
      size: 30,
      vl: 2,
      rgb: {
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255,
      },
    });
  }, i * 2000); // Delay increases with each iteration
}
//
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, backround.width, backround.height);

  // write text
  if (textStayFrame > 0) {
    ctx.fillText("mom:stop you party pooper  ", 100, backround.height - 50);
    textStayFrame--;
  }

  //balloon //

  for (let balloon of balloonz) {
    if (gameover == false) {
      balloon.y += balloon.vl;
      ctx.fillStyle = `rgb(${balloon.rgb.r},${balloon.rgb.g},${balloon.rgb.b})`;
      ctx.fillRect(balloon.x, balloon.y, balloon.size, balloon.size);
      //   pin
      ctx.fillStyle = "grey"; // Set color
      ctx.fillRect(pin.x, pin.y, pin.size, pin.size);
    }
    //score
    ctx.font = "50px Arial"; // Font style and size
    ctx.fillStyle = "white"; // Text color

    // 3. Draw the text
    ctx.fillText(`${score}`, backround.width / 2 - 25, 50);
    // balloon pop
    if (
      Math.abs(balloon.x - pin.x) < balloon.size &&
      Math.abs(balloon.y - pin.y) < 30
    ) {
      console.log("Good Job XD");
      let index = balloonz.indexOf(balloon);
      balloonz.splice(index, 1);
      score++;

      ctx.font = "50px Arial"; // Font style and size
      ctx.fillStyle = "white"; // Text color

      //3. Draw the text
      textStayFrame = 50;
    }

    //gameover
    if (balloon.y > backround.height) {
      gameover = true;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, backround.width, backround.height);
      ctx.font = "50px Arial"; // Font style and size
      ctx.fillStyle = "white"; // Text color

      //3. Draw the text
      ctx.fillText(
        "GAME OVER  ",
        backround.width / 2 - 225,
        backround.height / 2 - 50
      );
      ctx.font = "50px Arial"; // Font style and size
      ctx.fillStyle = "white"; // Text color

      //3. Draw the text
      ctx.fillText(
        "mom:ha you can't crash my sons party kid    ",
        100,
        backround.height - 50
      );
    }
  }

  //
  requestAnimationFrame(gameLoop);
}
// Start the game
gameLoop();

// pin controlls
if (
  pin.x < backround.width &&
  pin.x > 0 &&
  pin.y < backround.height &&
  pin.y > 0
) {
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowUp":
        console.log("Up arrow pressed");
        pin.y -= 20;

        break;
      case "ArrowDown":
        console.log("Down arrow pressed");
        pin.y += 20;

        break;
      case "ArrowLeft":
        console.log("Left arrow pressed");
        pin.x -= 20;

        break;
      case "ArrowRight":
        console.log("Right arrow pressed");
        pin.x += 20;
        break;
    }
  });
}
