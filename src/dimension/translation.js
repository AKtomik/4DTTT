
class MatrixTranslation {
	static identity_around={};

	constructor(dim, matrix, if_aroundCenter=false, if_powerInPos=false, power_calibration= (matrix, power) => matrix)
	{
		this.dim=dim;
		this.matrix=matrix;
		this.center_around=if_aroundCenter;
		this.power_isLastPos=if_powerInPos;
		this.calibration=power_calibration;
		MatrixTranslation.identity_around[dim]=new Matrix(dim+1,dim+1).build_identity()
	}
	calibrate(power)
	{
		//this.matrix=
		this.calibration(this.matrix, power);
	}
	translate(pos, power, center)
	{
		let posMatrix=new Matrix(this.dim+1, 1).set_column(0, [...pos.slice(0, this.dim), (this.power_isLastPos) ? power : 1]);
		
		if (this.center_around)
		{//move origin to center
			posMatrix=MatrixTranslation.identity_around[this.dim].set_column(this.dim, [...center.slice(0, this.dim).map((v) => -v), 1]).multiply_with(posMatrix);
		}

		posMatrix=this.matrix.multiply_with(posMatrix);
		
		if (this.center_around)
		{//move back
			posMatrix=MatrixTranslation.identity_around[this.dim].set_column(this.dim, [...center.slice(0, this.dim), 1]).multiply_with(posMatrix);
		}

		//return posMatrix.data.slice(0,3);//return as a point
		for (let i in Array.from(new Array(this.dim).keys()))
			pos[i]=posMatrix.data[i];
		return pos;
	}
};

const matrix_ND_strength = .1*Settings.SPEED;
const matrix_ND_angle = Math.PI/32*Settings.SPEED;

const matrix_translations = {
	//move
	"x<->": new MatrixTranslation(3, new Matrix(4,4).build_identity().set_column(3, [matrix_ND_strength,0,0,1]), false, true),
	"y<->": new MatrixTranslation(3, new Matrix(4,4).build_identity().set_column(3, [0,matrix_ND_strength,0,1]), false, true),
	"z<->": new MatrixTranslation(3, new Matrix(4,4).build_identity().set_column(3, [0,0,matrix_ND_strength,1]), false, true),
	"w<->": new MatrixTranslation(4, new Matrix(5,5).build_identity().set_column(4, [0,0,0,matrix_ND_strength,1]), false, true),
	//rotation
	//3D
	"x/": new MatrixTranslation(3, new Matrix(4,4).build_identity(), true, false, (matrix, power) => matrix.set_at(1,1,Math.cos(matrix_ND_angle*power)).set_at(2,2,Math.cos(matrix_ND_angle*power)).set_at(1,2,Math.sin(matrix_ND_angle*power)).set_at(2,1,-Math.sin(matrix_ND_angle*power))),
	"y/": new MatrixTranslation(3, new Matrix(4,4).build_identity(), true, false, (matrix, power) => matrix.set_at(0,0,Math.cos(matrix_ND_angle*power)).set_at(2,2,Math.cos(matrix_ND_angle*power)).set_at(0,2,-Math.sin(matrix_ND_angle*power)).set_at(2,0,Math.sin(matrix_ND_angle*power))),
	"z/": new MatrixTranslation(3, new Matrix(4,4).build_identity(), true, false, (matrix, power) => matrix.set_at(0,0,Math.cos(matrix_ND_angle*power)).set_at(1,1,Math.cos(matrix_ND_angle*power)).set_at(0,1,Math.sin(matrix_ND_angle*power)).set_at(1,0,-Math.sin(matrix_ND_angle*power))),
	//4D
	"wx/": new MatrixTranslation(4, new Matrix(5,5).build_identity(), true, false, (matrix, power) => matrix.set_at(0,0,Math.cos(matrix_ND_angle*power)).set_at(0,3,Math.sin(matrix_ND_angle*power)).set_at(3,0,-Math.sin(matrix_ND_angle*power)).set_at(3,3,Math.cos(matrix_ND_angle*power))),
	"wy/": new MatrixTranslation(4, new Matrix(5,5).build_identity(), true, false, (matrix, power) => matrix.set_at(1,1,Math.cos(matrix_ND_angle*power)).set_at(1,3,Math.sin(matrix_ND_angle*power)).set_at(3,1,-Math.sin(matrix_ND_angle*power)).set_at(3,3,Math.cos(matrix_ND_angle*power))),
	"wz/": new MatrixTranslation(4, new Matrix(5,5).build_identity(), true, false, (matrix, power) => matrix.set_at(2,2,Math.cos(matrix_ND_angle*power)).set_at(2,3,Math.sin(matrix_ND_angle*power)).set_at(3,2,-Math.sin(matrix_ND_angle*power)).set_at(3,3,Math.cos(matrix_ND_angle*power))),
	//sphere
	"x/me": new MatrixTranslation(3, new Matrix(4,4).build_identity(), false, false, (matrix, power) => matrix.set_at(1,1,Math.cos(matrix_ND_angle*power/4)).set_at(2,2,Math.cos(matrix_ND_angle*power/4)).set_at(1,2,Math.sin(matrix_ND_angle*power/4)).set_at(2,1,-Math.sin(matrix_ND_angle*power/4))),
	"y/me": new MatrixTranslation(3, new Matrix(4,4).build_identity(), false, false, (matrix, power) => matrix.set_at(0,0,Math.cos(matrix_ND_angle*power/4)).set_at(2,2,Math.cos(matrix_ND_angle*power/4)).set_at(0,2,-Math.sin(matrix_ND_angle*power/4)).set_at(2,0,Math.sin(matrix_ND_angle*power/4))),
	"z/me": new MatrixTranslation(3, new Matrix(4,4).build_identity(), false, false, (matrix, power) => matrix.set_at(0,0,Math.cos(matrix_ND_angle*power/4)).set_at(1,1,Math.cos(matrix_ND_angle*power/4)).set_at(0,1,Math.sin(matrix_ND_angle*power/4)).set_at(1,0,-Math.sin(matrix_ND_angle*power/4))),
};


