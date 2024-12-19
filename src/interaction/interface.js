function interfaceSwitchStyle(element)
{
  //document.getElementById("generator").focus();
  //buttonList.buttonTest.focus();
	ColorPalet.switch(element.value);
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

var buttonList= {
//selectDim:null,
//selectWidth:null,
//selectStyle:null,
//doneStart:null,
//buttonRestart:null,
//buttonBack:null,
}

var game;
var cube;

function interfaceStart()
{
  //transition
  {
    for (let i=0;i<100;i++)
      new HtmlBug(BugType.RECT_RANDOM_COLOR, undefined, undefined, undefined, [500, 500], 0, 10);
    background(0);
    //console.time("redraw");
    //console.log("before redraw",frameCount);
    redraw(1);//!to see loading state
    //console.timeEnd("redraw");
    //console.log("afgtrr redraw",frameCount);
  }

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
  if (cube)
    cube.kill();
  cube=null;

  //objects
  game = new Game();

  
  {//ui
    buttonList.buttonBack=new HtmlButton("button", [100,100], [document.createTextNode("back")]);
    buttonList.buttonBack.onClick(interfaceMenu, false);
		
    buttonList.buttonRestart=new HtmlButton("button", [150,100], [document.createTextNode("restart")]);
    buttonList.buttonRestart.onClick(interfaceRestart, false);

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
    buttonList.selectStyle.onChange(interfaceSwitchStyle, true);
    
    buttonList.buttonTest=new HtmlButton("button", [100,200], [document.createTextNode("test")]);
    buttonList.buttonTest.onClick(interfaceTest, false);
  }
}

function interfaceRestart()
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

function interfaceMenu()
{
  //transition
  if (frameCount>1) {
    for (let i=0;i<100;i++)
      new HtmlBug(BugType.RECT_RANDOM_COLOR, undefined, undefined, undefined, [500, 500], 0, 10);
    redraw();//!to see loading state
  }

	//destroy
	if (game)
	{
		game.kill();
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
    buttonList.selectDim=new HtmlButton("select", [500,450], optionsMaker(dimSelector));
    buttonList.selectDim.onChange(interfaceMenuSelect);
    
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
    buttonList.selectWidth.onChange(interfaceMenuSelect);

    const alignSelector = [//!parameter
        {value:"2", text:"⟺ 2"},
        {value:"3", text:"⟺ 3"},
        {value:"4", text:"⟺ 4"},
        {value:"5", text:"⟺ 5"},
        {value:"6", text:"⟺ 6"},
    ];
    buttonList.selectAlign=new HtmlButton("select", [500,550], optionsMaker(alignSelector));
    buttonList.selectAlign.onChange(interfaceMenuSelect);

    buttonList.doneStart=new HtmlButton("button", [500,700], [document.createTextNode("play")]);
    buttonList.doneStart.onClick(interfaceStart, false);

    interfaceMenuSelect(true);
  }
}

function interfaceTest()
{
  new HtmlBug(BugType.RECT_RANDOM_BLEND, [500,0],[500,1000],[1000,2],[1000,2],0,10);
  const dist = 20;
  new HtmlBug(BugType.RECT_RANDOM_BLEND, [100-dist,200-dist],[100+dist,200+dist],[0,0],[100,100],15,20);
  for (let i=0;i<10;i++)
    new HtmlBug(BugType.RECT_RANDOM_COLOR, [100-dist,200-dist],[100+dist,200+dist],[0,0],[100,100],0,10);
}

function interfaceMenuSelect(ifSettingsFirst)
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