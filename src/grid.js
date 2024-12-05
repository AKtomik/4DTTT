
//--- in ---
class Grid {

  //build
  constructor(width, deepth)
  {
    this.map_deepth = deepth;
    this.map_width = width;
    this.map = {};
		this.positions = [];
		this.build_map_deep(width, deepth);
    console.log("Grid: this.map:", this.map);
    console.log("Grid: this.positions:", this.positions);
  };
  build_map_deep(width, layer, posKey=[])
  {
    if (layer===0) 
		{
			this.positions.push(posKey);
			this.map[posKey]=new Box();
			return;
		};
    for (let i of Array(width).keys())
		{
			this.build_map_deep(width, layer-1, posKey.concat(i));
		}
  };

	//get
	at(posKey)
	{
		return this.map[posKey];
		//return undefined if not set
	};
};



class Box {
  //static

  //object
  constructor()
  {
    this.state=BoxStateType.EMPTY;
    this.shape=new Polygon();
		this.checker=null;
    return this;
  };

	//display
  get color()
  {
		switch (this.state)
		{
			case (BoxStateType.EMPTY):
    		return color(0,0);
			case (BoxStateType.FILL_BY):
				return this.checker.color_fill;
			case (BoxStateType.WON_BY):
				return this.checker.color_won;
		}
  };
  display()
  {
    fill(this.color);
    this.shape.display();
  };
};
