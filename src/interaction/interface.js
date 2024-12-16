function interfaceSwitchStyle(element)
{
	ColorPalet.switch(element.value);
}

var interface_restart_id_dim=null;
var interface_restart_id_width=null;
function interfaceRestart()
{
	Settings.RULE_BOX_D=parseInt(document.getElementById(interface_restart_id_dim).value);
	Settings.RULE_BOX_WIDTH=parseInt(document.getElementById(interface_restart_id_width).value);
	Mechanic.event(SketchEvents.INIT);
}