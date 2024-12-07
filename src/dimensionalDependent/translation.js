
function translation_cube_key(keyEvent, game)
{
	console.log("keypress to move perspective with key:",keyEvent.key);
	//add distance
  for (let posKey of game.grid.map_keys)
  {
    const h_box = grid.at(posKey);
		for (let i=0;i<h_box.morph.get_quadri_amount();i+=1)
		{
			let quadri = h_box.morph.get_quadri(i);
			quadri=quadri.map(pos => pos[1]+=0.1);
		}
	}
}
const prespective_press_3D_cube_translations = {
	"ArrowLeft": []
}