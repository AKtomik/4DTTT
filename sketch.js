
//--- settings ---

const COLLISION_BY=(pointer_at, game) => collision_by_front(pointer_at, game);
const PERSPECTIVE_BY=(grid) => perspective_by_3D_flat(grid);


//--- click ---
function mousePressed(event) {
  
  const pointer_at=createVector(mouseX, mouseY);
  console.log("mousePressed event: ",event,pointer_at);

  //boxs_clicked
  COLLISION_BY(pointer_at, game);
}


//--- draw ---
var game;
var grid;
var player_1;
var player_2;
function setup() {
  //init
  createCanvas(...Scale.resize());
  background(color(Settings.COLOR_BACKGROUND));
  //ellipseMode(CORNERS);
  //angleMode(DEGREES);//!
  textFont('Courier New'); // Good font
  //frameRate(Settings.FPS);
  describe('ttt');

  //objects
  grid = new Grid(Settings.RULE_BOX_WIDTH, Settings.RULE_BOX_D);
  player_1 = new Player(false, color(Settings.COLOR_BOX_P1_FILL), color(Settings.COLOR_BOX_P1_WON));
  player_2 = new Player(true, color(Settings.COLOR_BOX_P2_FILL), color(Settings.COLOR_BOX_P2_WON));
  game = new Game(grid, [player_1, player_2]);
}

function draw() {
  background(color(Settings.COLOR_BACKGROUND));

  // Set angle based on frameCount, and display current value
  //let angle = frameCount % 360;

  {//texts
    fill(255);
    textSize(20);
    textAlign(LEFT, CENTER);
    strokeWeight(1);
    text(`4D Tick Tac Toe`, 25, 25);
    
    textSize(40);
    textAlign(CENTER, CENTER);
    text(`scores`, Scale.x(100), Scale.y(400));
    textSize(60);
    fill((player_1.score) ? player_1.color_won : player_1.color_fill);
    text(`${player_1.score}`, Scale.x(100), Scale.y(500));
    fill((player_2.score) ? player_2.color_won : player_2.color_fill);
    text(`${player_2.score}`, Scale.x(100), Scale.y(600));
  }

  PERSPECTIVE_BY(grid);
}
/*
  // Draw moving points

  let pointX = Scale.x(circleX) + Scale.x(circleRadius) * cos(angle);
  let pointY = Scale.y(circleY) - Scale.x(circleRadius) * sin(angle);

  line(Scale.x(circleX), Scale.y(circleY), pointX, pointY);

  noStroke();

  fill('white');
  circle(pointX, pointY, 10);

  fill('orange');
  circle(pointX, Scale.y(circleY), 10);

  fill('red');
  circle(Scale.x(circleX), pointY, 10);

  // Draw graph

  stroke('grey');
  strokeWeight(3);
  line(Scale.x(graphX), Scale.y(graphY), Scale.x(graphX) + 300, Scale.y(graphY));
  line(Scale.x(graphX), Scale.y(graphY) - Scale.y(graphAmplitude), Scale.x(graphX), Scale.y(graphY) + Scale.y(graphAmplitude));
  line(
    Scale.x(graphX) + Scale.x(graphPeriod),
    Scale.y(graphY) - Scale.y(graphAmplitude),
    Scale.x(graphX) + Scale.x(graphPeriod),
    Scale.y(graphY) + Scale.y(graphAmplitude)
  );

  fill('grey');
  strokeWeight(1);
  textAlign(CENTER, CENTER);
  text('0', Scale.x(graphX), Scale.y(graphY) + Scale.y(graphAmplitude) + 20);
  text('360', Scale.x(graphX) + Scale.x(graphPeriod), Scale.y(graphY) + Scale.y(graphAmplitude) + 20);
  text('1', Scale.x(graphX) / 2, Scale.y(graphY) - Scale.y(graphAmplitude));
  text('0', Scale.x(graphX) / 2, Scale.y(graphY));
  text('-1', Scale.x(graphX) / 2, Scale.y(graphY) + Scale.y(graphAmplitude));

  fill('orange');
  text('cos', Scale.x(graphX) + Scale.x(graphPeriod) + Scale.x(graphX) / 2, Scale.y(graphY) - Scale.y(graphAmplitude));
  fill('red');
  text('sin', Scale.x(graphX) + Scale.x(graphPeriod) + Scale.x(graphX) / 2, Scale.y(graphY));

  // Draw cosine curve

  noFill();
  stroke('orange');
  beginShape();
  for (let t = 0; t <= 360; t++) {
    let x = map(t, 0, 360, Scale.x(graphX), Scale.x(graphX) + Scale.x(graphPeriod));
    let y = Scale.y(graphY) - Scale.y(graphAmplitude) * cos(t);
    vertex(x, y);
  }
  endShape();

  // Draw sine curve

  noFill();
  stroke('red');
  beginShape();
  for (let t = 0; t <= 360; t++) {
    let x = map(t, 0, 360, Scale.x(graphX), Scale.x(graphX) + Scale.x(graphPeriod));
    let y = Scale.y(graphY) - Scale.y(graphAmplitude) * sin(t);
    vertex(x, y);
  }
  endShape();

  // Draw moving line

  let lineX = map(angle, 0, 360, Scale.x(graphX), Scale.x(graphX) + Scale.x(graphPeriod));
  stroke('grey');
  line(lineX, Scale.y(graphY) - Scale.y(graphAmplitude), lineX, Scale.y(graphY) + Scale.y(graphAmplitude));

  // Draw moving points on graph

  let orangeY = Scale.y(graphY) - Scale.y(graphAmplitude) * cos(angle);
  let redY = Scale.y(graphY) - Scale.y(graphAmplitude) * sin(angle);

  noStroke();

  fill('orange');
  circle(lineX, orangeY, 10);

  fill('red');
  circle(lineX, redY, 10);
*/