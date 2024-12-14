
//--- actions ---

const ACTION_PRESS= (event, game) => translation_key_nD(event, game);
const ACTION_CLICK= (event, game) => collision_by_front(event, game);
const ACTION_DRAG= (event, game) => translation_drag_nD(event, game);
const ACTION_WHEEL= (event, game) => translation_wheel_nD(event, game);
const PERSPECTIVE_INIT= (grid) => {
  perspective_init_nD(grid);
  translation_init_nD(grid);
};
const PERSPECTIVE_DRAW= (grid) => {
  perspective_draw_nD(grid);
  translation_draw_nD(grid);
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
  ACTION_DRAG(event, game);
}

function mouseWheel(event) {
  console.log("mouseWheel event: ",event);
  ACTION_WHEEL(event, game);
}

function keyPressed(event) {
  //console.log("keyDown event: ",event);
  ACTION_PRESS(event, game);
};


//--- draw ---
var game;
var grid;
function setup() {
  //theme
  ColorPalet.switch("default");
  ColorPalet.switch("dark_mode");

  //init
  createCanvas(...Scale.resize());
  background(ColorPalet.get("theme_background"));
  textFont('Courier New'); // Good font
  frameRate(Settings.FPS);
  describe('ttt');


  //objects
  grid = new Grid(Settings.RULE_BOX_WIDTH, Settings.RULE_BOX_D);
  let players=[];
  for (let playerIndex=0;playerIndex<Settings.PLAYERS;playerIndex++)
  {
    players.push(new Player(false, playerIndex));
  }
  game = new Game(grid, players);

  PERSPECTIVE_INIT(grid);
}

function draw() {
  background(ColorPalet.get("theme_background"));

  {//texts
    //title
    fill(255);
    textSize(Scale.min(50));
    textAlign(LEFT,TOP);
    strokeWeight(0);
    textStyle(NORMAL);
    text(`4D Tick Tac Toe`, Scale.x(20), Scale.y(20));

    //perfs
    if (Settings.DEBUG)
    {
      fill(255,0,255);
      textSize(Scale.min(20));
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
      ${Math.round(grid.velocity["wx/"]*100)} roll Wx
      ${Math.round(grid.velocity["wy/"]*100)} roll Wy
      ${Math.round(grid.velocity["wz/"]*100)} roll Wz
      ${Math.round(grid.velocity["x<->"]*100)} to X
      ${Math.round(grid.velocity["y<->"]*100)} to Y
      ${Math.round(grid.velocity["z<->"]*100)} to Z
      ${Math.round(grid.velocity["w<->"]*100)} to W

      that it.`, Scale.x(980), Scale.y(20));
    }
    
    //scores
    fill(ColorPalet.get("theme_text"));
    textSize(Scale.min(50));
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text(`scores`, Scale.x(50), Scale.y(400));
    textSize(Scale.min(100));
    for (let playerIndex=0;playerIndex<game.players.length;playerIndex++)
    {
      fill(ColorPalet.get(`player_${playerIndex+1}_${(game.players[playerIndex].score) ? "ligth" : "dark"}`));
      text(`${game.players[playerIndex].score}`, Scale.x(50+50*playerIndex), Scale.y(500));
    }

    //turn
    if (game.remain>0)
    {
      
      fill(ColorPalet.get(`player_${game.player_i+1}_text`));
      textSize(Scale.min(50));
      text(`à ton tour`, Scale.x(40), Scale.y(700));
      fill(ColorPalet.get("theme_text"));
      textSize(Scale.min(25));
      text(`reste ${game.remain}`, Scale.x(50), Scale.y(750));
    } else {
      if (game.winer_i===-1)
      {
        fill(ColorPalet.get("theme_text"));
        textSize(Scale.min(100));
        text(`égalitée`, Scale.x(40), Scale.y(700));
      } else {
        fill(ColorPalet.get(`player_${game.winer_i+1}_text`));
        textSize(Scale.min(100));
        text(`a gagné`, Scale.x(40), Scale.y(700));
      }
    }
  }
  PERSPECTIVE_DRAW(grid);
}