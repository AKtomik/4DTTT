
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

const matrix_straigth = Settings.VELOCITY_SCALE_STRAIGTH;
const matrix_angle = Settings.VELOCITY_SCALE_ANGLE;

const matrix_move = {
	//move
	"x<->": {
		lore: "to X",
		translation: new MatrixTranslation(2, new Matrix(3,3).build_identity().set_column(2, [matrix_straigth,0,1]), false, true),
		keycode: {
			negative: 70,
			positive: 72
		}
	},
	"y<->": {
		lore: "to Y",
		translation: new MatrixTranslation(2, new Matrix(3,3).build_identity().set_column(2, [0,matrix_straigth,1]), false, true),
		keycode: {
			negative: 84,
			positive: 71
		}
	},
	"z<->": {
		lore: "to Z",
		translation: new MatrixTranslation(3, new Matrix(4,4).build_identity().set_column(3, [0,0,matrix_straigth,1]), false, true),
		keycode: {
			negative: 82,
			positive: 89
		}
	},
	"w<->": {
		lore: "to W",
		translation: new MatrixTranslation(4, new Matrix(5,5).build_identity().set_column(4, [0,0,0,matrix_straigth,1]), false, true),
		keycode: {
			negative: 78,
			positive: 66
		}
	},
	//rotation/3D
	"x/": {
		lore: "roll X",
		translation: new MatrixTranslation(3, new Matrix(4,4).build_identity(), true, false, (matrix, power) => matrix.set_at(1,1,Math.cos(matrix_angle*power)).set_at(2,2,Math.cos(matrix_angle*power)).set_at(1,2,Math.sin(matrix_angle*power)).set_at(2,1,-Math.sin(matrix_angle*power))),
		keycode: {
			positive: 90,
			negative: 83
		},
		exposition: true
	},
	"y/": {
		lore: "roll Y",
		translation: new MatrixTranslation(3, new Matrix(4,4).build_identity(), true, false, (matrix, power) => matrix.set_at(0,0,Math.cos(matrix_angle*power)).set_at(2,2,Math.cos(matrix_angle*power)).set_at(0,2,-Math.sin(matrix_angle*power)).set_at(2,0,Math.sin(matrix_angle*power))),
		keycode: {
			positive: 68,
			negative: 81
		},
		exposition: true
	},
	"z/": {
		lore: "roll Z",
		translation: new MatrixTranslation(2, new Matrix(3,3).build_identity(), true, false, (matrix, power) => matrix.set_at(0,0,Math.cos(matrix_angle*power)).set_at(1,1,Math.cos(matrix_angle*power)).set_at(0,1,Math.sin(matrix_angle*power)).set_at(1,0,-Math.sin(matrix_angle*power))),
		keycode: {
			positive: 65,
			negative: 69
		}
	},
	//rotation/4D
	"wx/": {
		lore: "roll Wx",
		translation: new MatrixTranslation(4, new Matrix(5,5).build_identity(), true, false, (matrix, power) => matrix.set_at(0,0,Math.cos(matrix_angle*power)).set_at(0,3,Math.sin(matrix_angle*power)).set_at(3,0,-Math.sin(matrix_angle*power)).set_at(3,3,Math.cos(matrix_angle*power))),
		keycode: {
			positive: 86
		},
		exposition: true
	},
	"wy/": {
		lore: "roll Wy",
		translation: new MatrixTranslation(4, new Matrix(5,5).build_identity(), true, false, (matrix, power) => matrix.set_at(1,1,Math.cos(matrix_angle*power)).set_at(1,3,Math.sin(matrix_angle*power)).set_at(3,1,-Math.sin(matrix_angle*power)).set_at(3,3,Math.cos(matrix_angle*power))),
		keycode: {
			positive: 67
		}
	},
	"wz/": {
		lore: "roll Wz",
		translation: new MatrixTranslation(4, new Matrix(5,5).build_identity(), true, false, (matrix, power) => matrix.set_at(2,2,Math.cos(matrix_angle*power)).set_at(2,3,Math.sin(matrix_angle*power)).set_at(3,2,-Math.sin(matrix_angle*power)).set_at(3,3,Math.cos(matrix_angle*power))),
		keycode: {
			positive: 87,
			negative: 88
		}
	},
	//sphere
	/*
	"x/me": {
		lore: "shpere X",
		translation: new MatrixTranslation(3, new Matrix(4,4).build_identity(), false, false, (matrix, power) => matrix.set_at(1,1,Math.cos(matrix_angle*power/4)).set_at(2,2,Math.cos(matrix_angle*power/4)).set_at(1,2,Math.sin(matrix_angle*power/4)).set_at(2,1,-Math.sin(matrix_angle*power/4))),
		keycode: {
			positive: 73
		}
	},
	"y/me": {
		lore: "shpere Y",
		translation: new MatrixTranslation(3, new Matrix(4,4).build_identity(), false, false, (matrix, power) => matrix.set_at(0,0,Math.cos(matrix_angle*power/4)).set_at(2,2,Math.cos(matrix_angle*power/4)).set_at(0,2,-Math.sin(matrix_angle*power/4)).set_at(2,0,Math.sin(matrix_angle*power/4))),
		keycode: {
			positive: 79
		}
	},
	"z/me": {
		lore: "shpere Z",
		translation: new MatrixTranslation(3, new Matrix(4,4).build_identity(), false, false, (matrix, power) => matrix.set_at(0,0,Math.cos(matrix_angle*power/4)).set_at(1,1,Math.cos(matrix_angle*power/4)).set_at(0,1,Math.sin(matrix_angle*power/4)).set_at(1,0,-Math.sin(matrix_angle*power/4))),
		keycode: {
			positive: 80
		}
	},
	*/
};



