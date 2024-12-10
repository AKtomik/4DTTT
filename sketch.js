
//--- actions ---

const ACTION_PRESS= (event, game) => translation_key_3D_cube(event, game);
const ACTION_CLICK= (event, game) => collision_by_front(event, game);
const ACTION_DRAG= (event, game) => translation_drag_3D_cube(event, game);
const PERSPECTIVE_INIT= (grid) => {
  translation_init_3D_cube(grid);
  perspective_init_3D_cube(grid);
};
const PERSPECTIVE_DRAW= (grid) => {
  translation_draw_3D_cube(grid);
  perspective_draw_3D_cube(grid);
};


//--- click ---
let draging = false;
function mouseClicked(event) {//like released
  if (draging)
  {
    draging=false;
    return;
  }
  //console.log("mouseClicked event: ",event);
  //boxs_clicked
  ACTION_CLICK(event, game);
}

function mouseDragged(event) {
  draging=true;
  //console.log("mouseDragged event: ",event);
  //boxs_clicked
  ACTION_DRAG(event, game);
}

//window.addEventListener("keydown", (event) => {})
function keyPressed(event) {
  //console.log("keyDown event: ",event);
  //cube_translate
  ACTION_PRESS(event, game);
};


//--- draw ---
var game;
var grid;
var player_1;
var player_2;
function setup() {
  //init
  createCanvas(...Scale.resize());
  background(color(Settings.COLOR_BACKGROUND));
  textFont('Courier New'); // Good font
  frameRate(Settings.FPS);
  describe('ttt');

  //objects
  grid = new Grid(Settings.RULE_BOX_WIDTH, Settings.RULE_BOX_D);
  player_1 = new Player(false, color(Settings.COLOR_BOX_P1_FILL), color(Settings.COLOR_BOX_P1_WON));
  player_2 = new Player(true, color(Settings.COLOR_BOX_P2_FILL), color(Settings.COLOR_BOX_P2_WON));
  game = new Game(grid, [player_1, player_2]);

  PERSPECTIVE_INIT(grid);
}

function draw() {
  background(color(Settings.COLOR_BACKGROUND));

  {//texts
    //title
    fill(255);
    textSize(20);
    textAlign(LEFT,TOP);
    strokeWeight(0);
    textStyle(NORMAL);
    text(`4D Tick Tac Toe`, Scale.x(20), Scale.y(20));

    //perfs
    if (Settings.DEBUG)
    {
      fill(255,0,255);
      textSize(20);
      textAlign(RIGHT,TOP);
      strokeWeight(0);
      textStyle(BOLD);
      text(`
      perfs :
      ${Math.round(1000/(deltaTime))} fps


      speed :
      ${Math.round(grid.velocity["x/"]*100)} roll X
      ${Math.round(grid.velocity["y/"]*100)} roll Y
      ${Math.round(grid.velocity["z/"]*100)} roll Z
      ${Math.round(grid.velocity["x<->"]*100)} to X
      ${Math.round(grid.velocity["y<->"]*100)} to Y
      ${Math.round(grid.velocity["z<->"]*100)} to Z

      that it.`, Scale.x(980), Scale.y(20));
    }
    
    //scores
    fill(0);
    textSize(40);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(`scores`, Scale.x(100), Scale.y(400));
    textSize(60);
    fill((player_1.score) ? player_1.color_won : player_1.color_fill);
    text(`${player_1.score}`, Scale.x(100), Scale.y(500));
    fill((player_2.score) ? player_2.color_won : player_2.color_fill);
    text(`${player_2.score}`, Scale.x(100), Scale.y(600));

    //turn
    fill(game.players[game.player_i].color_won);
    textSize(40);
    text(`à ton tour`, Scale.x(100), Scale.y(800));
  }

  PERSPECTIVE_DRAW(grid);
}