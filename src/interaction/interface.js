function interfaceSwitchStyle(element)
{
	ColorPalet.switch(element.value);
}

var interface_restart_id_dim=null;
function interfaceRestart()
{
	Settings.RULE_BOX_D=parseInt(document.getElementById(interface_restart_id_dim).value);
	Mechanic.event(SketchEvents.INIT);
}