let move_aviable = {};//will contains only aviables mooves

let keycode_to_move = {};

function translation_key_nD(keyEvent, grid)
{
	const translationKey=keycode_to_move[keyEvent.keyCode]?.translationKey;
	if (!translationKey || !(move_aviable[translationKey]) || keyEvent.repeat)
		return;
	const sign=(keycode_to_move[keyEvent.keyCode].oppose) ? -1 : 1;
	translation_add_strength(grid.velocity[translationKey], Settings.VELOCITY_ADD_PUSH, sign);
}

function translation_drag_nD(dragEvent, grid)
{
	const mouseVector=[winMouseX-pwinMouseX, winMouseY-pwinMouseY];
	const translations={
		"x/":-mouseVector[1]/Scale.y(1000),
		"y/":mouseVector[0]/Scale.x(1000)
	};
	for (let translationKey in translations)
	{
		translation_add_strength(grid.velocity[translationKey], Settings.VELOCITY_ADD_DRAG, (translations[translationKey]));
	}
}

function translation_wheel_nD(wheelEvent, grid)
{
	let translationKey="wz/";
	{
		translation_add_strength(grid.velocity[translationKey], Settings.VELOCITY_ADD_WHEEL, wheelEvent.delta);
	}
}

function sequencial_add(value, reasons, times)
{
	let r=reasons.r;
	let q=reasons.q;
	if (times<0)
	{
		//reasons.q=1/reasons.q;
		r*=-1;
		times*=-1;
	}
	if (times===1)
	{
		return value*q+r;
	}
	if (q===1)
	{
		return value+r*times;
	}
	return value*Math.pow(q, times)+r*((1-Math.pow(q,times))/(1-q));
}

function translation_add_strength(velocityElement, reasons, times=1, resetOppose=true)
{
	if (!velocityElement) return;
	const power=reasons*times;
	const sign=(power<0) ? -1 : 1;
	if (resetOppose && velocityElement.velocity*sign<0)
	{
		velocityElement.velocity=0;
		return;
	}
	velocityElement.velocity+=power;
}

function translation_extract_speed(velocityElement, down)
{
	if (velocityElement.velocity===0) return 0;
	//decelerate
	if (!down)
	{
		const sign=(velocityElement.velocity>0) ? 1 : -1;
		velocityElement.velocity=(velocityElement.velocity*Math.pow(Settings.VELOCITY_FRICTION_Q,deltaSpeed))-(Settings.VELOCITY_FRICTION_R*sign*deltaSpeed);
		if (!(velocityElement.velocity*sign>0))
		{
			velocityElement.velocity=0;
		}
	}
	//translate
	return velocityElement.velocity*deltaSpeed;
}


function translation_init_nD(grid)
{
	move_aviable={};
	for (let moveKey of Object.keys(matrix_move))
	{
		if (!(matrix_move[moveKey].translation.dim>Settings.RULE_BOX_D))
		{
			move_aviable[moveKey]=true;
			grid.velocity[moveKey]={velocity:0, center: (grid.exposition && matrix_move[moveKey].exposition) ? Settings.VELOCITY_SCALE_EXPO : 0};
			if (matrix_move[moveKey].keycode.positive)
				keycode_to_move[matrix_move[moveKey].keycode.positive]={translationKey: moveKey, oppose: false};
			if (matrix_move[moveKey].keycode.negative)
				keycode_to_move[matrix_move[moveKey].keycode.negative]={translationKey: moveKey, oppose: true};
		}
	}
}


async function translation_draw_nD(grid)
{
	for (let moveKey of Object.keys(move_aviable))
	{
		let velocityElement=grid.velocity[moveKey];

		const down_postivie=keyIsDown(matrix_move[moveKey].keycode.positive);
		const down_negative=keyIsDown(matrix_move[moveKey].keycode.negative);
		//accelerate
		if (down_postivie)
		{
			translation_add_strength(velocityElement, Settings.VELOCITY_ADD_REMAIN, deltaSpeed);
		}
		if (down_negative)
		{
			translation_add_strength(velocityElement, Settings.VELOCITY_ADD_REMAIN, -deltaSpeed);
		}

		const power=translation_extract_speed(velocityElement, down_negative || down_postivie)+velocityElement.center;

		//translation
		if (power)
		{
			//find matrix
			const translationObject=matrix_move[moveKey].translation;

			//do the translation
			translationObject.calibrate(power);
		  for (let posKey of grid.map_keys)
		  {
		    const h_box = grid.at(posKey);
				h_box.morph.each(pos => translationObject.translate(pos, power, grid.center));
				h_box.center=translationObject.translate(h_box.center, power, grid.center);
			}
			grid.center=translationObject.translate(grid.center, power, grid.center);
		}
	}
}