//not dimensionnal dependant

//--- in ---
class Grid {

  //build
  constructor(width, deepth, exposition=false)
  {
		this.exposition=exposition;
		//map
    this.map_deepth = deepth;
    this.map_width = width;
    this.map = {};
		this.map_keys = [];
		this.checklist=[];

		//build
		this.build_map_deep(width, deepth);
    console.log("Grid: this.map:", this.map);
    console.log("Grid: this.map_keys:", this.map_keys);

		//pos
    this.center=[];//the imaginary center
    this.velocity={};//the imaginary veolcity
		
		//front
		this.front_method = (grid, posKey1, posKey2) => true;

		//vectors
		this.vectors = [];
		this.build_vectors_deep(deepth);
		this.vectors=this.vectors.slice(Math.floor(this.vectors.length/2)+1);//remove nul and all mirror vector
    console.log("Grid: this.vectors:", this.vectors);
  };
  build_map_deep(width, layer, posKey=[])
  {
    if (layer===0) 
		{
			this.map_keys.push(posKey);
			this.map[posKey]=new Box();
			return;
		};
    for (let i of Array(width).keys())
		{
			this.build_map_deep(width, layer-1, posKey.concat(i));
		}
  };
	
  build_vectors_deep(layer, posDir=[])
  {
    if (layer===0) 
		{
			this.vectors.push(posDir);
			return;
		};
    for (let i of [-1, 0, 1])
		{
			this.build_vectors_deep(layer-1, posDir.concat(i));
		}
  };

	//get
	at(posKey)
	{
		return this.map[posKey];
		//return undefined if not set
	};

	add_checkline(checkLineArray)
	{
		this.checklist.push(checkLineArray);
	}

	//display
	sort_keys()
	{
		this.map_keys=this.map_keys.sort((a,b) => this.is_in_front(a,b));
	}
	is_in_front(posKey1, posKey2)
	{
		return this.map[posKey1].z>=this.map[posKey2].z;
	};
	set_front_method(frontFunction)
	{//deperciated
		this.front_method=frontFunction;
	};
};



class Box {
  //static

  //object
  constructor()
  {
    this.state=BoxStateType.EMPTY;
		this.check_player=null;
		this.won_dir=null;

    this.shape=new ConcretePolygon();//the projected shape
    this.morph=new AbstractPolygon();//the imaginary summits
    this.center=[];//the imaginary center
    this.z=0;//integer greater if more in front

    return this;
  };

	//display
  get color()
  {
		switch (this.state)
		{
			case (BoxStateType.EMPTY):
    		return ColorPalet.get(`box_empty_in`);
			case (BoxStateType.BOLD):
    		return ColorPalet.get(`box_bold`);
			case (BoxStateType.FILL_BY):
				return ColorPalet.get(`player_${this.check_player.igIndex+1}_dark`);
			case (BoxStateType.WON_BY):
				return ColorPalet.get(`player_${this.check_player.igIndex+1}_ligth`);
		}
  };
  display()
  {
    this.shape.display();
  };
	
	//state
	check(player)
	{
		this.state=BoxStateType.FILL_BY;
		this.check_player=player;
	};
	bold()
	{
		this.state=BoxStateType.BOLD;
	};
	get checker()
	{
		return this.check_player;
	};
	won(dir)
	{
		this.state=BoxStateType.WON_BY;
		this.won_dir=dir;
	};
	get dir()
	{
		return this.won_dir;
	};
};
