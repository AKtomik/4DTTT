class Settings {	
	static FPS = 24;
	static SPEED = 3;
	static DEBUG = true;

	static POS_BOX_FULL = 1000;
	static POS_BOX_MARGIN = 200;

	static PERSPECTIVE_FOV = Math.PI/6;
	static PERSPECTIVE_DISTANCE = 2.5;
	static PERSPECTIVE_GAP = 1;
	
	static VELOCITY_ADD_PUSH = .1;
	static VELOCITY_ADD_REMAIN = .01;
	static VELOCITY_ADD_OPPOSE = .1;
	static VELOCITY_ADD_DRAG = 1;
	static VELOCITY_FRICTION_Q = .99;
	static VELOCITY_FRICTION_R = 0.01;

	//how many box width
	static RULE_BOX_WIDTH=2;//const
	//how many dimensions
	static RULE_BOX_D=3;//const
	//how many to check in order to score
	static RULE_BOX_ROW_LENGTH=3;
	//can we make rescore each time a row is bigger
	static RULE_BOX_ROW_CHAIN=false;


	static COLOR_BACKGROUND=[0,100,200];
	
	static COLOR_TEXT_NETRAL=[0];
	
	static COLOR_BOX_EMPTY=[0,100,200];
	static COLOR_BOX_P1_FILL=[0,128,0];
	static COLOR_BOX_P1_WON=[128,255,0];
	static COLOR_BOX_P2_FILL=[128,0,0];
	static COLOR_BOX_P2_WON=[255,0,0];
	static COLOR_BOX_P3_FILL=[0,0,128];
	static COLOR_BOX_P3_WON=[0,255,255];

	//static COLOR_BOX_EMPTY=[255,255,255];
};