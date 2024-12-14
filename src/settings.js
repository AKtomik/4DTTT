class Settings {	
	static FPS = 24;
	static SPEED = 3;
	static DEBUG = true;
	static PLAYERS = 2;

	static POS_BOX_FULL = 1000;
	static POS_BOX_MARGIN = 200;

	static PERSPECTIVE_FOV = Math.PI/6;
	static PERSPECTIVE_DISTANCE = 3;
	static PERSPECTIVE_GAP = 1;
	
	static VELOCITY_ADD_PUSH = .1;
	static VELOCITY_ADD_REMAIN = .01;
	static VELOCITY_ADD_OPPOSE = .1;
	static VELOCITY_ADD_DRAG = 1;
	static VELOCITY_ADD_WHEEL = .001;
	static VELOCITY_FRICTION_Q = .99;
	static VELOCITY_FRICTION_R = 0.01;

	//how many box width
	static RULE_BOX_WIDTH=3;//const
	//how many dimensions
	static RULE_BOX_D=4;//const
	//how many to check in order to score
	static RULE_BOX_ROW_LENGTH=3;
	//can we make rescore each time a row is bigger
	static RULE_BOX_ROW_CHAIN=false;
};