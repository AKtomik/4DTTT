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

window.onresize = function() {
  resizeCanvas(...Scale.resize());
}
