class ByteEyes {
	static OPEN=1;
	static CLOSED=2;
	static HAPPY=3;
	static DEADY=4;
	static ANGRY=5;
	static SAYAN=7;
	static SHOKY=8;
	static CUTY=9;
	static BORY=10;
}

class ByteMouth {
	static SHUT=0;
	static OPEN1=1;
	static OPEN2=2;
	static OPEN3=3;
	static OPEN4=4;
	static HAPPY=6;
	static SADDY=7;
	static LAUGTHY=8;
	static CUTY=9;
}

const ByteMouthSpeak = [
	ByteMouth.OPEN1,
	ByteMouth.OPEN2,
	ByteMouth.OPEN3,
	ByteMouth.OPEN4,
];

class ByteCharacter {
	constructor(anchor) {
		//position
		this.anchor=anchor;
		//bubble
		this.bubbleObject=new ByteBubble(new Anchor([this.anchor.centerPos[0]-50, this.anchor.centerPos[1]+50], [200, 80], [AnchorConstraintType.LEFT, AnchorConstraintType.MIDDLE], AnchorRatioType.NONE))
		this.setSpeak("meowwwwww (this is meowwing if you dont understand)");
		//do
		this.resize();
		//mechanic
    this.mechanic=new Mechanic(this, this.init, this.display);
    this.mechanic.addAction(SketchEvents.RESIZE, this.resize);
    //this.mechanic.addAction(SketchEvents.PRESS, this.action_press);
    //this.mechanic.addAction(SketchEvents.DRAG, this.action_drag);
    //this.mechanic.addAction(SketchEvents.WHEEL, this.action_wheel);
	};

	//mechaic
	resize() {
		this.anchor.resize();
		this.bubbleObject.resize();
	}

	kill() {
		this.mechanic.kill();
		this.bubbleObject.kill();
	}

	init() {

	};

	display() {
		this.random=Math.random();

		//head
    fill(ColorPalet.get(`byte_fill`));
    stroke(ColorPalet.get(`byte_straigth`));
    strokeWeight(1);
		rect(...this.anchor.pos([0,0]), ...this.anchor.size([1,1]));

    fill(ColorPalet.get(`byte_straigth`));
    noStroke();
		//hairs
    beginShape();
    vertex(...this.anchor.pos([0,0]));
    vertex(...this.anchor.pos([1/3,2/12]));
    vertex(...this.anchor.pos([1/3,1/12]));
    vertex(...this.anchor.pos([2/3,3/12]));
    vertex(...this.anchor.pos([2/3,1.5/12]));
    vertex(...this.anchor.pos([3/3,4/12]));
    vertex(...this.anchor.pos([1,0]));
    endShape(CLOSE);

		//expression
		let eyeType=ByteEyes.OPEN;
		let mouthType=ByteMouth.SHUT;
		
		//[
		
		//added
		let blink=Math.floor(this.random*20)===0;
		
		//emotion (cant multiples)
		let happy=false;
		let deady=false;
		let angry=false;
		let cuty=false;
		let bory=true;

		let blased=false;
		let satisfied=false;
		let ultraSatisfied=false;
		let contraried=false;

		let sayan=false;

		if (this.speaking)
		{
			if (this.expression_speak_time<5)
			{
				this.expression_speak_time+=Settings.SPEED;
			} else {
				if (this.expression_speak_time)
					this.expression_speak_time-=5;
				else
					this.expression_speak_time=0;
				this.expression_speak_mouth=ByteMouthSpeak[Math.floor(this.random*ByteMouthSpeak.length)];
			}
			mouthType=this.expression_speak_mouth;
		}
		
		if (satisfied)
			mouthType=ByteMouth.HAPPY;
		if (ultraSatisfied)
			mouthType=ByteMouth.LAUGTHY;
		if (contraried)
			mouthType=ByteMouth.SADDY;

		if (happy)
			eyeType=ByteEyes.HAPPY;
		if (angry)
			eyeType=ByteEyes.ANGRY;
		if (blink || blased)
			eyeType=ByteEyes.CLOSED;
		if (deady)
			eyeType=ByteEyes.DEADY;
		if (bory)
			eyeType=ByteEyes.BORY;
		if (cuty)
		{
			mouthType=ByteMouth.CUTY;
			eyeType=ByteEyes.CUTY;
		}
		if (sayan)
			eyeType=ByteEyes.SAYAN;
		//]
		
		//eyes
		this.draw_eye(false, eyeType);
		this.draw_eye(true, eyeType);
		//mouth
		this.draw_mouth(mouthType);
		//speak
		this.speakTick();
	};

