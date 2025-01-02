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


bugScreen=[
  {chance: 10000, amount: 100},
  {chance: 500, amount: 10},
  {chance: 200, amount: 2}
]

let frameAgo = {};
let frameAgoLast = 0;
var deltaSpeed;
function draw() {

  background(ColorPalet.get("theme_background"));
  deltaSpeed=deltaTime/1000*Settings.SPEED;
  //--

  {//random bug
    for (let bug of bugScreen)
    {
      if (Math.floor(Math.random()*bug.chance)===0)
      {
        for (let i=0;i<bug.amount;i++)
          new HtmlBug(BugType.RECT_RANDOM_COLOR);
      }
    }
  }

  {//texts
    //title
    fill(ColorPalet.get('theme_text'));
    textSize(Scale.max(15));
    textAlign(LEFT,TOP);
    strokeWeight(0);
    textStyle(NORMAL);
    text(`Tick Tac Toe of space`, Scale.x(20), Scale.y(20));
  }

  //--
  Mechanic.event(SketchEvents.DISPLAY);
}

window.addEventListener("resize", () => {Mechanic.event(SketchEvents.RESIZE)});