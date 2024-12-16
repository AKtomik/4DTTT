function interfaceSwitchStyle(element)
{
	ColorPalet.switch(element.value);
}

var interface_restart_id_dim=null;
function interfaceRestart()
{
  console.log("interface_restart_id_dim:",interface_restart_id_dim);
	Settings.RULE_BOX_D=parseInt(document.getElementById(interface_restart_id_dim).value);
	console.log(Settings.RULE_BOX_D, typeof(Settings.RULE_BOX_D));
	Mechanic.event(SketchEvents.INIT);
}