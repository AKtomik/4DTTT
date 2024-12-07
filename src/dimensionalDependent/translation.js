
function translation_cube_key(keyEvent, game)
{
	console.log("keypress to move perspective with key:",keyEvent.key);
	const translationMatrix=matrix_3D_translations[keyEvent.key];
	const power=1;
	if (!translationMatrix)
		return;
	console.log(`move with matrix: ${translationMatrix}`);

	//do the translation
  for (let posKey of game.grid.map_keys)
  {
    const h_box = grid.at(posKey);
		for (let i=0;i<h_box.morph.get_quadri_amount();i+=1)
		{
			let quadri = h_box.morph.get_quadri(i);
			quadri=quadri.map(pos => pos=translationMatrix.multiply_with(new Matrix(4, 1).set_column(0, [pos[0], pos[1], pos[2], power])).data.slice(0,3));
			h_box.morph.set_quadri(i, quadri);
		}
	}
}
const matrix_identity = new Matrix(4,4).build_identity();
const matrix_3D_translations = {
	"q": matrix_identity.copy().set_column(3, [-.5,0,0,1]),
	"d": matrix_identity.copy().set_column(3, [.5,0,0,1]),
	"z": matrix_identity.copy().set_column(3, [0,0,.5,1]),
	"s": matrix_identity.copy().set_column(3, [0,0,-.5,1]),
	"a": matrix_identity.copy().set_column(3, [0,-.5,0,1]),
	"e": matrix_identity.copy().set_column(3, [0,.5,0,1])
}