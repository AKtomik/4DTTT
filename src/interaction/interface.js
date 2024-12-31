
//--- common ---
function stateDestroy()
{//to call after transition and before creation
	for (let buttonKey in buttonList)
	{
		let button=buttonList[buttonKey];
		if (button)
		{
			button.kill();
			buttonList[buttonKey]=null;
		}
	}
  if (game)
    game.kill();
  game=null;
  if (cube)
    cube.kill();
  cube=null;
  if (bytee)
    bytee.kill();
  bytee=null;
}

let optionsMaker = (selectorParamter) => Array.from(new Array(selectorParamter.length)).map((element,i) => 
  {
    element = document.createElement("option");
    element.value=selectorParamter[i].value;
    element.appendChild(document.createTextNode(selectorParamter[i].text));
    if (selectorParamter[i].default)
      element.selected=true;
    return element;
  }
);
//keeped values
var buttonList= {};
var game;
var cube;
var bytee;
var infos= {};

//--- transition ---

function transition_buggy()
{
  for (let i=0;i<100;i++)
    new HtmlBug(BugType.RECT_RANDOM_COLOR, undefined, undefined, undefined, [500, 500], 0, 10);
  background(0);
  //console.time("redraw");
  //console.log("before redraw",frameCount);
  noLoop();
  redraw(1);//!to see loading state
  loop();
  //console.timeEnd("redraw");
  //console.log("afgtrr redraw",frameCount);
}


//--- values ---

var state= {gamemode:{free:{}}, menu:{first: {}}};
var action= {settings:{}, ui: {}, menu:{}};
//var effects= {};

state.root=() => 
{//first action here
  state.menu.first.open(true);
};

//--settings--
action.settings.switchStyle= (element) =>
{
  //document.getElementById("generator").focus();
  //buttonList.buttonTest.focus();
	ColorPalet.switch(element.value);
}

action.settings.toggleRay= () =>
{
	Settings.PERSPECTIVE_SHOW_WINRAY=!Settings.PERSPECTIVE_SHOW_WINRAY;
}



//--gamemode--
state.gamemode.free.start = () =>
{
  //transition
  transition_buggy();

	//destroy
  stateDestroy();
  
  //objects
  game = new Game();
  bytee=new ByteCharacter(new Anchor([500, 0], [100, 100], [AnchorConstraintType.MIDDLE, AnchorConstraintType.RIGHT], AnchorRatioType.EQUALMIN));
  game.linkChar(bytee);
  {//ui
    buttonList.buttonBack=new HtmlButton("button", [100,100], [document.createTextNode("back")]);
    buttonList.buttonBack.onClick(state.menu.first.open, false);
		
    buttonList.buttonRestart=new HtmlButton("button", [150,100], [document.createTextNode("restart")]);
    buttonList.buttonRestart.onClick(state.gamemode.free.restart, false);

    const styleSelector = [//!parameter
        {value:"default", text:"default"},
        {value:"sky", text:"sky"},
        {value:"brigth", text:"brigth", default: true},
        {value:"purple", text:"pinky pink"},
        {value:"space", text:"space"},
        {value:"nigth", text:"nigth"},
        {value:"outline", text:"outline"},
    ];
    buttonList.selectStyle=new HtmlButton("select", [100,150], optionsMaker(styleSelector));
    buttonList.selectStyle.onChange(action.settings.switchStyle, true);

    buttonList.buttonRay=new HtmlButton("button", [150, 150], [document.createTextNode("ray")]);
    buttonList.buttonRay.onClick(action.settings.toggleRay, false);
    
    buttonList.buttonTest=new HtmlButton("button", [100,200], [document.createTextNode("test")]);
    buttonList.buttonTest.onClick(action.ui.test, false);
  }

}

state.gamemode.free.restart = () =>
{
  //transition
  {
    for (let i=0;i<100;i++)
      new HtmlBug(BugType.RECT_RANDOM_COLOR, undefined, undefined, undefined, [500, 500], 0, 10);
    redraw();//!to see loading state
  }
  //do
	Mechanic.event(SketchEvents.INIT);
}

