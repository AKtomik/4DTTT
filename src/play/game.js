//not dimensionnal dependant
class Game {
  constructor(state=0) {
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
    box.check(placer);

		//check won
		this.check_won_at(posKey);
		this.remain--;

		//switch user
		this.player_i=(this.player_i+1)%this.players.length;//skip
    return true;
  }
	check_won_at(posKey) {

		let checker=this.grid.at(posKey).checker;
		let ifScoreChanged=false;

		for (let dir of this.grid.vectors)
		{
			let posKeyMove=[...posKey];
			
			let box;
			let row=0;
			let sens=1;
			let checked=[];

			do {
				box=this.grid.at(posKeyMove);

				if (box && (box.checker==checker) && (box.dir!==dir || Settings.RULE_BOX_ROW_CHAIN))//is inside && have the player as checker && is not already checked in this side
				{
					//in a row
					row+=1;
					checked.push(box);
					if (row>=Settings.RULE_BOX_ROW_LENGTH)
					{
						for (let boxChecking of checked)
						{
							boxChecking.won(dir);
						}
						this.grid.add_checkline(checked);
						checker.score_add();
						ifScoreChanged=true;
						box=false;
						break;
					}
				} else {
					//not checked
					if (sens===1)
					{//change sens
						box=true;
						posKeyMove=[...posKey];
						sens=-1;
					}
					else
					{//no
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

		if (ifScoreChanged)
		{//calculate winer
			let bestScore=0;
			let bestPlayer=-1;
			for (let playerIndex=0;playerIndex<this.players.length;playerIndex++)
			{
				let playerScore=this.players[playerIndex].score;
				if (playerScore>bestScore)
				{
					bestScore=playerScore;
					bestPlayer=playerIndex;
				}
				else if (playerScore===bestScore)
				{
					bestPlayer=-1;
				}
			}
			this.winer_i=bestPlayer;
		}

		return ifScoreChanged;
	}

	action_press(event)
	{
		translation_key_nD(event, this);
	}
	action_click(event)
	{
		collision_by_front(event, this);
	}
	action_drag(event)
	{
		translation_drag_nD(event, this);
	}
	action_wheel(event)
	{
		translation_wheel_nD(event, this);
	}
	
	init()
	{
		this.grid=new Grid(Settings.RULE_BOX_WIDTH, Settings.RULE_BOX_D);
	  this.players=[];
	  for (let playerIndex=0;playerIndex<Settings.PLAYERS;playerIndex++)
	  {
	    this.players.push(new Player(false, playerIndex, `player ${playerIndex+1}`));
	  }
		this.player_i=Math.floor(Math.random()*this.players.length);
		this.winer_i=-1;

		this.state=0;
		this.remain=this.grid.map_keys.length;


    translation_init_nD(this.grid);
    perspective_init_nD(this.grid);
	}
	display()
	{
    translation_draw_nD(this.grid);
	  const margin = Scale.min(Settings.POS_BOX_MARGIN);
	  let square_top = [(Scale.x(Settings.POS_BOX_FULL) - Scale.min(Settings.POS_BOX_FULL))/2 + margin, (Scale.y(Settings.POS_BOX_FULL) - Scale.min(Settings.POS_BOX_FULL))/2 + margin];
	  let square_size = [Scale.min(Settings.POS_BOX_FULL) - 2*margin, Scale.min(Settings.POS_BOX_FULL) - 2*margin];	
    perspective_draw_nD(this.grid, square_top, square_size);
	}
};

class Player {
	constructor(is_bot, igIndex, playerName) {
		this.is_bot=is_bot;
		this.name=playerName;
		this.score=0;
		this.igIndex=igIndex;
		this.animation={};
		this.animation["step_in"]=0;
	}
	//score
	score_add()
	{
		this.score+=1;
	}
}