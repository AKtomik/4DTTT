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
};

const colorSet = {
	default: {
		theme_background:[0,100,200],
		theme_sign:[0,127,255],
		theme_text:[0],
		box_empty_in:[0,128],
		box_empty_out:[255],
		player_1_text:[0,255,0],
		player_1_dark:[0,128,0],
		player_1_ligth:[128,255,0],
		player_2_text:[255,0,0],
		player_2_dark:[128,0,0],
		player_2_ligth:[255,0,0],
		player_3_text:[0,0,255],
		player_3_dark:[0,0,128],
		player_3_ligth:[0,255,255],
	},

	dark_mode: {
		theme_background:[0,32,64],
		theme_sign:[0,64,128],
		theme_text:[255],
		box_empty_in:[255,128],
		box_empty_out:[0],
	},

	nigth: {
		theme_background:[0],
		theme_sign:[64],
		theme_text:[255],
		box_empty_in:[255],
		box_empty_out:[0],
	}
};