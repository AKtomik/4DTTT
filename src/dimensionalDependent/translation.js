
class MatrixTranslation {
	static identity_around=new Matrix(4,4).build_identity();

	constructor(matrix, if_aroundCenter=false, if_powerInPos=false, power_calibration= (matrix, power) => matrix)
	{
		this.matrix=matrix;
		this.center_around=if_aroundCenter;
		this.power_isLastPos=if_powerInPos;
		this.calibration=power_calibration;
	}
	calibrate(power)
	{
		//this.matrix=
		this.calibration(this.matrix, power);
	}
	translate(pos, power, center)
	{
		let posMatrix=new Matrix(4, 1).set_column(0, [pos[0], pos[1], pos[2], (this.power_isLastPos) ? power : 1]);
		
		if (this.center_around)
		{//move origin to center
			posMatrix=MatrixTranslation.identity_around.set_column(3, [-center[0], -center[1], -center[2], 1]).multiply_with(posMatrix);
		}

		posMatrix=this.matrix.multiply_with(posMatrix);
		
		if (this.center_around)
		{//move back
			posMatrix=MatrixTranslation.identity_around.set_column(3, [center[0], center[1], center[2], 1]).multiply_with(posMatrix);
		}

		return posMatrix.data.slice(0,3);//return as a point
	}
};

const matrix_identity = new Matrix(4,4).build_identity();
const matrix_strength = .1*Settings.SPEED;
const matrix_angle = Math.PI/32*Settings.SPEED;

const matrix_3D_translations = {
	//move
	"x<->": new MatrixTranslation(matrix_identity.copy().set_column(3, [matrix_strength,0,0,1]), false, true),
	"y<->": new MatrixTranslation(matrix_identity.copy().set_column(3, [0,matrix_strength,0,1]), false, true),
	"z<->": new MatrixTranslation(matrix_identity.copy().set_column(3, [0,0,matrix_strength,1]), false, true),
	//rotation
	"x/": new MatrixTranslation(matrix_identity.copy(), true, false, (matrix, power) => matrix.set_at(1,1,Math.cos(matrix_angle*power)).set_at(2,2,Math.cos(matrix_angle*power)).set_at(1,2,Math.sin(matrix_angle*power)).set_at(2,1,-Math.sin(matrix_angle*power))),
	"y/": new MatrixTranslation(matrix_identity.copy(), true, false, (matrix, power) => matrix.set_at(0,0,Math.cos(matrix_angle*power)).set_at(2,2,Math.cos(matrix_angle*power)).set_at(0,2,-Math.sin(matrix_angle*power)).set_at(2,0,Math.sin(matrix_angle*power))),
	"z/": new MatrixTranslation(matrix_identity.copy(), true, false, (matrix, power) => matrix.set_at(0,0,Math.cos(matrix_angle*power)).set_at(1,1,Math.cos(matrix_angle*power)).set_at(0,1,Math.sin(matrix_angle*power)).set_at(1,0,-Math.sin(matrix_angle*power))),
	//bonus
	"x/me": new MatrixTranslation(matrix_identity.copy(), false, false, (matrix, power) => matrix.set_at(1,1,Math.cos(matrix_angle*power/4)).set_at(2,2,Math.cos(matrix_angle*power/4)).set_at(1,2,Math.sin(matrix_angle*power/4)).set_at(2,1,-Math.sin(matrix_angle*power/4))),
	"y/me": new MatrixTranslation(matrix_identity.copy(), false, false, (matrix, power) => matrix.set_at(0,0,Math.cos(matrix_angle*power/4)).set_at(2,2,Math.cos(matrix_angle*power/4)).set_at(0,2,-Math.sin(matrix_angle*power/4)).set_at(2,0,Math.sin(matrix_angle*power/4))),
	"z/me": new MatrixTranslation(matrix_identity.copy(), false, false, (matrix, power) => matrix.set_at(0,0,Math.cos(matrix_angle*power/4)).set_at(1,1,Math.cos(matrix_angle*power/4)).set_at(0,1,Math.sin(matrix_angle*power/4)).set_at(1,0,-Math.sin(matrix_angle*power/4))),
};

