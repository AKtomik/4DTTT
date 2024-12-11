
function perspective_draw_2D_flat(grid)
{
  const margin = Scale.min(Settings.POS_BOX_MARGIN);
  let square_top = [(Scale.x(Settings.POS_BOX_FULL) - Scale.min(Settings.POS_BOX_FULL))/2 + margin, (Scale.y(Settings.POS_BOX_FULL) - Scale.min(Settings.POS_BOX_FULL))/2 + margin];
  let square_size = [Scale.min(Settings.POS_BOX_FULL) - 2*margin, Scale.min(Settings.POS_BOX_FULL) - 2*margin];
  
  //little box
  stroke(255);
  strokeWeight(3);
  for (let posKey of grid.map_keys)
  {
    const i = posKey[0];
    const j = posKey[1];
    const h_box = grid.at(posKey);
    //position
    h_box.shape.set_points(make_rectangle(square_top[0]+square_size[0]*i/3, square_top[1]+square_size[1]*j/3, square_size[0]/3, square_size[1]/3));
    //display
    h_box.display();
  }
  
  //rectangle as outline
  strokeWeight(6);
  noFill();
  rect(...square_top, ...square_size);
}


function perspective_init_3D_flat(grid)
{
  //front method
  grid.set_front_method((grid, posKey1, posKey2) =>
    {
      for (let i=posKey1.length-1;i>=0;i-=1)//is 2 there
  		{
  			if (posKey1[i]<posKey2[i])
  				return false;
  			else if (posKey1[i]>posKey2[i])
  				return true;
  		}
  		throw new Error("no one in front between "+posKey1+posKey2);
    }
  );
}


function perspective_draw_3D_flat(grid)
{
  const margin = Scale.min(Settings.POS_BOX_MARGIN);
  let square_top = [(Scale.x(Settings.POS_BOX_FULL) - Scale.min(Settings.POS_BOX_FULL))/2 + margin, (Scale.y(Settings.POS_BOX_FULL) - Scale.min(Settings.POS_BOX_FULL))/2 + margin];
  let square_size = [Scale.min(Settings.POS_BOX_FULL) - 2*margin, Scale.min(Settings.POS_BOX_FULL) - 2*margin];
  //3D
  //little box
  stroke(255);
  strokeWeight(3);
  grid.sort_keys();
  for (let posKey of grid.map_keys)
  {
    const i = posKey[0];
    const j = posKey[1];
    const k = posKey[2];
    strokeWeight((k+1)*2);
    const h_box = grid.at(posKey);
    //position
    h_box.shape.set_points(make_rectangle(square_top[0]+square_size[0]*((i*3+k)/10), square_top[1]+square_size[1]*((j*3+k)/10), square_size[0]*2/10, square_size[1]*2/10));
    //display
    h_box.display();
  }
}


//const cube_points = [//binnary to create points
//  	[0,0,0],//0
//  	[1,0,0],//1
//  	[0,1,0],//2
//  	[1,1,0],//3
//  	[0,0,1],//4
//  	[1,0,1],//5
//  	[0,1,1],//6
//  	[1,1,1],//7
//  	[.5,.5,.5]//8
//  ]

//const cube_edges = [//link points between each others
//  [0,1],
//  [0,2],
//  [0,4],
//  [3,1],
//  [3,2],
//  [3,7],
//  [5,1],
//  [5,4],
//  [5,7],
//  [6,2],
//  [6,4],
//  [6,7],
//];

//const cube_faces = [//link points between each others
//  [0,2,3,1],
//  [0,1,5,4],
//  [0,4,6,2],
//  [7,6,4,5],
//  [7,3,2,6],
//  [7,5,1,3],
//];

function pointsForHypercube(dim, current = [])
{//give all binary list of length dim
  return dim === 0
    ? [current]
    : [0, 1].flatMap(v => pointsForHypercube(dim - 1, [...current, v]));
}