state.menu.first.open = (isRoot) =>
{
  //transition
  if (!isRoot)
  {
    transition_buggy();
  }

	//destroy
  stateDestroy();

  {//ui
    const dimSelector = [//!parameter
        {value:"2", text:"2D"},
        {value:"3", text:"3D"},
        {value:"4", text:"4D"},
        {value:"5", text:"5D"},
        {value:"6", text:"6D"},
    ];
    buttonList.selectDim=new HtmlButton("select", [500,450], optionsMaker(dimSelector));
    buttonList.selectDim.onChange(action.menu.select);
    
    const widthSelector = [//!parameter
        {value:"1", text:"_x_"},
        {value:"2", text:"_x_"},
        {value:"3", text:"_x_"},
        {value:"4", text:"_x_"},
        {value:"5", text:"_x_"},
        {value:"6", text:"_x_"},
        {value:"10", text:"__x__"},
        {value:"15", text:"__x__"},
        {value:"20", text:"__x__"},
        {value:"50", text:"__x__"},
        {value:"99", text:"__x__"},
    ];
    buttonList.selectWidth=new HtmlButton("select", [500,500], optionsMaker(widthSelector));
    buttonList.selectWidth.onChange(action.menu.select);

    const alignSelector = [//!parameter
        {value:"2", text:"⟺ 2"},
        {value:"3", text:"⟺ 3"},
        {value:"4", text:"⟺ 4"},
        {value:"5", text:"⟺ 5"},
        {value:"6", text:"⟺ 6"},
    ];
    buttonList.selectAlign=new HtmlButton("select", [500,550], optionsMaker(alignSelector));
    buttonList.selectAlign.onChange(action.menu.select);

    buttonList.doneStart=new HtmlButton("button", [500,700], [document.createTextNode("play")]);
    buttonList.doneStart.onClick(state.gamemode.free.start, false);

    action.menu.select(true);
  }
}

action.ui.test = () =>
{
  new HtmlBug(BugType.RECT_RANDOM_BLEND, [500,0],[500,1000],[1000,2],[1000,2],0,10);
  const dist = 20;
  new HtmlBug(BugType.RECT_RANDOM_BLEND, [100-dist,200-dist],[100+dist,200+dist],[0,0],[100,100],15,20);
  for (let i=0;i<10;i++)
    new HtmlBug(BugType.RECT_RANDOM_COLOR, [100-dist,200-dist],[100+dist,200+dist],[0,0],[100,100],0,10);
}

action.menu.select = (ifSettingsFirst) =>
{
  //settings
  const selectDimHtml=document.getElementById(buttonList.selectDim.id);
  const selectWidthHtml=document.getElementById(buttonList.selectWidth.id);
  const selectAlignHtml=document.getElementById(buttonList.selectAlign.id);
  if (ifSettingsFirst)
  {
  	selectDimHtml.value=Settings.RULE_BOX_D;
  	selectWidthHtml.value=Settings.RULE_BOX_WIDTH;
  	selectAlignHtml.value=Settings.RULE_BOX_ROW_LENGTH;
  } else
  {
  	Settings.RULE_BOX_D=parseInt(selectDimHtml.value);
  	Settings.RULE_BOX_WIDTH=parseInt(selectWidthHtml.value);
  	Settings.RULE_BOX_ROW_LENGTH=parseInt(selectAlignHtml.value);
  }

  //const dimChildrens=selectDimHtml.children;
  const widthChildrens=selectWidthHtml.children;
  for (let childs of widthChildrens)
  {
    childs.label=childs.value;
    for (let i=1;i<Settings.RULE_BOX_D;i++)
    {
      childs.label+="x"+childs.value;
    }
  }
  
  //object
  if (cube)
    cube.kill();
  cube=new JustCube();
}