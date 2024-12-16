//--- click ---
var draging = false;
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


  //objects
  game = new Game();
  let gameMechanic=new Mechanic(game, game.init, game.display);
  gameMechanic.addAction(SketchEvents.PRESS, game.action_press);
  gameMechanic.addAction(SketchEvents.CLICK, game.action_click);
  gameMechanic.addAction(SketchEvents.DRAG, game.action_drag);
  gameMechanic.addAction(SketchEvents.WHEEL, game.action_wheel);

  
  {//ui
    let optionsMaker = (selectorParamter) => Array.from(new Array(selectorParamter.length)).map((element,i) => 
      {
        element = document.createElement("option");
        element.value=selectorParamter[i].value;
        element.appendChild(document.createTextNode(selectorParamter[i].text));
        return element;
      }
    );

    const dimSelector = [//!parameter
        {value:"2", text:"2D"},
        {value:"3", text:"3D"},
        {value:"4", text:"4D"},
        {value:"5", text:"5D"},
        {value:"6", text:"6D"},
    ];
    let selectDim=new HtmlButton("select", [50,100], optionsMaker(dimSelector));
    interface_restart_id_dim=selectDim.id;//!be acessible from interface file
    
    const widthSelector = [//!parameter
        {value:"1", text:"1x1"},
        {value:"2", text:"2x2"},
        {value:"3", text:"3x3"},
        {value:"4", text:"4x4"},
        {value:"5", text:"5x5"},
        {value:"6", text:"6x6"},
        {value:"10", text:"10x10"},
        {value:"15", text:"15x15"},
        {value:"20", text:"20x20"},
        {value:"50", text:"50x50"},
        {value:"100", text:"100x100"},
    ];
    let selectWidth=new HtmlButton("select", [100,100], optionsMaker(widthSelector));
    interface_restart_id_width=selectWidth.id;//!be acessible from interface file

    let buttonRestart=new HtmlButton("button", [150,100], [document.createTextNode("restart")]);
    buttonRestart.onClick(interfaceRestart, false);

    const styleSelector = [//!parameter
        {value:"default", text:"default"},
        {value:"sky", text:"sky"},
        {value:"brigth", text:"brigth"},
        {value:"purple", text:"pinky pink"},
        {value:"space", text:"space"},
        {value:"nigth", text:"nigth"},
        {value:"outline", text:"outline"},
    ];
    let selectStyle=new HtmlButton("select", [100,150], optionsMaker(styleSelector));
    selectStyle.onChange(interfaceSwitchStyle, true);
  }
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
function draw() {

  //--
  background(ColorPalet.get("theme_background"));

  {//bug
    for (let bug of bugScreen)
    {
      if (Math.floor(Math.random()*bug.chance)===0)
      {
        for (let i=0;i<bug.amount;i++)
          new Bug();
      }
    }
  }

  {//texts
    //title
    fill(255);
    textSize(Scale.min(50));
    textAlign(LEFT,TOP);
    strokeWeight(0);
    textStyle(NORMAL);
    text(`4D Tick Tac Toe`, Scale.x(20), Scale.y(20));
  }

  //--
  Mechanic.event(SketchEvents.DISPLAY);
}

window.addEventListener("resize", () => {Mechanic.event(SketchEvents.RESIZE)});