function perspective_init_nD(grid)
{
  const D=Settings.RULE_BOX_D;
	//create cubes
  const just_total = (Settings.RULE_BOX_WIDTH+((Settings.RULE_BOX_WIDTH-1)*Settings.PERSPECTIVE_GAP));
  const just_size = 1/just_total;
  const just_top = (at) => at*(1+Settings.PERSPECTIVE_GAP)/just_total;
  
  const point_size = new Array(D).fill(just_size);//same for everyone
  //define points created for the shape
  const shape_points = pointsForHypercube(D);//same for everyone


  for (let posKey of grid.map_keys)
  {
    const h_box = grid.at(posKey);

    //imaginary point
    const point_top = Array.from(new Array(D).keys()).map(dimIndex => just_top(posKey[dimIndex]));

    //imaginary pos using binary
  	h_box.morph.clear();
    for (let i in shape_points)
    {//all summits
      let v=shape_points[i].slice();//copy
      for (let dimIndex of Array.from(new Array(D).keys()))
      {//all summits
        v[dimIndex]=point_top[dimIndex]+point_size[dimIndex]*v[dimIndex];//use bin
        v[dimIndex]=v[dimIndex]*2-1;//slide in order to origin be centered
      }
      //!add distance to cote (dim 3, index 2)
      v[2] += Settings.PERSPECTIVE_DISTANCE;//add distance
  	  //add the point to summits
      h_box.morph.add_point(v);
    }
    {//point at center of shape
      let v=Array.from(new Array(D)).fill(.5);
      for (let dimIndex of Array.from(new Array(D).keys()))
      {
        v[dimIndex]=point_top[dimIndex]+point_size[dimIndex]*v[dimIndex];//use bin
        v[dimIndex]=v[dimIndex]*2-1;//slide in order to origin be centered
      }
      //!add distance to cote (dim 3, index 2)
      v[2] += Settings.PERSPECTIVE_DISTANCE;//add distance
  	  //add the point to summits
      h_box.center=v;
    }
  }
	//center
  grid.center=new Array(D).fill(0);
	grid.center[2] += Settings.PERSPECTIVE_DISTANCE;

  //front method
  grid.set_front_method((grid, posKey1, posKey2) => //check the z-axis of center
      //true
      grid.map[posKey1].center[D-1]<grid.map[posKey2].center[D-1]
  );
}

function perspective_draw_3D_cube(grid)
{
	//screen
  const margin = Scale.min(Settings.POS_BOX_MARGIN);
  let square_top = [(Scale.x(Settings.POS_BOX_FULL) - Scale.min(Settings.POS_BOX_FULL))/2 + margin, (Scale.y(Settings.POS_BOX_FULL) - Scale.min(Settings.POS_BOX_FULL))/2 + margin];
  let square_size = [Scale.min(Settings.POS_BOX_FULL) - 2*margin, Scale.min(Settings.POS_BOX_FULL) - 2*margin];
	
	
  //projection
	const fovDist = 1/Math.tan(Settings.PERSPECTIVE_FOV);
  
  //order
  grid.sort_keys();

  for (let posKey of grid.map_keys)
  {
    const h_box = grid.at(posKey);

    //project
		let projections=h_box.morph.points.map(pos => {
				let flatPos=project3Dto2D(pos,fovDist);
				return [
          square_top[0]+(flatPos[0]+.5)*square_size[0],
          square_top[1]+(flatPos[1]+.5)*square_size[1]
          ];
			});

    //Chan
    projections=convexHull(projections);
    
    //P5
    projections=projections.map(pos => createVector(pos[0], pos[1]));
    //draw full outline
    if (false)
    {
      stroke(255);
      //stroke(h_box.color);
      strokeWeight(5);
      noFill();
  		for (let pairPointI of cube_edges)
  		{
  	    beginShape();
  	    for(let i of [0,1])
        {
  	      vertex(projections[pairPointI[i]].x, projections[pairPointI[i]].y);
  	      point(projections[pairPointI[i]]);
  	    }
  	    endShape(CLOSE);
  		}
    }
    

    //hitbox
    h_box.shape.set_points(projections);
    //display
    stroke(255);
    strokeWeight(1);
    h_box.display();
  }
}

function project3Dto2D(pos3D, fovDist)
{
	//const projectX = (pos3D[0]) * fovDist / (pos3D[2]);
	//const projectY = (pos3D[1]) * fovDist / (pos3D[2]);
	const projectX = (pos3D[0]) * fovDist / (fovDist+pos3D[2]);
	const projectY = (pos3D[1]) * fovDist / (fovDist+pos3D[2]);
	return [projectX, projectY];
};