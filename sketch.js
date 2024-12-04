

//--- in ---
class Box {
  //static
  static state_to_color = {
    0: [0,0],
    1: [0,255,0,128],
    2: [255,0,0,128],
  };

  //map
  static box_map = [];
  static map_deepth = 0;
  static map_width = 0;
  static create_map(width, deepth)
  {
    Box.map_deepth = deepth;
    Box.map_width = width;
    Box.box_map = Box.build_deep(width, deepth);
    console.log("Box.box_map:", Box.box_map);
  };
  static build_deep(width, layer)
  {
    if (layer===0) return (new Box());
    return Array(width).fill(0).map(() => Box.build_deep(width, layer-1));
  };

  //object
  constructor()
  {
    this.state=0;
    this.shape=new Polygon();
    return this;
  };
  get color()
  {
    return color(Box.state_to_color[this.state]);
  };
  display()
  {
    fill(this.color);
    this.shape.display();
  }
};

Box.create_map(Settings.RULE_BOX_WIDTH, Settings.RULE_BOX_D);


//--- click ---

var game=new Game();


function mousePressed(event) {
  
  const pointer_at=createVector(mouseX, mouseY);
  console.log("mousePressed event: ",event,pointer_at);

  for (let i=0;i<3;i+=1)
  {
    for (let j=0;j<3;j+=1)
    {
      let h_box = Box.box_map[i][j];
      if (h_box.shape.isInside(pointer_at))
      {
        console.log("HIT BOX AT ",i,j);
        h_box.state=game.place();
      }
    }
  }

}


//--- draw ---

function setup() {
  createCanvas(...Scale.resize());
  background(color(0,100,200));
  //ellipseMode(CORNERS);
  //angleMode(DEGREES);//!
  textFont('Courier New'); // Good font
  //frameRate(Settings.FPS);
  describe('ttt');
}

function draw() {
  background(color(0,100,200));

  // Set angle based on frameCount, and display current value
  //let angle = frameCount % 360;

  {//title text
    fill(255);
    textSize(20);
    textAlign(LEFT, CENTER);
    strokeWeight(1);
    text(`4D Tick Tac Toe`, 25, 25);
  }

  // Draw grid
  {
    const margin = Scale.min(Settings.POS_BOX_MARGIN);
    let square_top = [(Scale.x(Settings.POS_BOX_FULL) - Scale.min(Settings.POS_BOX_FULL))/2 + margin, (Scale.y(Settings.POS_BOX_FULL) - Scale.min(Settings.POS_BOX_FULL))/2 + margin];
    let square_size = [Scale.min(Settings.POS_BOX_FULL) - 2*margin, Scale.min(Settings.POS_BOX_FULL) - 2*margin];
    
    //little box
    stroke(255);
    strokeWeight(3);
    for (let i=0;i<3;i+=1)
    {
      for (let j=0;j<3;j+=1)
      {
        let h_box = Box.box_map[i][j];
        //position
        h_box.shape.set_points(make_rectangle(square_top[0]+square_size[0]*i/3, square_top[1]+square_size[1]*j/3, square_size[0]/3, square_size[1]/3));
        //display
        h_box.display();
      }
    }
    
    //rectangle as outline
    strokeWeight(6);
    noFill();
    rect(...square_top, ...square_size);
  }
}
/*
  // Draw moving points

  let pointX = Scale.x(circleX) + Scale.x(circleRadius) * cos(angle);
  let pointY = Scale.y(circleY) - Scale.x(circleRadius) * sin(angle);

  line(Scale.x(circleX), Scale.y(circleY), pointX, pointY);

  noStroke();

  fill('white');
  circle(pointX, pointY, 10);

  fill('orange');
  circle(pointX, Scale.y(circleY), 10);

  fill('red');
  circle(Scale.x(circleX), pointY, 10);

  // Draw graph

  stroke('grey');
  strokeWeight(3);
  line(Scale.x(graphX), Scale.y(graphY), Scale.x(graphX) + 300, Scale.y(graphY));
  line(Scale.x(graphX), Scale.y(graphY) - Scale.y(graphAmplitude), Scale.x(graphX), Scale.y(graphY) + Scale.y(graphAmplitude));
  line(
    Scale.x(graphX) + Scale.x(graphPeriod),
    Scale.y(graphY) - Scale.y(graphAmplitude),
    Scale.x(graphX) + Scale.x(graphPeriod),
    Scale.y(graphY) + Scale.y(graphAmplitude)
  );

  fill('grey');
  strokeWeight(1);
  textAlign(CENTER, CENTER);
  text('0', Scale.x(graphX), Scale.y(graphY) + Scale.y(graphAmplitude) + 20);
  text('360', Scale.x(graphX) + Scale.x(graphPeriod), Scale.y(graphY) + Scale.y(graphAmplitude) + 20);
  text('1', Scale.x(graphX) / 2, Scale.y(graphY) - Scale.y(graphAmplitude));
  text('0', Scale.x(graphX) / 2, Scale.y(graphY));
  text('-1', Scale.x(graphX) / 2, Scale.y(graphY) + Scale.y(graphAmplitude));

  fill('orange');
  text('cos', Scale.x(graphX) + Scale.x(graphPeriod) + Scale.x(graphX) / 2, Scale.y(graphY) - Scale.y(graphAmplitude));
  fill('red');
  text('sin', Scale.x(graphX) + Scale.x(graphPeriod) + Scale.x(graphX) / 2, Scale.y(graphY));

  // Draw cosine curve

  noFill();
  stroke('orange');
  beginShape();
  for (let t = 0; t <= 360; t++) {
    let x = map(t, 0, 360, Scale.x(graphX), Scale.x(graphX) + Scale.x(graphPeriod));
    let y = Scale.y(graphY) - Scale.y(graphAmplitude) * cos(t);
    vertex(x, y);
  }
  endShape();

  // Draw sine curve

  noFill();
  stroke('red');
  beginShape();
  for (let t = 0; t <= 360; t++) {
    let x = map(t, 0, 360, Scale.x(graphX), Scale.x(graphX) + Scale.x(graphPeriod));
    let y = Scale.y(graphY) - Scale.y(graphAmplitude) * sin(t);
    vertex(x, y);
  }
  endShape();

  // Draw moving line

  let lineX = map(angle, 0, 360, Scale.x(graphX), Scale.x(graphX) + Scale.x(graphPeriod));
  stroke('grey');
  line(lineX, Scale.y(graphY) - Scale.y(graphAmplitude), lineX, Scale.y(graphY) + Scale.y(graphAmplitude));

  // Draw moving points on graph

  let orangeY = Scale.y(graphY) - Scale.y(graphAmplitude) * cos(angle);
  let redY = Scale.y(graphY) - Scale.y(graphAmplitude) * sin(angle);

  noStroke();

  fill('orange');
  circle(lineX, orangeY, 10);

  fill('red');
  circle(lineX, redY, 10);
*/