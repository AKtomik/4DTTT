class Game {
  constructor(grid, ptrPlayers, state=0) {
    
		this.grid=grid;
		this.players=ptrPlayers;
		this.player_i=Math.floor(Math.random()*this.players.length);

		this.state=state;
  }

  get playing() {
    return this.players[this.player_i];
  }

  player_check_at(posKey) {
    const placer=this.playing;

		//check box
		const box=this.grid.at(posKey);
    if (box.state!==BoxStateType.EMPTY) return false;
    box.state=BoxStateType.FILL_BY;
    box.checker=placer;

		//check won

		//switch user
		this.player_i=(this.player_i+1)%this.players.length;//skip
    return true;
  }
	check_won_at(posKey) {

		return;
	}
};

class Player {
	constructor(is_bot, color_fill, color_won) {
		this.is_bot=is_bot;
		this.color_fill=color_fill;
		this.color_won=color_won;
	}
}