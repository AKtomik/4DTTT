//--- click ---
let draging = false;
function mouseClicked(event) {//like released
  if (draging)
  {
    draging=false;
    return;
  }
  Mechanic.eventWithObject(SketchEvents.CLICK, event);
}

function mouseDragged(event) {
  draging=true;
  Mechanic.eventWithObject(SketchEvents.DRAG, event);
}

function mouseWheel(event) {
  Mechanic.eventWithObject(SketchEvents.WHEEL, event);
}

function keyPressed(event) {
  Mechanic.eventWithObject(SketchEvents.PRESS, event);
};


//--- draw ---
var game;
var grid;
function setup() {
  Mechanic.prepare();

  //--
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

  //let gridMechanic=
  new Mechanic(grid, 
  (grid) => {
    translation_init_nD(grid);
    perspective_init_nD(grid);
  },
  (grid) => {
    perspective_draw_nD(grid);
    translation_draw_nD(grid);
  });

  game = new Game(grid, players);
  let gameMechanic=new Mechanic(game);
  gameMechanic.addAction(SketchEvents.PRESS, translation_key_nD);
  gameMechanic.addAction(SketchEvents.CLICK, collision_by_front);
  gameMechanic.addAction(SketchEvents.DRAG, translation_drag_nD);
  gameMechanic.addAction(SketchEvents.WHEEL, translation_wheel_nD);
  //--


  Mechanic.event(SketchEvents.INIT);
  Mechanic.init();
}

function draw() {

  //--
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

  //--
  Mechanic.event(SketchEvents.DISPLAY);
}