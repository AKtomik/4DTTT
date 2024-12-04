class Game {
  constructor() {
    this.player_playing=Math.round(Math.random())+1;
  }
  place() {
    const v=this.player_playing;
    this.player_playing=(this.player_playing)%2+1;
    return v;
  }
};