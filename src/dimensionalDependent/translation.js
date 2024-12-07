
function translation_cube_key(keyEvent, game)
{
	console.log("keypress to move perspective with key:",keyEvent.key);
	const translationMatrix=matrix_3D_translations[keyEvent.key];
	const power=1;
	if (!translationMatrix)
		return;
	console.log(`move with matrix: ${translationMatrix[0]}`);

	//do the translation
  for (let posKey of game.grid.map_keys)
  {
    const h_box = grid.at(posKey);
		for (let i=0;i<h_box.morph.get_quadri_amount();i+=1)
		{
			let quadri = h_box.morph.get_quadri(i);
			quadri=quadri.map(pos => translation_cube_key_translate(pos, translationMatrix, power, grid.center));
			h_box.morph.set_quadri(i, quadri);
		}
	}
	grid.center=translation_cube_key_translate(grid.center, translationMatrix, power);
}
function translation_cube_key_translate(pos, translationMatrix, power, center)
{
	let posMatrix=new Matrix(4, 1).set_column(0, [pos[0], pos[1], pos[2], power]);
	if (translationMatrix[1])
	{//move origin to center
		posMatrix=matrix_identity.copy().set_column(3, [-center[0], -center[1], -center[2], 1]).multiply_with(posMatrix);
	}
	posMatrix=translationMatrix[0].multiply_with(posMatrix);
	if (translationMatrix[1])
	{//move back
		posMatrix=matrix_identity.copy().set_column(3, [center[0], center[1], center[2], 1]).multiply_with(posMatrix);
	}
	return posMatrix.data.slice(0,3);
}


const matrix_identity = new Matrix(4,4).build_identity();
const matrix_strength = .5;
const matrix_angle = Math.PI/16;
const matrix_3D_translations = {
	"q": [matrix_identity.copy().set_column(3, [-matrix_strength,0,0,1]),false],
	"d": [matrix_identity.copy().set_column(3, [matrix_strength,0,0,1]),false],
	
	"z": [matrix_identity.copy().set_column(3, [0,0,matrix_strength,1]),false],
	"s": [matrix_identity.copy().set_column(3, [0,0,-matrix_strength,1]),false],
	
	"a": [matrix_identity.copy().set_column(3, [0,-matrix_strength,0,1]),false],
	"e": [matrix_identity.copy().set_column(3, [0,matrix_strength,0,1]),false],

	"w": [matrix_identity.copy().set_at(1,1,Math.cos(matrix_angle)).set_at(2,2,Math.cos(matrix_angle)).set_at(1,2,Math.sin(matrix_angle)).set_at(2,1,-Math.sin(matrix_angle)),true],
	"x": [matrix_identity.copy().set_at(0,0,Math.cos(matrix_angle)).set_at(2,2,Math.cos(matrix_angle)).set_at(0,2,-Math.sin(matrix_angle)).set_at(2,0,Math.sin(matrix_angle)),true],
	"c": [matrix_identity.copy().set_at(0,0,Math.cos(matrix_angle)).set_at(1,1,Math.cos(matrix_angle)).set_at(0,1,Math.sin(matrix_angle)).set_at(1,0,-Math.sin(matrix_angle)),true]
}