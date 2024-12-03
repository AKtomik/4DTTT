

//--- settings ---
let circleX = 200;
let circleY = 150;
let circleRadius = 75;

let graphX = 50;
let graphY = 300;
let graphAmplitude = 50;
let graphPeriod = 300;

function setup() {
  createCanvas(...SIZE);
  background(0);
  //ellipseMode(CORNERS);
  angleMode(DEGREES);//!
  textFont('Courier New'); // Good font
  //frameRate(Settings.FPS);
  describe('ttt');
}


//--- resize ---
var SIZE = [window.innerWidth, window.innerHeight];
var DIAG = Math.pow((Math.pow(SIZE[0],2)+Math.pow(SIZE[1],2)),1/2);

window.onresize = function() {
  // assigns new values for width and height variables
  SIZE = [window.innerWidth, window.innerHeight];
  DIAG = Math.pow((Math.pow(SIZE[0],2)+Math.pow(SIZE[1],2)),1/2);
  console.log("TTT : resize : ",SIZE,DIAG);
  resizeCanvas(...SIZE);
}

function scale_x(number)
{
  return number*SIZE[0]/400;
}

function scale_y(number)
{
  return number*SIZE[1]/400;
}

function scale_xy(number)
{
  return number*DIAG/400;
}


//--- draw ---

function draw() {
  background(0);

  // Set angle based on frameCount, and display current value

  let angle = frameCount % 360;

  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);
  text(`angle: ${angle}`, 25, 25);

  // Draw circle and diameters

  noFill();
  stroke(128);
  strokeWeight(3);
  //circle(scale_x(circleX), scale_y(circleY), 2 * scale_x(circleRadius));
  line(scale_x(circleX), scale_y(circleY) - scale_x(circleRadius), scale_x(circleX), scale_y(circleY) + scale_x(circleRadius));
  line(scale_x(circleX) - scale_x(circleRadius), scale_y(circleY), scale_x(circleX) + scale_x(circleRadius), scale_y(circleY));

  // Draw moving points

  let pointX = scale_x(circleX) + scale_x(circleRadius) * cos(angle);
  let pointY = scale_y(circleY) - scale_x(circleRadius) * sin(angle);

  line(scale_x(circleX), scale_y(circleY), pointX, pointY);

  noStroke();

  fill('white');
  circle(pointX, pointY, 10);

  fill('orange');
  circle(pointX, scale_y(circleY), 10);

  fill('red');
  circle(scale_x(circleX), pointY, 10);

  // Draw graph

  stroke('grey');
  strokeWeight(3);
  line(scale_x(graphX), scale_y(graphY), scale_x(graphX) + 300, scale_y(graphY));
  line(scale_x(graphX), scale_y(graphY) - scale_y(graphAmplitude), scale_x(graphX), scale_y(graphY) + scale_y(graphAmplitude));
  line(
    scale_x(graphX) + scale_x(graphPeriod),
    scale_y(graphY) - scale_y(graphAmplitude),
    scale_x(graphX) + scale_x(graphPeriod),
    scale_y(graphY) + scale_y(graphAmplitude)
  );

  fill('grey');
  strokeWeight(1);
  textAlign(CENTER, CENTER);
  text('0', scale_x(graphX), scale_y(graphY) + scale_y(graphAmplitude) + 20);
  text('360', scale_x(graphX) + scale_x(graphPeriod), scale_y(graphY) + scale_y(graphAmplitude) + 20);
  text('1', scale_x(graphX) / 2, scale_y(graphY) - scale_y(graphAmplitude));
  text('0', scale_x(graphX) / 2, scale_y(graphY));
  text('-1', scale_x(graphX) / 2, scale_y(graphY) + scale_y(graphAmplitude));

  fill('orange');
  text('cos', scale_x(graphX) + scale_x(graphPeriod) + scale_x(graphX) / 2, scale_y(graphY) - scale_y(graphAmplitude));
  fill('red');
  text('sin', scale_x(graphX) + scale_x(graphPeriod) + scale_x(graphX) / 2, scale_y(graphY));

  // Draw cosine curve

  noFill();
  stroke('orange');
  beginShape();
  for (let t = 0; t <= 360; t++) {
    let x = map(t, 0, 360, scale_x(graphX), scale_x(graphX) + scale_x(graphPeriod));
    let y = scale_y(graphY) - scale_y(graphAmplitude) * cos(t);
    vertex(x, y);
  }
  endShape();

  // Draw sine curve

  noFill();
  stroke('red');
  beginShape();
  for (let t = 0; t <= 360; t++) {
    let x = map(t, 0, 360, scale_x(graphX), scale_x(graphX) + scale_x(graphPeriod));
    let y = scale_y(graphY) - scale_y(graphAmplitude) * sin(t);
    vertex(x, y);
  }
  endShape();

  // Draw moving line

  let lineX = map(angle, 0, 360, scale_x(graphX), scale_x(graphX) + scale_x(graphPeriod));
  stroke('grey');
  line(lineX, scale_y(graphY) - scale_y(graphAmplitude), lineX, scale_y(graphY) + scale_y(graphAmplitude));

  // Draw moving points on graph

  let orangeY = scale_y(graphY) - scale_y(graphAmplitude) * cos(angle);
  let redY = scale_y(graphY) - scale_y(graphAmplitude) * sin(angle);

  noStroke();

  fill('orange');
  circle(lineX, orangeY, 10);

  fill('red');
  circle(lineX, redY, 10);
}