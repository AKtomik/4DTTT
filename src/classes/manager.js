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
			mechanic.action[eventType].method.call(mechanic.object)
	}
	
	static eventWithObject(eventType, eventObject)
	{
		for (let mechanic of Mechanic.eventLisener[eventType])
			mechanic.action[eventType].method.call(mechanic.object, eventObject)
	}

	constructor(object, initMethod, displayMethod)
	{//add mechanic
		this.object=object;//object is argument when event action function
		
		//actions
		this.action= {};
		if (initMethod)
			this.addAction(SketchEvents.INIT, initMethod, 0);
		if (displayMethod)
			this.addAction(SketchEvents.DISPLAY, displayMethod, 0);

		//init
		if (Mechanic.inited && initMethod)
			initMethod.call(this.object);
	}

	addAction(eventType, actionedMethod, actionPriority=0)
	{
		this.action[eventType]={method: actionedMethod, proiority:actionPriority};
		Mechanic.eventLisener[eventType].push(this);
		//! todo: sort by priority
	}
	
	removeAction(eventType)
	{
		delete this.action[eventType];
		Mechanic.eventLisener[eventType]=Mechanic.eventLisener[eventType].filter((v) => v!==this);
	}
	
	killActions()
	{
		for (let action in this.action)
		{
			this.removeAction(action);
		}
	}
};