	//draw
	draw_eye(isLeftElseRigth, type) {

		let eyeCenter=(isLeftElseRigth) ? [4/20,2/4] : [16/20,2/4];
		
		switch (type) 
		{
			case ByteEyes.OPEN:
			case ByteEyes.CLOSED:
			{
				let eyeSize=[1/50, 1/4];
				if (type===ByteEyes.CLOSED)
					eyeSize=[1/4, 1/50];
				rect(...this.anchor.pos([eyeCenter[0]-eyeSize[0]/2,eyeCenter[1]-eyeSize[1]/2]), ...this.anchor.size(eyeSize));
				return;
			}
			case ByteEyes.HAPPY:
			{
				const big=1/8;
		    beginShape();
				let slide=0;
		    vertex(...this.anchor.pos([eyeCenter[0]-big, eyeCenter[1]+slide]));
		    vertex(...this.anchor.pos([eyeCenter[0], eyeCenter[1]-big+slide]));
		    vertex(...this.anchor.pos([eyeCenter[0]+big, eyeCenter[1]+slide]));
				slide=2/50;
		    vertex(...this.anchor.pos([eyeCenter[0]+big, eyeCenter[1]+slide]));
		    vertex(...this.anchor.pos([eyeCenter[0], eyeCenter[1]-big+slide]));
		    vertex(...this.anchor.pos([eyeCenter[0]-big, eyeCenter[1]+slide]));
		    endShape(CLOSE);
				return;
			}
			case ByteEyes.DEADY:
			{
				const big=1/8;
		    beginShape();
				let slide=0;
		    vertex(...this.anchor.pos([eyeCenter[0]-big, eyeCenter[1]-big+slide]));
		    vertex(...this.anchor.pos([eyeCenter[0]+big, eyeCenter[1]+big+slide]));
				slide=2/50;
		    vertex(...this.anchor.pos([eyeCenter[0]+big, eyeCenter[1]+big+slide]));
		    vertex(...this.anchor.pos([eyeCenter[0]-big, eyeCenter[1]-big+slide]));
		    endShape(CLOSE);
		    beginShape();
				slide=0;
		    vertex(...this.anchor.pos([eyeCenter[0]-big, eyeCenter[1]+big+slide]));
		    vertex(...this.anchor.pos([eyeCenter[0]+big, eyeCenter[1]-big+slide]));
				slide=2/50;
		    vertex(...this.anchor.pos([eyeCenter[0]+big, eyeCenter[1]-big+slide]));
		    vertex(...this.anchor.pos([eyeCenter[0]-big, eyeCenter[1]+big+slide]));
		    endShape(CLOSE);
				return;
			}
		
		case (ByteEyes.ANGRY): {
				const big=1/8;
				let neg=(isLeftElseRigth) ? 1 : -1;

		    beginShape();
				let slide=0;
		    vertex(...this.anchor.pos([eyeCenter[0]+big*neg, eyeCenter[1]+slide]));
		    vertex(...this.anchor.pos([eyeCenter[0]-big*neg, eyeCenter[1]-big*1.5+slide]));
		    vertex(...this.anchor.pos([eyeCenter[0]-big*neg, eyeCenter[1]+slide]));
		    endShape(CLOSE);
				return;
			}

		case (ByteEyes.SHOKY): {
				let sizeses=this.anchor.size([1/10,1/10]);
				let ray=(sizeses[0]+sizeses[1])/2;

		    fill(ColorPalet.get(`byte_fill`));
		    stroke(ColorPalet.get(`byte_straigth`));
		    strokeWeight(1);
				circle(...this.anchor.pos(eyeCenter), ray*3);
				
		    fill(ColorPalet.get(`byte_straigth`));
		    noStroke();
				circle(...this.anchor.pos(eyeCenter), ray);
				return;
			}
			
		case (ByteEyes.CUTY): {
				let sizeses=this.anchor.size([1/10,1/10]);
				let ray=(sizeses[0]+sizeses[1])/2;
				let posCenter=this.anchor.pos(eyeCenter);

		    fill(ColorPalet.get(`byte_fill`));
		    stroke(ColorPalet.get(`byte_straigth`));
		    strokeWeight(1);
				circle(...this.anchor.pos(eyeCenter), ray*3);
				
		    fill(ColorPalet.get(`byte_straigth`));
		    noStroke();
				circle(...posCenter, ray*2);
				
		    fill(ColorPalet.get(`byte_fill`));
		    stroke(ColorPalet.get(`byte_straigth`));
		    strokeWeight(1);
				circle(...[posCenter[0], posCenter[1]], ray/1.2);
				circle(...[posCenter[0]+ray*1/4, posCenter[1]+ray*1/4], ray/2);
		    fill(ColorPalet.get(`byte_straigth`));
		    noStroke();
				return;
			}

			case (ByteEyes.BORY): {
				let eyeSize=[1/50, 1/4];
				rect(...this.anchor.pos([eyeCenter[0]-eyeSize[0]/2,eyeCenter[1]-eyeSize[1]/2]), ...this.anchor.size(eyeSize));
				eyeSize=[1/4, 1/50];
				eyeCenter[1]-=1/8;
				rect(...this.anchor.pos([eyeCenter[0]-eyeSize[0]/2,eyeCenter[1]-eyeSize[1]/2]), ...this.anchor.size(eyeSize));
				return;
			}

			case (ByteEyes.SAYAN): {

				let randomColorKey=Object.keys(ColorPalet.colors)[Math.floor(this.random*Object.keys(ColorPalet.colors).length)];
		    fill(ColorPalet.colors[randomColorKey]);
				let eyeSize=[1/50, 1/4];
				rect(...this.anchor.pos([eyeCenter[0]-eyeSize[0]/2,eyeCenter[1]-eyeSize[1]/2]), ...this.anchor.size(eyeSize));
		    fill(ColorPalet.get(`byte_straigth`));
		    noStroke();
				return;
			}
		}
		
	}

