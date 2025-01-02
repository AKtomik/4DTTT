class BugType {
	static RECT_RANDOM_COLOR=0;
	static RECT_RANDOM_BLEND=1;
	static RECT_NEGATIVE_BLEND=2;
	static RECT_RANDOM_BLEND_AND_COLOR=3;
}

const bugPropety = {
	[BugType.RECT_RANDOM_COLOR]: {
		init: (bug) => {},
		display: (bug) => {
			let randomColorKey=Object.keys(ColorPalet.colors)[Math.floor(Math.random()*Object.keys(ColorPalet.colors).length)];
			bug.element.style.background=ColorPalet.colors[randomColorKey].toString("#rrggbbaa");
		}
	},
	[BugType.RECT_NEGATIVE_BLEND]: {
		init: (bug) => {
			bug.element.style.mixBlendMode="difference";
			bug.element.style.background="#fff";
		},
		display: (bug) => {}
	},
	[BugType.RECT_RANDOM_BLEND]: {
		init: (bug) => {
			bug.element.style.background="#fff";
		},
		display: (bug) => {
			bug.element.style.mixBlendMode=bugBlendsList[Math.floor(Math.random()*bugBlendsList.length)];
		}
	},
	[BugType.RECT_RANDOM_BLEND_AND_COLOR]: {
		init: (bug) => {
			bug.element.style.background="#fff";
		},
		display: (bug) => {
			let randomColorKey=Object.keys(ColorPalet.colors)[Math.floor(Math.random()*Object.keys(ColorPalet.colors).length)];
			bug.element.style.background=ColorPalet.colors[randomColorKey].toString("#rrggbbaa");
			bug.element.style.mixBlendMode=bugBlendsList[Math.floor(Math.random()*bugBlendsList.length)];
		}
	}
}

const bugBlendsList = ["normal","multiply","screen","overlay","darken","lighten","dodge","burn","light","light","difference","exclusion","hue","saturation","color","luminosity"]

class HtmlBug {
	static iterator=0;

	constructor(bugType, positionMin=[0,0], positionMax=[1000,1000], sizeMin=[0,0], sizeMax=[100,100], lifeMin=5, lifeMax=10)
	{
		//self
		this.bugType=bugType;
		this.life=Math.floor(lifeMin+(Math.random()*(lifeMax-lifeMin)));
		this.id="generated_C"+String(HtmlBug.iterator++);
		this.size=Array.from(new Array(2)).map((v,i) => sizeMin[i]+(sizeMax[i]-sizeMin[i])*Math.random());
		this.position=Array.from(new Array(2)).map((v,i) => positionMin[i]+(positionMax[i]-positionMin[i])*Math.random() - this.size[i]/2);
		this.size=this.size.map((v,i)=>((v+this.position[i]>1000) ? (1000-this.position[i]) : v));
		//html
		this.element=document.createElement("div");
		this.element.id=this.id;
		//css
		this.element.style.position="absolute";
		this.element.style.zIndex=10;
		this.element.style.overflow="hidden";
		//do
		bugPropety[this.bugType].init(this);
	  document.getElementById("generator").appendChild(this.element);
		//mechanic
		this.mechanic=new Mechanic(this);
		this.mechanic.addAction(SketchEvents.DISPLAY, this.display);
	}

	kill()
	{
  	document.getElementById(this.id).remove();
		this.mechanic.kill();
		delete this.mechanic;
	}

	display()
	{
		//console.log("show bug");
		//self destruct
		this.life-=1;
		if (this.life<=0)
		{
			this.kill();
			return;
		}
		
		//fill(ColorPalet.colors[randomColorKey]);
		//noStroke();
		//rect(Scale.x(this.position[0]), Scale.y(this.position[1]), Scale.x(this.size[0]), Scale.y(this.size[1]));
		bugPropety[this.bugType].display(this);

		//size
		this.element.style.left=parseInt(Scale.x(this.position[0]))+"px";
		this.element.style.top=parseInt(Scale.y(this.position[1]))+"px";
		this.element.style.width=parseInt(Scale.x(this.size[0]))+"px";
		this.element.style.height=parseInt(Scale.y(this.size[1]))+"px";
	}
}


const bugScreenList=[
  {chance: 10000, amount: 100},
  {chance: 500, amount: 10},
  {chance: 200, amount: 2}
]

class BugScreen {

	constructor()
	{
		//mechanic
		this.mechanic=new Mechanic(this);
		this.mechanic.addAction(SketchEvents.DISPLAY, this.display);
	}

	display()
  {//random bug
		if (!Settings.EFFECT_BUG_SHOW)
			return;
    for (let bug of bugScreenList)
    {
      if (Math.floor(Math.random()*bug.chance)===0)
      {
        for (let i=0;i<bug.amount;i++)
          new HtmlBug(BugType.RECT_RANDOM_COLOR);
      }
    }
  }
}