const move_to_keycode = {
	"x<->": {negative: 70, positive: 72},
	"y<->": {negative: 84, positive: 71},
	"z<->": {negative: 82, positive: 89},
	"w<->": {negative: 78, positive: 66},
	
	"x/": {positive: 90, negative: 83},
	"y/": {positive: 68, negative: 81},
	"z/": {positive: 65, negative: 69},
	
	"wx/": {positive: 86},
	"wy/": {positive: 67},
	"wz/": {positive: 87, negative: 88},
	
	"x/me": {positive: 73},
	"y/me": {positive: 79},
	"z/me": {positive: 80},
};

const move_aviable = {};//will contains only aviables mooves

let keycode_to_move = {};

function translation_key_nD(keyEvent, game)
{
	const translationKey=keycode_to_move[keyEvent.keyCode]?.translationKey;
	if (!translationKey || !(move_aviable[translationKey]) || keyEvent.repeat)
		return;
	const sign=(keycode_to_move[keyEvent.keyCode].oppose) ? -1 : 1;
	translation_add_strength(game.grid.velocity, translationKey, Settings.VELOCITY_ADD_PUSH*Settings.SPEED*sign);
}

function translation_drag_nD(dragEvent, game)
{
	const mouseVector=[winMouseX-pwinMouseX, winMouseY-pwinMouseY];
	const translations={
		"x/":-mouseVector[1]/Scale.y(1000),
		"y/":mouseVector[0]/Scale.x(1000)
	};
	for (let translationKey in translations)
	{
		translation_add_strength(game.grid.velocity, translationKey, Settings.VELOCITY_ADD_DRAG*(translations[translationKey])*Settings.SPEED);
	}
}

function translation_wheel_nD(wheelEvent, game)
{
	let translationKey="wz/";
	{
		translation_add_strength(game.grid.velocity, translationKey, Settings.VELOCITY_ADD_WHEEL*wheelEvent.delta*Settings.SPEED);
	}
}

function translation_add_strength(gridVelocity, translationKey, power, resetOppose=true)
{
	const sign=(power<0) ? -1 : 1;
	if (resetOppose && gridVelocity[translationKey]*sign<0)
	{
		gridVelocity[translationKey]=0;
	}
	gridVelocity[translationKey]+=power;
}


function translation_init_nD(grid)
{
	for (let moveKey of Object.keys(move_to_keycode))
	{
		if (!(matrix_translations[moveKey].dim>Settings.RULE_BOX_D))
		{
			move_aviable[moveKey]=true;
			grid.velocity[moveKey]=0;
			if (move_to_keycode[moveKey].positive)
				keycode_to_move[move_to_keycode[moveKey].positive]={translationKey: moveKey, oppose: false};
			if (move_to_keycode[moveKey].negative)
				keycode_to_move[move_to_keycode[moveKey].negative]={translationKey: moveKey, oppose: true};
		}
	}
}


function translation_draw_nD(grid)
{
	for (let moveKey of Object.keys(move_aviable))
	{
		const down_postivie=keyIsDown(move_to_keycode[moveKey].positive);
		const down_negative=keyIsDown(move_to_keycode[moveKey].negative);
		//accelerate
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
			//decelerate
			if (!down_negative && !down_postivie)
			{
				const sign=(grid.velocity[moveKey]>0) ? 1 : -1;
				grid.velocity[moveKey]=(grid.velocity[moveKey]*Math.pow(Settings.VELOCITY_FRICTION_Q,Settings.SPEED))-(Settings.VELOCITY_FRICTION_R*sign*Settings.SPEED);
				if (!(grid.velocity[moveKey]*sign>0))
				{
					grid.velocity[moveKey]=0;
				}
			}
			//translate
			const power=grid.velocity[moveKey];
			if (power)
			{
				//find matrix
				const translationObject=matrix_translations[moveKey];

				//if (translationObject.dim>)
				//console.log(`move with matrix: ${translationObject.matrix}`);

				//do the translation
				translationObject.calibrate(power);
			  for (let posKey of game.grid.map_keys)
			  {
			    const h_box = grid.at(posKey);
					h_box.morph.each(pos => translationObject.translate(pos, power, grid.center));
					h_box.center=translationObject.translate(h_box.center, power, grid.center);
				}
				grid.center=translationObject.translate(grid.center, power, grid.center);
			}

		}
	}
}