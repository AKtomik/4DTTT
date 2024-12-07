
//--- settings ---

const ACTION_PRESS=(event, game) => translation_cube_key(event, game);
const ACTION_CLICK=(event, game) => collision_by_front(event, game);
const PERSPECTIVE_INIT=(grid) => perspective_init_3D_cube(grid);
const PERSPECTIVE_DRAW=(grid) => perspective_draw_3D_cube(grid);


//--- click ---
function mousePressed(event) {
  console.log("mousePressed event: ",event);
  //boxs_clicked
  ACTION_CLICK(event, game);
}

function keyPressed(event) {
  console.log("keyPressed event: ",event);
  //cube_translate
  ACTION_PRESS(event, game);
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

  PERSPECTIVE_INIT(grid);
  //test
  let m = new Matrix(4,4);
  m.build_identity();
  m.set_column(3, ['x','y','z','s']);
  console.log(String(m));
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

  PERSPECTIVE_DRAW(grid);
}