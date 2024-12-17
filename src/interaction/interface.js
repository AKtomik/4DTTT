function interfaceSwitchStyle(element)
{
	ColorPalet.switch(element.value);
}



let optionsMaker = (selectorParamter) => Array.from(new Array(selectorParamter.length)).map((element,i) => 
  {
    element = document.createElement("option");
    element.value=selectorParamter[i].value;
    element.appendChild(document.createTextNode(selectorParamter[i].text));
    return element;
  }
);

var buttonList= {
selectDim:null,
selectWidth:null,
selectStyle:null,
doneStart:null,
buttonRestart:null,
buttonBack:null,
}
let gameMechanic=null;


function interfaceStart()
{
	//settings
	Settings.RULE_BOX_D=parseInt(document.getElementById(buttonList.selectDim.id).value);
	Settings.RULE_BOX_WIDTH=parseInt(document.getElementById(buttonList.selectWidth.id).value);

	//destroy
	for (let buttonKey in buttonList)
	{
		let button=buttonList[buttonKey];
		if (button)
		{
			button.kill();
			buttonList[buttonKey]=null;
		}
	}

  //objects
  game = new Game();
  gameMechanic=new Mechanic(game, game.init, game.display);
  gameMechanic.addAction(SketchEvents.PRESS, game.action_press);
  gameMechanic.addAction(SketchEvents.CLICK, game.action_click);
  gameMechanic.addAction(SketchEvents.DRAG, game.action_drag);
  gameMechanic.addAction(SketchEvents.WHEEL, game.action_wheel);

  
  {//ui
    buttonList.buttonBack=new HtmlButton("button", [100,100], [document.createTextNode("back")]);
    buttonList.buttonBack.onClick(interfaceMenu, false);
		
    buttonList.buttonRestart=new HtmlButton("button", [150,100], [document.createTextNode("restart")]);
    buttonList.buttonRestart.onClick(interfaceRestart, false);

    const styleSelector = [//!parameter
        {value:"default", text:"default"},
        {value:"sky", text:"sky"},
        {value:"brigth", text:"brigth"},
        {value:"purple", text:"pinky pink"},
        {value:"space", text:"space"},
        {value:"nigth", text:"nigth"},
        {value:"outline", text:"outline"},
    ];
    buttonList.selectStyle=new HtmlButton("select", [100,150], optionsMaker(styleSelector));
    buttonList.selectStyle.onChange(interfaceSwitchStyle, true);
  }
}

function interfaceRestart()
{
	Mechanic.event(SketchEvents.INIT);
}

function interfaceMenu()
{
	//destroy
	if (game)
	{
		gameMechanic.kill();
		game=null;
	}
	for (let buttonKey in buttonList)
	{
		let button=buttonList[buttonKey];
		if (button) {
			button.kill();
			buttonList[buttonKey]=null;
		}
	}

  {//ui
    const dimSelector = [//!parameter
        {value:"2", text:"2D"},
        {value:"3", text:"3D"},
        {value:"4", text:"4D"},
        {value:"5", text:"5D"},
        {value:"6", text:"6D"},
    ];
    buttonList.selectDim=new HtmlButton("select", [475,400], optionsMaker(dimSelector));
    
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
    buttonList.selectWidth=new HtmlButton("select", [525,400], optionsMaker(widthSelector));

    buttonList.doneStart=new HtmlButton("button", [500,500], [document.createTextNode("play")]);
    buttonList.doneStart.onClick(interfaceStart, false);
  }
}