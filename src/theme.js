//all colors :
//theme_background - the background
//theme_sign - like a second background
//theme_text - netral texts
//box_empty_in - when the box not checked
//box_empty_out - when the box not checked
//player_<x>_text - player's text color
//player_<x>_dark - player's not contrasted color (fill)
//player_<x>_ligth - player's contrasted color (win)

class ColorPalet {
	static colors={}

	//use the palet
	static get(colorKey) {
		if (!ColorPalet.colors[colorKey])
			throw new Error(`color key ${colorKey} not defined`);
		return ColorPalet.colors[colorKey];
	}

	//change the pallet
	static switch(colorSetKey) {
		for (let colorKey in colorSet[colorSetKey])
		{
			ColorPalet.colors[colorKey]=color(...colorSet[colorSetKey][colorKey]);
		}
	}
	static tweek(colorTweekKey)
	{
		colorTweek[colorTweekKey]();
	}
	static set(colorKey, colorValue)
	{
		ColorPalet.colors[colorKey]=color(...colorValue);
	}
};

const colorSet = {
	default: {
		theme_background:[255],
		theme_sign:[200],
		theme_text:[0],
		theme_netral:[128],//cant have Alpha
		
		box_empty_in:[128,128],
		box_empty_out:[0],

		byte_straigth:[0],
		byte_fill:[255],

		player_1_text:[0,200,255],
		player_1_dark:[0,0,128],
		player_1_ligth:[0,200,255],
		player_2_text:[255,0,0],
		player_2_dark:[128,0,0],
		player_2_ligth:[255,0,0],
		player_3_text:[0,255,0],
		player_3_dark:[0,128,0],
		player_3_ligth:[128,255,0],
	},
	
	purple: {
		theme_background:[200,100,150],
		theme_sign:[128,50,100],
		theme_text:[255,128,255],
		theme_netral:[250,150,200],
		
		//box_empty_in:[250,150,200,128],
		//box_empty_out:[255,128,255],
	},
	
	sky: {
		theme_background:[0,100,200],
		theme_sign:[0,127,255],
		theme_text:[0],
		theme_netral:[255],

		//box_empty_in:[0,128],
		//box_empty_out:[255],
	},

	brigth: {
		theme_background:[255],
		theme_sign:[200],
		theme_text:[0],
		theme_netral:[128],
		
		//box_empty_in:[128,128],
		//box_empty_out:[0],
	},

	nigth: {
		theme_background:[0,32,64],
		theme_sign:[0,64,128],
		theme_text:[255],
		theme_netral:[255],

		//box_empty_in:[255,128],
		//box_empty_out:[0],
	},

	space: {
		theme_background:[0],
		theme_sign:[64],
		theme_text:[255],
		theme_netral:[255],

		//box_empty_in:[255],
		//box_empty_out:[0],
	},
};

const colorTweek = {
	solid: () => {
		let netralColorValue=ColorPalet.get('theme_netral').levels.slice();
		ColorPalet.set('box_empty_in', netralColorValue);
		ColorPalet.set('box_empty_out', [0]);
		Settings.PERSPECTIVE_SHOW_OUTLINE=true;
	},

	transparent: () => {
		let netralColorValue=ColorPalet.get('theme_netral').levels.slice();
		netralColorValue[3]=128;//set alpha
		ColorPalet.set('box_empty_in', netralColorValue);
		ColorPalet.set('box_empty_out', [0]);
		Settings.PERSPECTIVE_SHOW_OUTLINE=true;
	},
	
	outline: () => {
		let netralColorValue=ColorPalet.get('theme_text').levels.slice();
		ColorPalet.set('box_empty_in', [0,0]);
		ColorPalet.set('box_empty_out', netralColorValue);
		Settings.PERSPECTIVE_SHOW_OUTLINE=true;
	},

	smooth: () => {
		let netralColorValue=ColorPalet.get('theme_netral').levels.slice();
		netralColorValue[3]=128;//set alpha
		ColorPalet.set('box_empty_in', netralColorValue);
		Settings.PERSPECTIVE_SHOW_OUTLINE=false;
	},

}