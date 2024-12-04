

//--- settings ---
let boxFull = 1000;
let boxMargin = 200;


//--- resize ---
class Scale {
  //static values
  static ON=1000;
  static SIZE=[0,0];
  static SCALER=[0,0];
  static DIAG=0;
  static MIN_I=0;
  static MAX_I=0;
  static resize()
  {
    Scale.SIZE = [window.innerWidth, window.innerHeight];
    
    Scale.SCALER = [Scale.SIZE[0]/Scale.ON, Scale.SIZE[1]/Scale.ON];
    Scale.DIAG = Math.pow((Math.pow(Scale.SCALER[0],2)+Math.pow(Scale.SCALER[1],2)),1/2);
    //Scale.DIAG = Math.pow((Math.pow(Scale.SIZE[0],2)+Math.pow(Scale.SIZE[1],2)),1/2);
    if (Scale.SIZE[0]<Scale.SIZE[1])
    {
      Scale.MIN_I = 0;
      Scale.MAX_I = 1;
    } else {
      Scale.MIN_I = 1;
      Scale.MAX_I = 0;
    }
    
    console.log(Scale.SIZE);
    console.log(Scale.ON);
    console.log(Scale.SCALER);
    return Scale.SIZE;
  }

  //resize
  static x(number)
  {
    return number*Scale.SCALER[0];
  }
  static y(number)
  {
    return number*Scale.SCALER[1];
  }
  static diag(number)
  {
    return number*Scale.DIAG;
  }
  static min(number)
  {
    return number*Scale.SCALER[Scale.MIN_I];
  }
  static max(number)
  {
    return number*Scale.SCALER[Scale.MAX_I];
  }
}

//Scale.resize();

window.onresize = function() {
  resizeCanvas(...Scale.resize());
}

//--- in ---

class Box {
  //static
  static state_to_color = {
    0: [0,0],
    1: [0,255,0,128],
    2: [255,0,0,128],
  };
  static build_deep(width, layer)
  {
    if (layer===0) return new Box();
    return Array(width).fill(Box.build_deep(width, layer-1));
  };
  //object
  constructor()
  {
    this.state=0;
  };
  get color()
  {
    return color(Box.state_to_color[this.state]);
  }
};

const BOX_WIDTH=3;
const BOX_D=2;

let box_map=Box.build_deep(BOX_WIDTH, BOX_D);
console.log(box_map);


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


  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);
  text(`4D Tick Tac Toe`, 25, 25);

  // Draw grid
  noFill();
  stroke(255);
  strokeWeight(6);
  {
    //values
    let margin = Scale.min(boxMargin);
    let square_top = [(Scale.x(boxFull) - Scale.min(boxFull))/2 + margin, (Scale.y(boxFull) - Scale.min(boxFull))/2 + margin];
    let square_size = [Scale.min(boxFull) - 2*margin, Scale.min(boxFull) - 2*margin];
    //little box
    strokeWeight(3);
    for (let i=0;i<3;i+=1)
    {
      for (let j=0;j<3;j+=1)
      {
        fill(box_map[i][j].color);
        rect(square_top[0]+square_size[0]*i/3, square_top[1]+square_size[1]*j/3, square_size[0]/3, square_size[1]/3);
      }
    }
    //rectangle as outline
    strokeWeight(6);
    rect(...square_top, ...square_size);
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
}