
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


const cube_points = [//binnary to create points
  	[0,0,0],//0
  	[1,0,0],//1
  	[0,1,0],//2
  	[1,1,0],//3
  	[0,0,1],//4
  	[1,0,1],//5
  	[0,1,1],//6
  	[1,1,1],//7
  ]

const cube_edges = [//link points between each others
  [0,1],
  [0,2],
  [0,4],
  [3,1],
  [3,2],
  [3,7],
  [5,1],
  [5,4],
  [5,7],
  [6,2],
  [6,4],
  [6,7],
];

const cube_faces = [//link points between each others
  [0,2,3,1],
  [0,1,5,4],
  [0,4,6,2],
  [7,6,4,5],
  [7,3,2,6],
  [7,5,1,3],
];

function perspective_init_3D_cube(grid)
{
	//create cubes
  for (let posKey of grid.map_keys)
  {
    const i = posKey[0];
    const j = posKey[1];
    const k = posKey[2];
    const h_box = grid.at(posKey);

    //imaginary point
    const point_top = [
      i*3/8, j*3/8, k*3/8
    ]
    const point_size = [//same for everyone
      2/8, 2/8, 2/8
    ]

    //imaginary bin
  	h_box.morph.clear();
    for (let i in cube_points)
    {
      let v=cube_points[i].slice();//copy
      for (let i2 of [0,1,2])
      {
        v[i2]=(v[i2]) ? point_top[i2]+point_size[i2] : point_top[i2];//use bin
        v[i2]=v[i2]*2-1;//slide in order to origin be centered
      }
      v[2] += Settings.PERSPECTIVE_DISTANCE;//add distance
  	  h_box.morph.add_point(v);
    }

	  //for each
		for (let i=0;i<h_box.morph.get_points_amount();i+=1)
		{
		}
  }
	//center
  grid.center=[0,0,0];
	grid.center[2] += Settings.PERSPECTIVE_DISTANCE;
}
function perspective_draw_3D_cube(grid)
{
	//screen
  const margin = Scale.min(Settings.POS_BOX_MARGIN);
  let square_top = [(Scale.x(Settings.POS_BOX_FULL) - Scale.min(Settings.POS_BOX_FULL))/2 + margin, (Scale.y(Settings.POS_BOX_FULL) - Scale.min(Settings.POS_BOX_FULL))/2 + margin];
  let square_size = [Scale.min(Settings.POS_BOX_FULL) - 2*margin, Scale.min(Settings.POS_BOX_FULL) - 2*margin];
	
	
  //projection
	const projectZ = 1/Math.tan(Settings.PERSPECTIVE_FOV);
  
  //order
  grid.sort_keys();

  for (let posKey of grid.map_keys)
  {
    const h_box = grid.at(posKey);
    
    //project
		let projections=h_box.morph.points.map(pos => {
				let vector=perspective_draw_3D_cube_projection(pos,projectZ);
				vector.x=square_top[0]+(vector.x+.5)*square_size[0];
				vector.y=square_top[1]+(vector.y+.5)*square_size[1];
				return vector;
			});

    //draw outline
    stroke(255);
    noFill();
    strokeWeight(3);
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

    //hitbox
    h_box.shape.set_points(projections);
    //display
    //h_box.display();


    //fill faces
    noStroke();
    fill(h_box.color);
		for (let quadPointI of cube_faces)
		{
	    beginShape();
	    for(let i of [0,1,2,3])
      {
	      vertex(projections[quadPointI[i]].x, projections[quadPointI[i]].y);
	    }
	    endShape(CLOSE);
		}
  }
}
function perspective_draw_3D_cube_projection(pos3D, projectZ)
{
	const projectX = (pos3D[0]) * projectZ / (pos3D[2]);
	const projectY = (pos3D[1]) * projectZ / (pos3D[2]);
	return createVector(projectX, projectY);
};