	draw_mouth(type) {

		let mouthCenter=[3/8, 14/16];

		switch (type)
		{
			case ByteMouth.SHUT: {
				let mouthSize=[1/4, 1/50];
				rect(...this.anchor.pos([mouthCenter[0]-mouthSize[0]/2,mouthCenter[1]-mouthSize[1]/2]), ...this.anchor.size(mouthSize));
				return;
			}
			case ByteMouth.OPEN1: {
				let mouthSize=[1/4, 1/16];
				rect(...this.anchor.pos([mouthCenter[0]-mouthSize[0]/2,mouthCenter[1]-mouthSize[1]/2]), ...this.anchor.size(mouthSize));
				return;
			}
			case ByteMouth.OPEN2: {
				let mouthSize=[1/8, 1/8];
				rect(...this.anchor.pos([mouthCenter[0]-mouthSize[0]/2,mouthCenter[1]-mouthSize[1]/2]), ...this.anchor.size(mouthSize));
				return;
			}
			case ByteMouth.OPEN3: {
				let sizeses=this.anchor.size([1/6,1/6]);
				circle(...this.anchor.pos(mouthCenter), (sizeses[0]+sizeses[1])/2);
				return;
			}
			case ByteMouth.OPEN4: {
				const big=1/8;
		    beginShape();
		    vertex(...this.anchor.pos([mouthCenter[0]+big, mouthCenter[1]-big/2]));
		    vertex(...this.anchor.pos([mouthCenter[0]+big, mouthCenter[1]+big/2]));
		    vertex(...this.anchor.pos([mouthCenter[0]-big, mouthCenter[1]]));
		    endShape(CLOSE);
				return;
			}
			case ByteMouth.LAUGTHY: {
				const big=1/10;
		    beginShape();
		    vertex(...this.anchor.pos([mouthCenter[0]-big, mouthCenter[1]-big]));
		    vertex(...this.anchor.pos([mouthCenter[0]+big, mouthCenter[1]-big]));
		    vertex(...this.anchor.pos([mouthCenter[0], mouthCenter[1]+big]));
		    endShape(CLOSE);
				return;
			}
			case ByteMouth.HAPPY:
			{
				const big=1/8;
		    beginShape();
				let slide=0;
		    vertex(...this.anchor.pos([mouthCenter[0]-big, mouthCenter[1]-big+slide]));
		    vertex(...this.anchor.pos([mouthCenter[0], mouthCenter[1]+slide]));
		    vertex(...this.anchor.pos([mouthCenter[0]+big, mouthCenter[1]-big+slide]));
				slide=2/50;
		    vertex(...this.anchor.pos([mouthCenter[0]+big, mouthCenter[1]-big+slide]));
		    vertex(...this.anchor.pos([mouthCenter[0], mouthCenter[1]+slide]));
		    vertex(...this.anchor.pos([mouthCenter[0]-big, mouthCenter[1]-big+slide]));
		    endShape(CLOSE);
				return;
			}
			case ByteMouth.SADDY:
			{
				const big=1/8;
		    beginShape();
				let slide=0;
		    vertex(...this.anchor.pos([mouthCenter[0]-big, mouthCenter[1]+slide]));
		    vertex(...this.anchor.pos([mouthCenter[0], mouthCenter[1]-big+slide]));
		    vertex(...this.anchor.pos([mouthCenter[0]+big, mouthCenter[1]+slide]));
				slide=2/50;
		    vertex(...this.anchor.pos([mouthCenter[0]+big, mouthCenter[1]+slide]));
		    vertex(...this.anchor.pos([mouthCenter[0], mouthCenter[1]-big+slide]));
		    vertex(...this.anchor.pos([mouthCenter[0]-big, mouthCenter[1]+slide]));
		    endShape(CLOSE);
				return;
			}
			case ByteMouth.CUTY:
			{
				const big=3/16;
		    fill(ColorPalet.get(`byte_fill`));
		    stroke(ColorPalet.get(`byte_straigth`));
		    strokeWeight(1);
				arc(...this.anchor.pos([mouthCenter[0]-big*1/2, mouthCenter[1]-big/2]), ...this.anchor.size([big, big]), 0, PI);
				arc(...this.anchor.pos([mouthCenter[0]+big*1/2, mouthCenter[1]-big/2]), ...this.anchor.size([big, big]), 0, PI);
		    fill(ColorPalet.get(`byte_straigth`));
		    noStroke();
				return;
			}
		}
	}

