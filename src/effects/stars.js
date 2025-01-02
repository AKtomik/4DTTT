const rickRoll= (maxExcluded=2, minIncluded=0) => Math.floor(Math.random()*(maxExcluded-minIncluded))+minIncluded;
const rickMod= (n, m) => ((n % m) + m) % m;
const starsLayersList=[
	{speed: 1, amount: 10, size: 4},
	{speed: 1/2, amount: 20, size: 3},
	{speed: 1/5, amount: 30, size: 2},
	{speed: 1/10, amount: 40, size: 1},
]

class StarsSky {

	constructor(seed=0)
	{
		//self
		this.seed=seed;
		this.slide=[0,0];
		//stars
		this.newSky();
		//mechanic
		this.mechanic=new Mechanic(this);
		this.mechanic.addAction(SketchEvents.DISPLAY, this.display);
	}

	newSky()
	{
		this.starsLayers=[];
		for (let layerIndex=0;layerIndex<starsLayersList.length;layerIndex++)
		{
			const size=starsLayersList[layerIndex].size;
			this.starsLayers[layerIndex]=[];
			for (let starIndex=0;starIndex<starsLayersList[layerIndex].amount;starIndex++)
			{
				let star=new Star([rickRoll(1000), rickRoll(1000)], size);
				this.starsLayers[layerIndex].push(star);
			}
		}
	}

	addSlide(slidePosVector)
	{
		this.slide=[this.slide[0]+slidePosVector[0],this.slide[1]+slidePosVector[1]];
	}

	kill()
	{
		this.mechanic.kill();
		delete this.mechanic;
	}

	display()
	{
		if (!Settings.EFFECT_STAR_SHOW)
			return;
		//slide
		//this.slide[0]+=deltaSpeed*20;
		//this.slide[1]+=deltaSpeed*5;
		
		//show
		fill(ColorPalet.get('theme_text'));
		noStroke();
		for (let layerIndex=0;layerIndex<starsLayersList.length;layerIndex++)
		{
			const layerSlide=[this.slide[0]*starsLayersList[layerIndex].speed, this.slide[1]*starsLayersList[layerIndex].speed];
			for (let star of this.starsLayers[layerIndex])
			{
				star.display(layerSlide);
			}
		}
	}
}

class Star {
	constructor(pos, size)
	{
		this.pos=pos;
		this.size=size;
	}
	
	display(slide=[0,0])
	{
		circle(Scale.x(rickMod(this.pos[0]+slide[0],1000)), Scale.y(rickMod(this.pos[1]+slide[1],1000)), this.size);
	}
}