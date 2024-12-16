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
    const dimSelector = [//!parameter
        {value:"2", text:"2D"},
        {value:"3", text:"3D"},
        {value:"4", text:"4D"},
    ];
    let selectDimOptions=Array.from(new Array(dimSelector.length)).map((element,i) => 
      {
        element = document.createElement("option");
        element.value=dimSelector[i].value;
        element.appendChild(document.createTextNode(dimSelector[i].text));
        return element;
      }
    );
    let selectDim=new HtmlButton("select", [50,100], selectDimOptions);
    interface_restart_id_dim=selectDim.id;//!be acessible from interface file

    let buttonRestart=new HtmlButton("button", [100,100], [document.createTextNode("restart")]);
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
    let selectStyleOptions=Array.from(new Array(styleSelector.length)).map((element,i) => 
      {
        element = document.createElement("option");
        element.value=styleSelector[i].value;
        element.appendChild(document.createTextNode(styleSelector[i].text));
        return element;
      }
    );
    let selectStyle=new HtmlButton("select", [100,150], selectStyleOptions);
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

    //test

    //perfs
    if (Settings.DEBUG)
    {
      fill(255,0,255);
      textSize(Scale.min(20));
      textAlign(RIGHT,TOP);
      strokeWeight(0);
      textStyle(BOLD);

      
      let speeds="";
      for (let moveKey of Object.keys(move_aviable))
      {
        if (game.grid.velocity[moveKey])
        speeds+=`${Math.round(game.grid.velocity[moveKey]*100)} ${matrix[moveKey].lore}\n`;
      }
      if (speeds)
        speeds="\nspeed :\n"+speeds;
      
      const now=new Date().getTime();
      frameAgo[frameCount]=now;//now
      const frameLogValue=[1,3,10,60];
      let frameLoged={};
      let frameIndex=frameCount;
      for (let logTime of frameLogValue)
      {
        let timeDownLog=now-logTime*1000;
        while (frameAgo[frameIndex]>timeDownLog && frameIndex>=0)
        {
          frameIndex--;
        }
        frameLoged[logTime]=Math.round((frameCount-frameIndex)/logTime);
      }
      let toLast=frameAgoLast;
      frameAgoLast=frameIndex;
      while (toLast<frameIndex)
      {
        delete frameAgo[frameIndex];
        frameIndex--;
      }
      
      text(`
      perfs :
      frame ${frameCount}
      ${Math.round(1000/(deltaTime))} fps - now
      ${frameLoged[1]} fps -  1s
      ${frameLoged[3]} fps -  3s
      ${frameLoged[10]} fps - 10s
      ${frameLoged[60]} fps - 60s
      ${Object.keys(frameAgo).length} expensive

      ${speeds}`, Scale.x(980), Scale.y(20));
    }
    
    //players
    fill(ColorPalet.get("theme_text"));
    textSize(Scale.min(100));
    textAlign(LEFT, CENTER);
    text(`scores`, Scale.x(25), Scale.y(300));
    const here_text_size_score=120;
    const here_text_size_name=60;
    const here_at_begin_y=400;
    const here_at_slide_y=100;
    const here_forward_more_x=50;
    const here_forward_more_size=5;
    const here_size_y=50;
    const here_size_x=50;//width added to it
    const here_size_backmiddle=25;
    const here_time_forward=30;
    
    const playerForwardIndex=(game.remain>0) ? game.player_i : game.winer_i;
    let maxWidth=0;
    for (let playerIndex=0;playerIndex<game.players.length;playerIndex++)
    {//calculate max width
      let width=0;
      if (game.players[playerIndex].score)
      {
        textSize(Scale.min(here_text_size_score));
        textStyle(NORMAL);
        width+=textWidth(String(game.players[playerIndex].score));
      }
      textSize(Scale.min(here_text_size_name));
      textStyle(NORMAL);
      width+=textWidth(String(game.players[playerIndex].name));
      if (width>maxWidth)
      {
        maxWidth=width;
      }
    }
    maxWidth*=1.2;//! just because
    for (let playerIndex=0;playerIndex<game.players.length;playerIndex++)
    {//draw each player
      let step_in=game.players[playerIndex].animation["step_in"]/here_time_forward;
      if (step_in<1 && playerIndex===playerForwardIndex)
      {
        game.players[playerIndex].animation["step_in"]++;
      }
      if (step_in>0 && !(playerIndex===playerForwardIndex))
      {
        game.players[playerIndex].animation["step_in"]--;
      }
      step_in=(Math.cos((1-step_in)*Math.PI)+1)/2;

      let at=createVector(0,here_at_begin_y+here_at_slide_y*playerIndex);  
      let sizing=createVector(here_size_x+step_in*here_forward_more_x, here_size_y);
      
      fill(ColorPalet.get(`player_${playerIndex+1}_dark`));
      beginShape()
      vertex(Scale.x(at.x), Scale.y(at.y))
      vertex(maxWidth+Scale.x(at.x+sizing.x), Scale.y(at.y))
      vertex(maxWidth+Scale.x(at.x+sizing.x-here_size_backmiddle), Scale.y(at.y+(sizing.y/2)))
      vertex(maxWidth+Scale.x(at.x+sizing.x), Scale.y(at.y+sizing.y))
      vertex(Scale.x(at.x), Scale.y(at.y+sizing.y))
      endShape()

      let scoreWidth=0;
      if (game.players[playerIndex].score)
      {
        textSize(Scale.min(here_text_size_score));
        textStyle(NORMAL);
        fill(ColorPalet.get("theme_text"));
        fill(ColorPalet.get(`player_${playerIndex+1}_ligth`));
        text(String(game.players[playerIndex].score), Scale.x(at.x+5), Scale.y(at.y+sizing.y/2-10));
        scoreWidth=textWidth(String(game.players[playerIndex].score));
      }
      
      let size_more=(game.remain>0)
      ? step_in
      : ((1+Math.sin(frameCount/5))/2)*step_in;
      textSize(Scale.min(here_text_size_name+ size_more*here_forward_more_size));
      textStyle(NORMAL);
      fill(ColorPalet.get("theme_text"));
      text(String(game.players[playerIndex].name), Scale.x(at.x+scoreWidth+10), Scale.y(at.y+sizing.y/2));
    }

    //turn
    textStyle(BOLD);
    if (game.remain>0)
    {
      fill(ColorPalet.get("theme_text"));
      textSize(Scale.min(25));
      text(`reste ${game.remain}`, Scale.x(50), Scale.y(450+100*game.players.length));
    } else {
      if (game.winer_i===-1)
      {
        fill(ColorPalet.get("theme_text"));
        textSize(Scale.min(80));
        text(`égalitée`, Scale.x(40), Scale.y(450+100*game.players.length));
      } else {
        fill(ColorPalet.get(`player_${game.winer_i+1}_text`));
        textSize(Scale.min(80));
        text(`${game.players[game.winer_i].name} won`, Scale.x(40), Scale.y(450+100*game.players.length));
      }
    }
  }

  //--
  Mechanic.event(SketchEvents.DISPLAY);
}

window.addEventListener("resize", () => {Mechanic.event(SketchEvents.RESIZE)});