	setSpeak(text)
	{
		this.speaking=true;
		this.speak_text=text;
		this.speak_index=0;
		this.speak_fraction=0;
		this.speak_speed=1/2;
		
		this.bubbleObject.changeText("", this.speak_text);
	}

	speakTick()
	{
		if (!this.speaking) return;
		
		this.speak_fraction+=this.speak_speed*Settings.SPEED;
		let addedCharIndex=Math.floor(this.speak_fraction);
		if (addedCharIndex<1) return;
		this.speak_fraction-=addedCharIndex;

		this.speak_index+=addedCharIndex;
		if (this.speak_index>=this.speak_text.length)
		{
			this.speak_index=this.speak_text.length;
			this.speaking=false;
		}

		console.log("this.speak_index:",this.speak_index,"/",this.speak_text.length);
		this.bubbleObject.changeText(this.speak_text.slice(0, this.speak_index), this.speak_text.slice(this.speak_index, this.speak_text.length));
	}

}

class ByteBubble {
	static iterator=0;
	constructor(anchor) {
		//self
		this.anchor=anchor;
		this.id="generated_D"+String(ByteBubble.iterator++);
		//html
		this.bubbleElement=document.createElement("div");
		this.bubbleElement.className="bubble-out";
		this.bubbleElement.id=this.id;
		
		this.speak_textElement=document.createElement("p");
		this.speak_textElement.className="bubble-text";
		this.speak_textElement.textContent= "this is ";
		
		this.speak_textHiddenDiv=document.createElement("span");
		this.speak_textHiddenDiv.className="writting-text";
		this.speak_textHiddenDiv.textContent="hidden";

		this.speak_textElement.appendChild(this.speak_textHiddenDiv);
		this.bubbleElement.appendChild(this.speak_textElement);
		//css
		this.bubbleElement.style.position="absolute";
		this.bubbleElement.style.overflow="hidden";
		//do
	  document.getElementById("generator").appendChild(this.bubbleElement);
		this.resize();
	};

	resize() {
		this.anchor.resize();
		//size
		this.bubbleElement.style.left=parseInt(this.anchor.topCoord[0])+"px";
		this.bubbleElement.style.top=parseInt(this.anchor.topCoord[1])+"px";
		this.bubbleElement.style.width=parseInt(this.anchor.sizeCoord[0])+"px";
		this.bubbleElement.style.height=parseInt(this.anchor.sizeCoord[1])+"px";
		
	  {//fitTextToContainer
			const minFontSize=.1;
			const maxFontSize=2;
			const step=.1;

	    let fontSize = maxFontSize; // Start with a base font size
	    // Reduce font size until it fits within the container
			do {
				console.log("fontSize:",fontSize);
	      fontSize -= step; // Reduce font size
	      this.speak_textElement.style.fontSize = `${fontSize}vw`;

	      // Prevent font size from going too small
	      if (fontSize < minFontSize) {
	        this.speak_textElement.style.fontSize = `${minFontSize}vw`; // Set a minimum font size
	        break;
	      }
	    }
	    while (
	      this.speak_textElement.scrollHeight > this.bubbleElement.offsetHeight || // Text exceeds container height
	      this.speak_textElement.scrollWidth > this.bubbleElement.offsetWidth // Text exceeds container width
	    ) 
	  }
	}

	kill()
	{
  	document.getElementById(this.id).remove();//all others are childs
	}

	changeText(textShown, textHidden)
	{
		this.speak_textElement.textContent=textShown;
		this.speak_textHiddenDiv.textContent=textHidden;
		this.speak_textElement.appendChild(this.speak_textHiddenDiv);
		this.resize();
	}
}