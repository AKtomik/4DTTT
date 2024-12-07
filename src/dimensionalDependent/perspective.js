
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




const cube_edges = [
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

const cube_faces = [
  [0,2,3,1],
  [0,1,5,4],
  [0,4,6,2],
  [7,6,4,5],
  [7,3,2,6],
  [7,5,1,3],
];

function perspective_init_3D_cube(grid)
{
	//create cube
  const h_box=grid.at([0,0,0]);
	grid.center=[0,0,0];
	h_box.morph.clear();
	h_box.morph.add_point([-1,-1,-1]);
	h_box.morph.add_point([1,-1,-1]);
	h_box.morph.add_point([-1,1,-1]);
	h_box.morph.add_point([1,1,-1]);
	h_box.morph.add_point([-1,-1,1]);
	h_box.morph.add_point([1,-1,1]);
	h_box.morph.add_point([-1,1,1]);
	h_box.morph.add_point([1,1,1]);

	//add distance
  for (let posKey of grid.map_keys)
  {
    const h_box = grid.at(posKey);
		for (let i=0;i<h_box.morph.get_points_amount();i+=1)
		{
			h_box.morph.get_point(i)[2] += Settings.PERSPECTIVE_DISTANCE;
		}
	}
	grid.center[2] += Settings.PERSPECTIVE_DISTANCE;
}
function perspective_draw_3D_cube(grid)
{
	//screen
  const margin = Scale.min(Settings.POS_BOX_MARGIN);
  let square_top = [(Scale.x(Settings.POS_BOX_FULL) - Scale.min(Settings.POS_BOX_FULL))/2 + margin, (Scale.y(Settings.POS_BOX_FULL) - Scale.min(Settings.POS_BOX_FULL))/2 + margin];
  let square_size = [Scale.min(Settings.POS_BOX_FULL) - 2*margin, Scale.min(Settings.POS_BOX_FULL) - 2*margin];
	//draw
  stroke(255);
  fill(0,0);
  strokeWeight(3);
  grid.sort_keys();
	//projection
	const projectZ = 1/Math.tan(Settings.PERSPECTIVE_FOV);
  

  for (let posKey of [[0,0,0]])
  {
    const h_box = grid.at(posKey);
		let projections=h_box.morph.points.map(pos => {
				let vector=perspective_draw_3D_cube_projection(pos,projectZ);
				vector.x=square_top[0]+(vector.x+1)/2*square_size[0];
				vector.y=square_top[1]+(vector.y+1)/2*square_size[1];
				return vector;
			});

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
}
function perspective_draw_3D_cube_projection(pos3D, projectZ)
{
	const projectX = pos3D[0] * projectZ / pos3D[2];
	const projectY = pos3D[1] * projectZ / pos3D[2];
	return createVector(projectX, projectY);
};