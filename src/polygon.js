//is the 2D on screen projection

// Finds direction (clockwise or anti) of point in relation to line
function isClockwiseFromLine(linep0, linep1, p){
  let vec1 = p5.Vector.sub(linep0, linep1);
  let vec2 = p5.Vector.sub(p, linep1);

  let a = vec1.angleBetween(vec2);

  if (a < 0){
    return true;
  }
  else{
    return false;
  }
}
function intersect(line0p0, line0p1, line1p0, line1p1){
  let line0dir0 = isClockwiseFromLine(line0p0, line0p1, line1p0);
  let line0dir1 = isClockwiseFromLine(line0p0, line0p1, line1p1);

  if(line0dir0 != line0dir1){
    let line1dir0 = isClockwiseFromLine(line1p0, line1p1, line0p0);
    let line1dir1 = isClockwiseFromLine(line1p0, line1p1, line0p1);
    if (line1dir0 != line1dir1){
      return true;
    }
    else{
      return false;
    }
  }
  else{
    return false;
  }
}





//https://editor.p5js.org/amygoodchild/sketches/L7X-WH6X0
class ConcretePolygon {
  //is in 2D
  //can know if inside

	//shape
  constructor() {
    this.points = [];
		
    this.findOuterMostPoints();
  }

	set_points(pointsArrayVector) {
		this.points=pointsArrayVector;
    this.findOuterMostPoints();
	}

	set_point(i, pointVector) {
		this.points[i]=pointVector;
    this.findOuterMostPoints();
	}

	//hitbox
  findOuterMostPoints(){
    this.mostLeft = Infinity;
    this.mostRight = -Infinity;
    this.mostTop = Infinity;
    this.mostBottom = -Infinity;

    for (let p of this.points){
      if (p.x < this.mostLeft) this.mostLeft = p.x;
      if (p.x > this.mostRight) this.mostRight = p.x;
      if (p.y < this.mostTop) this.mostTop = p.y;
      if (p.y > this.mostBottom) this.mostBottom = p.y;
    }
  }

  isInside(dot) {
    // Check if the dot is roughly in the region 
    if (dot.x < this.mostLeft || dot.x > this.mostRight || dot.y < this.mostTop || dot.y > this.mostBottom){
      return false;
    }

    // Create dot2 as the other end of the imaginary horizontal line extending off edge of canvas
    let dot2 = createVector(999999, dot.y);
    
    // Check each line around this polygon, and count up the number of intersects
    let numIntersects = 0;
    for(let i = 0; i < this.points.length; i++){
      let j = (i + 1) % this.points.length;
    
      if (intersect(dot, dot2, this.points[i], this.points[j])) numIntersects++;
    }
    
    // If it's even, the dot is outside
    if (numIntersects % 2 == 0) return false;

    return true;

  }

	//draw
  display() {
    beginShape();
    for(let p of this.points){
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
  }
}


class AbstractPolygon {

	//shape
  constructor() {
    this.quadri = [];
  }

	clear() {
		this.quadri = [];
	}
	add_quadri(multidimQuadri) {
		this.quadri.push(multidimQuadri);
	}

  
	get_quadri(i) {
		return this.quadri[i];
	}
	get_quadri_amount() {
		return this.quadri.length;
	}
  
	set_quadri(i,v) {
		this.quadri[i]=v;
	}
  /*
	set_points(multidimPointsArray) {
		this.points=multidimPointsArray;
	}

	set_point(i, MultidimPoint) {
		this.points[i]=MultidimPoint;
	}
  */
}