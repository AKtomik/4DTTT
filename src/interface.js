function interfaceSwitchStyle(value)
{
	ColorPalet.switch(value);
}

function interfaceRestart()
{
	Settings.RULE_BOX_D=parseInt(document.getElementById("inter_dim").value);
	Mechanic.event(SketchEvents.INIT);
}