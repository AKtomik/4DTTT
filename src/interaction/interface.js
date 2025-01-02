
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
var effects= {};

state.root=() => 
{//first action here
  
  ColorPalet.switch(Settings.STYLE_COLOR);
	ColorPalet.tweek(Settings.STYLE_TWEEK);
  
  //effects
  effects.BugScreen=new BugScreen();
  effects.StarsSky=new StarsSky();

  state.menu.first.open(true);
};

//--settings--
var showSettingsColumn=true;
action.settings.toggleColumnDisplay= () =>
{
  showSettingsColumn=!showSettingsColumn;
  action.settings.refreshColumnDisplay();
}

action.settings.refreshColumnDisplay= () =>
{
  document.getElementsByClassName("gameSettingsColumn").forEach(element => {console.log(element);element.style.display=(showSettingsColumn) ? 'block' : 'none'});
}

action.settings.toggleDebug= () =>
{
  Settings.DEBUG=!Settings.DEBUG;
}

action.settings.switchStyle= (ifSettingsFirst) =>
{
  const selectColorHtml=document.getElementById(buttonList.selectStyleColor.id);
  const selectTweekHtml=document.getElementById(buttonList.selectStyleTweek.id);
  
  if (ifSettingsFirst)
  {
  	selectColorHtml.value=Settings.STYLE_COLOR;
  	selectTweekHtml.value=Settings.STYLE_TWEEK;
  } else {
  	Settings.STYLE_COLOR=selectColorHtml.value;
  	Settings.STYLE_TWEEK=selectTweekHtml.value;
  }
  ColorPalet.switch(Settings.STYLE_COLOR);
	ColorPalet.tweek(Settings.STYLE_TWEEK);
}

action.settings.changeRay= (element) =>
{
	Settings.PERSPECTIVE_MODE_WINRAY=parseInt(element.value);
}



//--gamemode--
var settingsButtonPos=[];//!
state.gamemode.free.start = () =>
{
  //transition
  transition_buggy();
  effects.StarsSky.newSky();

	//destroy
  stateDestroy();
  
  //objects
  game = new Game();
  bytee=new ByteCharacter(new Anchor([500, 10], [100, 100], [AnchorConstraintType.MIDDLE, AnchorConstraintType.RIGHT], AnchorRatioType.EQUALMIN));
  game.linkChar(bytee);
  {//ui
    buttonList.buttonBack=new HtmlButton("button", [100,100], [document.createTextNode("back")]);
    buttonList.buttonBack.onClick(state.menu.first.open, false);
		
    buttonList.buttonRestart=new HtmlButton("button", [175,100], [document.createTextNode("restart")]);
    buttonList.buttonRestart.onClick(state.gamemode.free.restart, false);

    const styleColorSelector = [//!parameter
        {value:"space", text:"space"},
        {value:"nigth", text:"nigth"},
        {value:"sky", text:"sky"},
        {value:"brigth", text:"brigth"},
        {value:"purple", text:"pinky pink"},
    ];
    
    const styleTweekSelector = [//!parameter
        {value:"solid", text:"solid"},
        {value:"transparent", text:"transparent"},
        {value:"outline", text:"outline"},
        {value:"smooth", text:"smooth"},
    ];
    
    const raySelector = [//!parameter
        {value:"0", text:"ray off"},
        {value:"1", text:"rays front"},
        {value:"2", text:"rays back"},
    ];
    
    buttonList.buttonTest=new HtmlButton("button", [100,200], [document.createTextNode("test")]);
    buttonList.buttonTest.onClick(action.ui.test, false);

    settingsButtonPos=[925, 100];
    buttonList.buttonOpenSettings=new HtmlButton("button", settingsButtonPos.slice(), [document.createTextNode("SETTINGS")]);
    buttonList.buttonOpenSettings.onClick(action.settings.toggleColumnDisplay, false);
    

    settingsButtonPos[1]+=75;
    buttonList.buttonRay=new HtmlButton("select", settingsButtonPos.slice(), optionsMaker(raySelector));
    buttonList.buttonRay.setClass("gameSettingsColumn");
    buttonList.buttonRay.onChange(action.settings.changeRay, true);

    settingsButtonPos[1]+=50;
    buttonList.selectStyleColor=new HtmlButton("select", [settingsButtonPos[0]-75,settingsButtonPos[1]], optionsMaker(styleColorSelector));
    buttonList.selectStyleColor.setClass("gameSettingsColumn");
    buttonList.selectStyleColor.onChange(action.settings.switchStyle, false);

    buttonList.selectStyleTweek=new HtmlButton("select", settingsButtonPos.slice(), optionsMaker(styleTweekSelector));
    buttonList.selectStyleTweek.setClass("gameSettingsColumn");
    buttonList.selectStyleTweek.onChange(action.settings.switchStyle, false);
    
    settingsButtonPos[1]+=50;
    buttonList.buttonDebug=new HtmlButton("button", settingsButtonPos.slice(), [document.createTextNode('debug')]);
    buttonList.buttonDebug.setClass("gameSettingsColumn");
    buttonList.buttonDebug.onClick(action.settings.toggleDebug, false);

    action.settings.switchStyle(true);//! init style
    action.settings.refreshColumnDisplay();//! init display
    

    if (Settings.RULE_BOX_D>=3)
    {
      buttonList.moveFront=new HtmlButton("button", [450, 900], [document.createTextNode("-")]);
      buttonList.moveFront.onClick(() => action.ui.move("z<->",false));
      buttonList.moveBack=new HtmlButton("button", [450, 950], [document.createTextNode("+")]);
      buttonList.moveBack.onClick(() => action.ui.move("z<->",true));
    }
    
    if (Settings.RULE_BOX_D>=3)
    {
      buttonList.moveAroundX=new HtmlButton("button", [500, 900], [document.createTextNode("x")]);
      buttonList.moveAroundX.onClick(() => action.ui.move("x/",false));
      buttonList.moveAroundY=new HtmlButton("button", [500, 950], [document.createTextNode("y")]);
      buttonList.moveAroundY.onClick(() => action.ui.move("y/",false));
    }
    
    if (Settings.RULE_BOX_D>=4)
    {
      buttonList.moveAna=new HtmlButton("button", [600, 900], [document.createTextNode("ana")]);
      buttonList.moveAna.onClick(() => action.ui.move("wz/",false));
      buttonList.moveKata=new HtmlButton("button", [600, 950], [document.createTextNode("kata")]);
      buttonList.moveKata.onClick(() => action.ui.move("wz/",true));
    }
  }

}

state.gamemode.free.restart = () =>
{
  //transition
  transition_buggy();
  effects.StarsSky.newSky();
  //do
	Mechanic.event(SketchEvents.INIT);
}

state.menu.first.open = (isRoot) =>
{
  //transition
  if (!isRoot)
  {
    transition_buggy();
    effects.StarsSky.newSky();
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
        //{value:"7", text:"7D"},
        //{value:"8", text:"8D"},
        //{value:"9", text:"9D"},
        //{value:"10", text:"10D"},
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

action.ui.move = (translationKey, oppose) =>
{
  translation_button_nD(translationKey, oppose, game.grid);
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