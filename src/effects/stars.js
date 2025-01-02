const rickRoll= (maxExcluded=2, minIncluded=0) => Math.floor(Math.random()*(maxExcluded-minIncluded))+minIncluded;

class StarsSky {

	constructor(amount, sizeMax=4, sizeMin=1, seed=0)
	{
		//self
		this.seed=seed;
		this.amount=amount;
		//stars
		this.stars=[];
		for (let i=0;i<amount;i++)
		{
			let star=new Star([rickRoll(1000), rickRoll(1000)], rickRoll(sizeMax+1, sizeMin));
			this.stars.push(star);
		}
		//mechanic
		this.mechanic=new Mechanic(this);
		this.mechanic.addAction(SketchEvents.DISPLAY, this.display);
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
		
		fill(ColorPalet.get('theme_text'));
		noStroke();
		for (let star of this.stars)
			star.display();

	}
}

class Star {
	constructor(pos, size)
	{
		this.pos=pos;
		this.size=size;
	}
	
	display()
	{
		circle(...Scale.xy(this.pos), this.size);
	}
}