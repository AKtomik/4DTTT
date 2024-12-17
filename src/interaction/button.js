class HtmlButton {
	//static htmlRoot=document.getElementById("generator");
	static iterator=0;

	//build
	constructor(htmlElementType="button", pos=[0,0], childs=[document.createTextNode("<childless>")]) {
		//self
		this.position=pos;
		this.id="generated_B"+String(HtmlButton.iterator++);
		//html
		this.element=document.createElement(htmlElementType);
		this.element.id=this.id;
		this.element.append(...childs);
		//css
		this.element.style.position="absolute";
		this.element.style.transform="translate(-50%,-50%)";
		//do
	  document.getElementById("generator").appendChild(this.element);
		this.resize();
		//mechanic
		this.mechanic=new Mechanic(this);
		this.mechanic.addAction(SketchEvents.RESIZE, this.resize);
	}

	onClick(code=()=>{}, killWhenDone=false)
	{
		//js
		this.element.onclick= ()=>{
			if (killWhenDone) this.kill();
			code();
		}
	};
	
	onChange(code=()=>{}, selfToCodeParameter)
	{
		//js
		if (selfToCodeParameter) {
			this.element.onchange= ()=>code(this.element);
		} else {
			this.element.onchange= ()=>code();
		}
	};
	
	//call
	resize() {
		this.element.style.left=parseInt(Scale.x(this.position[0]))+"px";
		this.element.style.top=parseInt(Scale.y(this.position[1]))+"px";
	};

	kill() {
	  document.getElementById(this.id).remove();
		this.mechanic.kill();
		//shound be removed by garbage collector
	};
};