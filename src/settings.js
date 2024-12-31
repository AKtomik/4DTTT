class Settings {	
	static FPS = 15;
	static SPEED = 1;
	static DEBUG = true;
	static PLAYERS = 2;
	
	//how many box width
	static RULE_BOX_WIDTH=3;//const
	//how many dimensions
	static RULE_BOX_D=3;//const
	//how many to check in order to score
	static RULE_BOX_ROW_LENGTH=3;
	//can we make rescore each time a row is bigger
	static RULE_BOX_ROW_CHAIN=false;

	static POS_BOX_FULL = 1000;
	static POS_BOX_MARGIN = 150;
	
	static BYTE_SPEAK_SPEED_DEFAULT=9;

	static PERSPECTIVE_FOV = Math.PI/8;
	static PERSPECTIVE_DISTANCE = 3;
	static PERSPECTIVE_GAP = 1;
	
	static PERSPECTIVE_MODE_WINRAY = true;
	static PERSPECTIVE_SHOW_OUTLINE = true;//by tweek
	//static PERSPECTIVE_SHOW_ = true;//by tweek
	
	static VELOCITY_SCALE_ANGLE = Math.PI/32;
	static VELOCITY_SCALE_STRAIGTH = .1;
	static VELOCITY_SCALE_EXPO = .15;

	static VELOCITY_ADD_PUSH = 10;
	static VELOCITY_ADD_REMAIN = 4;//affected by delta
	static VELOCITY_ADD_DRAG = 50;
	static VELOCITY_ADD_WHEEL = .02;//affected by wheel
	static VELOCITY_FRICTION_Q = .5;//affected by delta
	static VELOCITY_FRICTION_R = .3;//affected by delta
};