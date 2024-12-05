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
		if (this.check_won_at(posKey))
		{
			box.state=BoxStateType.WON_BY;
		}

		//switch user
		this.player_i=(this.player_i+1)%this.players.length;//skip
    return true;
  }
	check_won_at(posKey) {

		let checker=this.grid.at(posKey).checker;

		for (let dir of this.grid.vectors)
		{
			let posKeyMove=[...posKey];
			
			let box;
			let row=0;
			do {
				box=this.grid.at(posKeyMove);
				
				//win line
				if (!(box.checker==checker))//not same pointers
				{
					box=false;
				} else {
					row+=1;
					if (row>=Settings.RULE_BOX_ROW)
					{
						return true;
					}
				}

				//out
				posKeyMove=posKeyMove.map((x, i) => x+dir[i]);//apply vector for next
				for (let keyElement of posKeyMove)
				{
					if (keyElement<0 || keyElement>=this.grid.map_width)
						box=false;
				}
			} while (box)
		}
		return false;
	}
};

class Player {
	constructor(is_bot, color_fill, color_won) {
		this.is_bot=is_bot;
		this.color_fill=color_fill;
		this.color_won=color_won;
	}
}