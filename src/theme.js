//all colors :
//theme_background - the background
//theme_sign - like a second background
//theme_text - texts and some others things
//theme_netral - is less contrasted for netral display
//theme_cool - original color and verry brigth for menu
//theme_out - mostly used for outline
//box_empty_in - inside when the box not checked (by ColorTweek)
//box_empty_out - any box outline, for now (by ColorTweek)
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
		for (let colorKey in colorSet[colorSetKey].colors)
		{
			ColorPalet.colors[colorKey]=color(...colorSet[colorSetKey].colors[colorKey]);
		}
		if (colorSet[colorSetKey].effects)
		{
			if (colorSet[colorSetKey].effects.stars!==undefined)
				Settings.EFFECT_STAR_SHOW=colorSet[colorSetKey].effects.stars;
		}
		if (colorSet[colorSetKey].css)
		{
			ColorPalet.css_style(
				colorSet[colorSetKey].colors["theme_netral"],//out
				colorSet[colorSetKey].colors["theme_cool"], 
				colorSet[colorSetKey].colors["theme_sign"],
				colorSet[colorSetKey].colors["theme_text"]
			)
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

	static css_style(coloriPrimary, coloriSecondary, coloriBg, coloriText)
	{
		if (coloriPrimary) ColorPalet.css_set("primary-color", coloriPrimary);
		if (coloriSecondary) ColorPalet.css_set("secondary-color", coloriSecondary);
		if (coloriBg) ColorPalet.css_set("bg-color", coloriBg);
		if (coloriText) ColorPalet.css_set("text-color", coloriText);
	}
	static css_set(valname, colorValue)
	{
		const leni=colorValue.length
		let colortext = 
				(leni===1)
			? `rgb(${colorValue[0]},${colorValue[0]},${colorValue[0]})`
			: (leni===2)
			? `rgba(${colorValue[0]},${colorValue[0]},${colorValue[0]},${colorValue[1]})`
			: (leni===3)
			? `rgb(${colorValue[0]},${colorValue[1]},${colorValue[2]})`
			: (leni===4)
			? `rgba(${colorValue[0]},${colorValue[1]},${colorValue[2]},${colorValue[3]})`
			: `red`
			;
		document.documentElement.style.setProperty(`--${valname}`, colortext);
	}
};

const colorSet = {
	default: {//is call at root, but never alone
		colors: {
			theme_background:[255],
			theme_sign:[200],
			theme_bold:[255,255,0],
			theme_text:[0],
			theme_cool:[255,0,255],
			theme_out:[0],
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
			player_4_text:[200,200,0],
			player_4_dark:[100,100,0],
			player_4_ligth:[255,255,0],

			dim_ax_1:[255,0,0],
			dim_ax_2:[0,0,255],
			dim_ax_3:[0,255,0],
			dim_ax_4:[255,0,255],
			dim_ax_5:[255,255,0],
			dim_ax_6:[0,255,255],
		}
	},
	
	purple: {
		colors: {
			theme_background:[200,100,150],
			theme_sign:[128,50,100],
			theme_bold:[255,0,255],
			theme_text:[255,128,255],
			theme_cool:[255,0,255],
			theme_out:[0],
			theme_netral:[250,150,200],
		},
		css: true,
		effects: {
			stars: true
		}
	},
	
	sky: {
		colors: {
			theme_background:[0,100,200],
			theme_sign:[0,127,255],
			theme_bold:[255,255,0],
			theme_text:[0],
			theme_cool:[255,0,255],
			theme_out:[0],
			theme_netral:[255],
		},
		css: true,
		effects: {
			stars: false
		}
	},

	brigth: {
		colors: {
			theme_background:[255],
			theme_sign:[200],
			theme_bold:[64],
			theme_text:[0],
			theme_cool:[255,255,0],
			theme_out:[0],
			theme_netral:[128],
		},
		css: true,
		effects: {
			stars: false
		}
	},

	fly: {
		colors: {
			theme_background:[255],
			theme_sign:[0,0],
			theme_bold:[0],
			theme_text:[0],
			theme_cool:[0],
			theme_out:[255],
			theme_netral:[220],
		},
		css: true,
		effects: {
			stars: true
		}
	},


	nigth: {
		colors: {
			theme_background:[0,32,64],
			theme_sign:[0,64,128],
			theme_bold:[255],
			theme_text:[255],
			theme_cool:[255,0,255],
			theme_out:[0],
			theme_netral:[205],
		},
		css: true,
		effects: {
			stars: true
		}
	},

	space: {
		colors: {
			theme_background:[0],
			theme_sign:[64],
			theme_bold:[255],
			theme_text:[255],
			theme_cool:[255,0,255],
			theme_out:[0],
			theme_netral:[205],
		},
		css: true,
		effects: {
			stars: true
		}
	},


	
	grass: {
		colors: {
			theme_background:[73,100,45],
			theme_sign:[100,65,40],
			theme_bold:[0],
			theme_text:[50,200,50],
			theme_cool:[0,255,0],
			theme_out:[50,45,20],
			theme_netral:[120,85,60],
		},
		css: true,
		effects: {
			stars: true
		}
	},


	burn: {
		colors: {
			theme_background:[235,54,54],
			theme_sign:[255,100,30],
			theme_bold:[255],
			theme_text:[0],
			theme_cool:[255,0,0],
			theme_out:[64,32,0],
			theme_netral:[255,100,30],
		},
		css: true,
		effects: {
			stars: true
		}
	},

};

const colorTweek = {
	solid: () => {
		let netralColorValue=ColorPalet.get('theme_netral').levels.slice();
		let outColorValue=ColorPalet.get('theme_out').levels.slice();
		ColorPalet.set('box_empty_in', netralColorValue);
		ColorPalet.set('box_empty_out', outColorValue);
		Settings.PERSPECTIVE_SHOW_OUTLINE=true;
	},

	transparent: () => {
		let netralColorValue=ColorPalet.get('theme_netral').levels.slice();
		let outColorValue=ColorPalet.get('theme_out').levels.slice();
		netralColorValue[3]=128;//set alpha
		ColorPalet.set('box_empty_in', netralColorValue);
		ColorPalet.set('box_empty_out', outColorValue);
		Settings.PERSPECTIVE_SHOW_OUTLINE=true;
	},
	
	outline: () => {
		let netralColorValue=ColorPalet.get('theme_text').levels.slice();
		let outColorValue=ColorPalet.get('theme_out').levels.slice();
		ColorPalet.set('box_empty_in', [0,0]);
		ColorPalet.set('box_empty_out', netralColorValue);
		Settings.PERSPECTIVE_SHOW_OUTLINE=true;
	},

	smooth: () => {
		let netralColorValue=ColorPalet.get('theme_netral').levels.slice();
		let outColorValue=ColorPalet.get('theme_out').levels.slice();
		netralColorValue[3]=128;//set alpha
		ColorPalet.set('box_empty_in', netralColorValue);
		Settings.PERSPECTIVE_SHOW_OUTLINE=false;
	},
}