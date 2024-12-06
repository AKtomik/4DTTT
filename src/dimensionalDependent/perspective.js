function perspective_by_2D_flat(grid)
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

function perspective_by_3D_flat(grid)
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