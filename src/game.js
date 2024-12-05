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
		this.check_won_at(posKey);

		//switch user
		this.player_i=(this.player_i+1)%this.players.length;//skip
    return true;
  }
	check_won_at(posKey) {

		let checker=this.grid.at(posKey).checker;
		let return_value=false;

		for (let dir of this.grid.vectors)
		{
			let posKeyMove=[...posKey];
			
			let box;
			let row=0;
			let sens=1;
			let checked=[];

			do {
				box=this.grid.at(posKeyMove);

				if (box && (box.checker==checker))//is in && have the player as checker
				{
					//in a row
					row+=1;
					checked.push(box);
					//console.log(`YEP dir ${dir} row ${row} at ${posKeyMove}`);
					if (row>=Settings.RULE_BOX_ROW)
					{
						for (let boxChecking of checked)
						{
							boxChecking.state=BoxStateType.WON_BY;
						}
						checker.score_add();
						box=false;
						break;
					}
				} else {
					//not checked
					if (sens===1)
					{//change sens
						//console.log(`FLIP dir ${dir} row ${row} at ${posKeyMove}`);
						box=true;
						posKeyMove=[...posKey];
						sens=-1;
					}
					else
					{//no
						//console.log(`BREAK dir ${dir} row ${row} at ${posKeyMove}`);
						box=false;
						break;
					}
				}

				//move coord
				posKeyMove=posKeyMove.map((x, i) => x+(dir[i]*sens));//apply vector for next
				//if coord out
				/*
				posKeyMove.forEach(v => {
					if (v<0 || v>=this.grid.map_width)
						box=false;
				});
				*/
			} while (box)
		}
		return return_value;
	}
};

class Player {
	constructor(is_bot, color_fill, color_won) {
		this.is_bot=is_bot;
		this.score=0;
		this.color_fill=color_fill;
		this.color_won=color_won;
	}
	//score
	score_add()
	{
		this.score+=1;
	}
}