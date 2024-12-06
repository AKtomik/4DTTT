function make_rectangle(x0,y0,w,h)
{
  return [createVector(x0,y0), createVector(x0+w,y0), createVector(x0+w,y0+h), createVector(x0,y0+h)];
}