class SketchEvents {
	static INIT=0;
	static DISPLAY=1;
	
	static PRESS=2;
	static CLICK=3;
	static DRAG=4;
	static WHEEL=5;
}


class Mechanic {

	static eventLisener={};
	static inited=false;

	static prepare()
	{//must be executed before anyone here
		for (let eventType in SketchEvents)
			Mechanic.eventLisener[SketchEvents[eventType]]=[]//array of mechanic
	}
	
	static init()
	{
		Mechanic.inited=true;
	}

	static event(eventType)
	{//do action
		for (let mechanic of Mechanic.eventLisener[eventType])
			mechanic.action[eventType].function(mechanic.object)
	}
	
	static eventWithObject(eventType, eventObject)
	{
		for (let mechanic of Mechanic.eventLisener[eventType])
			mechanic.action[eventType].function(eventObject, mechanic.object)
	}

	constructor(object, initFunction, displayFunction)
	{//add mechanic
		this.object=object;//object is argument when event action function
		
		//actions
		this.action= {};
		if (initFunction)
			this.addAction(SketchEvents.INIT, initFunction, 0);
		if (displayFunction)
			this.addAction(SketchEvents.DISPLAY, displayFunction, 0);

		//init
		if (Mechanic.inited)
			initFunction(this.object);
	}

	addAction(eventType, actionedFunction, actionPriority=0)
	{
		this.action[eventType]={function: actionedFunction, proiority:actionPriority};
		Mechanic.eventLisener[eventType].push(this);
		//! todo: sort by priority
	}
	
	removeAction(eventType)
	{
		delete this.action[eventType];
		Mechanic.eventLisener[eventType].remove(this);
	}
};