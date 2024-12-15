class Bug {
	constructor()
	{
		this.frame=0;
		this.maxFrame=Math.floor(2+Math.random()*5);
		this.position=createVector(1000*Math.random(),1000*Math.random());
		this.size=createVector(100*Math.random(),100*Math.random());

		this.mechanic=new Mechanic(this);
		this.mechanic.addAction(SketchEvents.DISPLAY, this.display);
	}

	display()
	{
		//self destroy
		this.frame++;
		if (this.frame>this.maxFrame)
		{
			this.mechanic.killActions();
			delete this.mechanic;
		}
		let randomColor=Object.keys(ColorPalet.colors)[Math.floor(Math.random()*Object.keys(ColorPalet.colors).length)];
		
		fill(ColorPalet.colors[randomColor]);
		noStroke();
		rect(Scale.x(this.position.x), Scale.y(this.position.y), Scale.x(this.size.x), Scale.y(this.size.y));
	}
}