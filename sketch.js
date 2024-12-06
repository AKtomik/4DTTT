
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