const move_to_keycode = {
	"x<->": {negative: 81, positive: 68},
	"y<->": {negative: 69, positive: 65},
	"z<->": {negative: 83, positive: 90},
	
	"x/": {positive: 87},
	"y/": {positive: 88},
	"z/": {positive: 67},
	
	"x/me": {positive: 73},
	"y/me": {positive: 79},
	"z/me": {positive: 80},
};

let keycode_to_move = {};

function translation_key_3D_cube(keyEvent, game)
{
	const translationKey=keycode_to_move[keyEvent.keyCode]?.translationKey;
	//console.log("keypress to move perspective:",keycode_to_move[keyEvent.keyCode]);
	if (!translationKey)
		return;
	if (keyEvent.repeat)
		return;
	const sign=(keycode_to_move[keyEvent.keyCode].oppose) ? -1 : 1;
	const power=Settings.VELOCITY_ADD_PUSH*(sign)*Settings.SPEED;
	if (game.grid.velocity[translationKey]*sign<0)
	{
		game.grid.velocity[translationKey]=0;
	}
	game.grid.velocity[translationKey]+=power;
}

function translation_drag_3D_cube(dragEvent, game)
{
	//console.log("drag to move perspective:",dragEvent);
	const mouseVector=[winMouseX-pwinMouseX, winMouseY-pwinMouseY];
	const translations={
		"x/":-mouseVector[1]/Scale.y(1000),
		"y/":mouseVector[0]/Scale.x(1000)
	};
	for (let translationKey in translations)
	{
		const power=Settings.VELOCITY_ADD_DRAG*(translations[translationKey])*Settings.SPEED;
		if (game.grid.velocity[translationKey]*(Math.abs(power)/power)<=0)
		{
			game.grid.velocity[translationKey]=0;
		}
		game.grid.velocity[translationKey]+=power;
	}
}

function translation_init_3D_cube(grid)
{
	for (let moveKey of Object.keys(move_to_keycode))
	{
		grid.velocity[moveKey]=0;
		if (move_to_keycode[moveKey].positive)
			keycode_to_move[move_to_keycode[moveKey].positive]={translationKey: moveKey, oppose: false};
		if (move_to_keycode[moveKey].negative)
			keycode_to_move[move_to_keycode[moveKey].negative]={translationKey: moveKey, oppose: true};
	}
}


function translation_draw_3D_cube(grid)
{
	for (let moveKey of Object.keys(move_to_keycode))
	{
		const down_postivie=keyIsDown(move_to_keycode[moveKey].positive);
		const down_negative=keyIsDown(move_to_keycode[moveKey].negative);
		if (down_postivie)
		{
			grid.velocity[moveKey]+=Settings.VELOCITY_ADD_REMAIN*Settings.SPEED;
		}
		if (down_negative)
		{
			grid.velocity[moveKey]-=Settings.VELOCITY_ADD_REMAIN*Settings.SPEED;
		}

		if (grid.velocity[moveKey]!==0)
		{
			if (!down_negative && !down_postivie)
			{
				const sign=(grid.velocity[moveKey]>0) ? 1 : -1;
				grid.velocity[moveKey]=(grid.velocity[moveKey]*Math.pow(Settings.VELOCITY_FRICTION_Q,Settings.SPEED))-(Settings.VELOCITY_FRICTION_R*sign*Settings.SPEED);
				if (!(grid.velocity[moveKey]*sign>0))
				{
					grid.velocity[moveKey]=0;
				}
			}
			const power=grid.velocity[moveKey];
			if (power)
			{
				//find matrix
				const translationObject=matrix_3D_translations[moveKey];
				//console.log(`move with matrix: ${translationObject.matrix}`);

				//do the translation
				translationObject.calibrate(power);
			  for (let posKey of game.grid.map_keys)
			  {
			    const h_box = grid.at(posKey);
					h_box.morph.each(pos => translationObject.translate(pos, power, grid.center));
				}
				grid.center=translationObject.translate(grid.center, power, grid.center);
			}

		}
	}
}