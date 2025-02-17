//--- click ---
var draging = false;
/*
function mouseClicked(event) {//like released
  if (draging)
  {
    draging=false;
    return;
  }
  Mechanic.eventWithObject(SketchEvents.CLICK, event);
}
*/
{
  var body = document.getElementById('back');
  body.onclick = function (event) {
    if(event.target.className !== "p5Canvas")
      return;
    if (draging)
    {
      draging=false;
      return;
    }
    Mechanic.eventWithObject(SketchEvents.CLICK, event);
  }
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
function setup() {
  Mechanic.prepare();

  //--
  //theme
  ColorPalet.switch("default");

  //init
  createCanvas(...Scale.resize());
  background(ColorPalet.get("theme_background"));
  textFont('Courier New'); // Good font
  frameRate(Settings.FPS);
  describe('ttt');

  state.root();

  //--


  Mechanic.init();
  Mechanic.event(SketchEvents.INIT);
}

let frameAgo = {};
let frameAgoLast = 0;
var deltaSpeed;
function draw() {

  background(ColorPalet.get("theme_background"));
  deltaSpeed=deltaTime/1000*Settings.SPEED;
  //--

  {//texts
    //title
    if (mainTitle)
    {
      fill(ColorPalet.get('theme_text'));
      textSize(Scale.x(50));
      textAlign(CENTER,TOP);
      noStroke();
      textStyle(NORMAL);
      text(`Tick Tac Toe of space`, Scale.x(500), Scale.y(200));
    } else {
      fill(ColorPalet.get('theme_text'));
      textSize(Scale.max(15));
      textAlign(LEFT,TOP);
      noStroke();
      textStyle(NORMAL);
      text(`Tick Tac Toe of space`, Scale.x(20), Scale.y(20));
    }
  }

  //--
  Mechanic.event(SketchEvents.DISPLAY);
}

window.addEventListener("resize", () => {Mechanic.event(SketchEvents.RESIZE)});