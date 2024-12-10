class Settings {	
	static FPS = 12;
	static SPEED = 3;

	static POS_BOX_FULL = 1000;
	static POS_BOX_MARGIN = 200;

	static PERSPECTIVE_FOV = Math.PI/6;
	static PERSPECTIVE_DISTANCE = 5;
	static PERSPECTIVE_GAP = 3/4;
	
	static VELOCITY_ADD_PUSH = .1;
	static VELOCITY_ADD_REMAIN = .01;
	static VELOCITY_ADD_OPPOSE = .1;
	static VELOCITY_ADD_DRAG = 1;
	static VELOCITY_FRICTION_Q = .99;
	static VELOCITY_FRICTION_R = 0.01;

	//how many box width
	static RULE_BOX_WIDTH=30;//const
	//how many dimensions
	static RULE_BOX_D=3;//const//!dont used
	//how many to check in order to score
	static RULE_BOX_ROW=3;//const


	static COLOR_BACKGROUND=[0,100,200];
	
	static COLOR_BOX_EMPTY=[0,100,200];
	static COLOR_BOX_P1_FILL=[0,128,0];
	static COLOR_BOX_P1_WON=[0,255,0];
	static COLOR_BOX_P2_FILL=[128,0,0];
	static COLOR_BOX_P2_WON=[255,0,0];
	
	//static COLOR_BOX_EMPTY=[0,0];
	//static COLOR_BOX_P1_FILL=[0,128,0,64];
	//static COLOR_BOX_P1_WON=[0,255,0,64];
	//static COLOR_BOX_P2_FILL=[128,0,0,64];
	//static COLOR_BOX_P2_WON=[255,0,0,64];

	//static COLOR_BOX_EMPTY=[255,255,255];
};