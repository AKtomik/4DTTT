function translation_key_3D_cube(keyEvent, game)
{
	console.log("keypress to move perspective with keyCode:",keyEvent.keyCode);
	const translationMove=key_to_move[keyEvent.keyCode];
	if (!translationMove)
		return;
	if (keyEvent.repeat)
		return;
	const power=Settings.VELOCITY_ADD_PUSH;
	game.grid.velocity[translationMove]+=power;
}
function translation_init_3D_cube(grid)
{
	for (let moveKey of Object.keys(matrix_3D_translations))
	{
		grid.velocity[moveKey]=0;
	}
}


function translation_draw_3D_cube(grid)
{
	for (let keyCode of Object.keys(key_to_move))
	{
		let moveKey=key_to_move[keyCode];
		const down=keyIsDown(keyCode);
		if (down)
		{
			grid.velocity[moveKey]+=Settings.VELOCITY_ADD_REMAIN;
		}

		if (grid.velocity[moveKey]>.001)
		{
			const power=grid.velocity[moveKey];
			if (!down)
			{
				grid.velocity[moveKey]=(grid.velocity[moveKey]*Settings.VELOCITY_FRICTION_Q)+Settings.VELOCITY_FRICTION_R;//! can be negative but that not really a problem
			}

			//find matrix
			const translationObject=matrix_3D_translations[moveKey];
			//console.log(`move with matrix: ${translationObject.matrix}`);

			//do the translation
		  for (let posKey of game.grid.map_keys)
		  {
		    const h_box = grid.at(posKey);
				for (let i=0;i<h_box.morph.get_quadri_amount();i+=1)
				{
					let quadri = h_box.morph.get_quadri(i);
					quadri=quadri.map(pos => translationObject.translate(pos, power, grid.center));
					h_box.morph.set_quadri(i, quadri);
				}
			}
			if (translationObject[1])
			console.log("move to center:",grid.center);
			grid.center=translationObject.translate(grid.center, power, grid.center);
		}
	}
}


const matrix_identity = new Matrix(4,4).build_identity();
const matrix_strength = .5;
const matrix_angle = Math.PI/16;

const key_to_move = {
	81:"x-",
	68:"x+",
	
	90:"y-",
	83:"y+",
	
	65:"z-",
	69:"z+",

	87:"x>",
	88:"y>",
	67:"z>",
}
class MatrixTranslation {
	constructor(matrix, if_aroundCenter=false, if_powerInPos=false, if_powerCalibre=false, power_calibration= (matrix, power) => matrix)
	{
		this.matrix=matrix;
		this.center_around=if_aroundCenter;
		this.power_calibrate=if_powerCalibre;
		this.power_isLastPos=if_powerInPos;
		this.calibration=power_calibration;
	}
	translate(pos, power, center)
	{
		let posMatrix=new Matrix(4, 1).set_column(0, [pos[0], pos[1], pos[2], (this.power_isLastPos) ? power : 1]);
		
		if (this.center_around)
		{//move origin to center
			posMatrix=matrix_identity.copy().set_column(3, [-center[0], -center[1], -center[2], 1]).multiply_with(posMatrix);
		}
		
		if (this.power_calibrate)
		{//redefine matrix itself. modification must redefine same points each time.
			this.matrix=this.calibration(this.matrix, power);
		}

		posMatrix=this.matrix.multiply_with(posMatrix);
		
		if (this.center_around)
		{//move back
			posMatrix=matrix_identity.copy().set_column(3, [center[0], center[1], center[2], 1]).multiply_with(posMatrix);
		}

		return posMatrix.data.slice(0,3);//return as a point
	}
};
const matrix_3D_translations = {
	"x-": new MatrixTranslation(matrix_identity.copy().set_column(3, [-matrix_strength,0,0,1]), false, true, false),
	"x+": new MatrixTranslation(matrix_identity.copy().set_column(3, [matrix_strength,0,0,1]), false, true, false),
	
	"y-": new MatrixTranslation(matrix_identity.copy().set_column(3, [0,0,matrix_strength,1]), false, true, false),
	"y+": new MatrixTranslation(matrix_identity.copy().set_column(3, [0,0,-matrix_strength,1]), false, true, false),
	
	"z-": new MatrixTranslation(matrix_identity.copy().set_column(3, [0,-matrix_strength,0,1]), false, true, false),
	"z+": new MatrixTranslation(matrix_identity.copy().set_column(3, [0,matrix_strength,0,1]), false, true, false),

	"x>": new MatrixTranslation(matrix_identity.copy(), true, false, true, (matrix, power) => matrix.set_at(1,1,Math.cos(matrix_angle)).set_at(2,2,Math.cos(matrix_angle*power)).set_at(1,2,Math.sin(matrix_angle*power)).set_at(2,1,-Math.sin(matrix_angle*power))),
	"y>": new MatrixTranslation(matrix_identity.copy(), true, false, true, (matrix, power) => matrix.set_at(0,0,Math.cos(matrix_angle)).set_at(2,2,Math.cos(matrix_angle*power)).set_at(0,2,-Math.sin(matrix_angle*power)).set_at(2,0,Math.sin(matrix_angle*power))),
	"z>": new MatrixTranslation(matrix_identity.copy(), true, false, true, (matrix, power) => matrix.set_at(0,0,Math.cos(matrix_angle)).set_at(1,1,Math.cos(matrix_angle*power)).set_at(0,1,Math.sin(matrix_angle*power)).set_at(1,0,-Math.sin(matrix_angle*power)))
}