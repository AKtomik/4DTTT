//not dimensionnal dependant
class Game {
  constructor(state=0) {
    
    this.mechanic=new Mechanic(this, this.init, this.display);
    this.mechanic.addAction(SketchEvents.PRESS, this.action_press);
    this.mechanic.addAction(SketchEvents.CLICK, this.action_click);
    this.mechanic.addAction(SketchEvents.DRAG, this.action_drag);
    this.mechanic.addAction(SketchEvents.WHEEL, this.action_wheel);
  }

  kill() {
    console.log("kill game");
    this.mechanic.kill();
  }

  get playing() {
    return this.players[this.turn_i];
  }

  playerName(playerIndex) {
    if (playerIndex===-1)
      return "no one";
    return this.players[playerIndex].name;
  }

  say_turn(stating=false, playerScored=-1)
  {
    if (!bytee) return;

    let byteText="..";
    let byteEmotion=byteEmotionFace.normal;
    let keepByteEmotion=false;

    const playerPlayingName=this.playerName(this.turn_i);
    const playerWiningName=this.playerName(this.winer_i);
    
    //[ logic here
    if (stating)
    {//start the game
      byteText=`lets go! ${playerPlayingName} start, because I want.`;
      byteEmotion=byteEmotionFace.happy;

    }
    else if (this.remain===0)
    {//finish the game
      if (this.winer_i===-1)
      {//tie
        byteText=`it's ended. but no one won.`;
        byteEmotion=byteEmotionFace.bory;
        keepByteEmotion=true;
      } else {//no tie
        byteText=`it's ended. ${playerWiningName} won!`;
        byteEmotion=byteEmotionFace.cuty;
        keepByteEmotion=true;
      }
    }
    else
    {//change turn
      if (playerScored===-1)
      {//no one scored
        byteText=`${playerPlayingName}'s turn.`;
        byteEmotion=byteEmotionFace.normal;
      } else {//someone scored
        if (playerScored==this.winer_i && playerScored!=this.lastWiner_i)
        {
          byteText=`${this.playerName(playerScored)} scored and take the lead!\n ${playerPlayingName}'s turn.`;
          byteEmotion=byteEmotionFace.cuty;
        } else {
          byteText=`${this.playerName(playerScored)} scored!\n ${playerPlayingName}'s turn.`;
          byteEmotion=byteEmotionFace.happy;
        }
      }
    }
    //]

    //save last emotion if needed
    if (this.lastKeepedByteEmotion)
    {
      bytee.removeEmotion(this.lastKeepedByteEmotion);
    }
    if (keepByteEmotion)
      this.lastKeepedByteEmotion=byteEmotion;

    bytee.setSpeak(byteText);
    bytee.addEmotion(byteEmotion, keepByteEmotion);
  }

  player_check_at(posKey) {
    const placer=this.playing;

		//check box
		const box=this.grid.at(posKey);
    if (box.state!==BoxStateType.EMPTY) return false;
    box.state=BoxStateType.FILL_BY;
    box.check(placer);

		//check won
		const scoredNow=this.check_won_at(posKey);
		this.remain--;

		//switch user
    const turnNow=this.turn_i;
		this.turn_i=(this.turn_i+1)%this.players.length;//skip
    this.say_turn(false, scoredNow ? turnNow : -1);
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
      this.lastWiner_i=this.winer_i;
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
		translation_key_nD(event, this.grid);
	}
	action_click(event)
	{
		collision_by_front(event, this);
	}
	action_drag(event)
	{
		translation_drag_nD(event, this.grid);
	}
	action_wheel(event)
	{
		translation_wheel_nD(event, this.grid);
	}
	
	init()
	{
		this.grid=new Grid(Settings.RULE_BOX_WIDTH, Settings.RULE_BOX_D);
	  this.players=[];
	  for (let playerIndex=0;playerIndex<Settings.PLAYERS;playerIndex++)
	  {
	    this.players.push(new Player(false, playerIndex, `player ${playerIndex+1}`));
	  }
		this.turn_i=Math.floor(Math.random()*this.players.length);
		this.winer_i=-1;

		this.state=0;
		this.remain=this.grid.map_keys.length;

    //bytee.addEmotion(byteEmotionFace.bory, true);
    this.say_turn(true);

    translation_init_nD(this.grid);
    perspective_init_nD(this.grid);
	}
	display()
	{
		//--

    //test

    //perfs
    if (Settings.DEBUG)
    {
      fill(255,0,255);
      textSize(Scale.min(20));
      textAlign(RIGHT,TOP);
      strokeWeight(0);
      textStyle(BOLD);

      
      let speeds="";
      for (let moveKey of Object.keys(move_aviable))
      {
        if (game.grid.velocity[moveKey].velocity)
          speeds+=`${Math.round(game.grid.velocity[moveKey].velocity*100)} ${matrix_move[moveKey].lore}\n`;
      }
      if (speeds)
        speeds="\nspeed :\n"+speeds;
      
      const now=new Date().getTime();
      frameAgo[frameCount]=now;//now
      const frameLogValue=[1,3,10,60];
      let frameLoged={};
      let frameIndex=frameCount;
      for (let logTime of frameLogValue)
      {
        let timeDownLog=now-logTime*1000;
        while (frameAgo[frameIndex]>timeDownLog && frameIndex>=0)
        {
          frameIndex--;
        }
        frameLoged[logTime]=Math.round((frameCount-frameIndex)/logTime);
      }
      let toLast=frameAgoLast;
      frameAgoLast=frameIndex;
      while (toLast<frameIndex)
      {
        delete frameAgo[frameIndex];
        frameIndex--;
      }
      
      text(`
      perfs :
      frame ${frameCount}
      ${Math.round(1000/(deltaTime))} fps - now
      ${frameLoged[1]} fps -  1s
      ${frameLoged[3]} fps -  3s
      ${frameLoged[10]} fps - 10s
      ${frameLoged[60]} fps - 60s
      ${Object.keys(frameAgo).length} expensive

      ${speeds}`, Scale.x(980), Scale.y(20));
    }
    
    //players
    fill(ColorPalet.get("theme_text"));
    textSize(Scale.min(100));
    textAlign(LEFT, CENTER);
    text(`scores`, Scale.x(25), Scale.y(300));
    const here_text_size_score=120;
    const here_text_size_name=60;
    const here_at_begin_y=400;
    const here_at_slide_y=100;
    const here_forward_more_x=50;
    const here_forward_more_size=5;
    const here_size_y=50;
    const here_size_x=50;//width added to it
    const here_size_backmiddle=25;
    const here_time_forward=30;
    
    const playerForwardIndex=(game.remain>0) ? game.turn_i : game.winer_i;
    let maxWidth=0;
    for (let playerIndex=0;playerIndex<game.players.length;playerIndex++)
    {//calculate max width
      let width=0;
      if (game.players[playerIndex].score)
      {
        textSize(Scale.min(here_text_size_score));
        textStyle(NORMAL);
        width+=textWidth(String(game.players[playerIndex].score));
      }
      textSize(Scale.min(here_text_size_name));
      textStyle(NORMAL);
      width+=textWidth(String(game.players[playerIndex].name));
      if (width>maxWidth)
      {
        maxWidth=width;
      }
    }
    maxWidth*=1.2;//! just because
    for (let playerIndex=0;playerIndex<game.players.length;playerIndex++)
    {//draw each player
      let step_in=game.players[playerIndex].animation["step_in"]/here_time_forward;
      if (step_in<1 && playerIndex===playerForwardIndex)
      {
        game.players[playerIndex].animation["step_in"]++;
      }
      if (step_in>0 && !(playerIndex===playerForwardIndex))
      {
        game.players[playerIndex].animation["step_in"]--;
      }
      step_in=(Math.cos((1-step_in)*Math.PI)+1)/2;

      let at=createVector(0,here_at_begin_y+here_at_slide_y*playerIndex);  
      let sizing=createVector(here_size_x+step_in*here_forward_more_x, here_size_y);
      
      fill(ColorPalet.get(`player_${playerIndex+1}_dark`));
      beginShape()
      vertex(Scale.x(at.x), Scale.y(at.y))
      vertex(maxWidth+Scale.x(at.x+sizing.x), Scale.y(at.y))
      vertex(maxWidth+Scale.x(at.x+sizing.x-here_size_backmiddle), Scale.y(at.y+(sizing.y/2)))
      vertex(maxWidth+Scale.x(at.x+sizing.x), Scale.y(at.y+sizing.y))
      vertex(Scale.x(at.x), Scale.y(at.y+sizing.y))
      endShape()

      let scoreWidth=0;
      if (game.players[playerIndex].score)
      {
        textSize(Scale.min(here_text_size_score));
        textStyle(NORMAL);
        fill(ColorPalet.get(`player_${playerIndex+1}_ligth`));
        text(String(game.players[playerIndex].score), Scale.x(at.x+5), Scale.y(at.y+sizing.y/2-10));
        scoreWidth=textWidth(String(game.players[playerIndex].score));
      }
      
      let size_more=(game.remain>0)
      ? step_in
      : ((1+Math.sin(frameCount/5))/2)*step_in;
      textSize(Scale.min(here_text_size_name+ size_more*here_forward_more_size));
      textStyle(NORMAL);
      fill(ColorPalet.get(`player_${playerIndex+1}_ligth`));
      //fill(ColorPalet.get("theme_text"));
      text(String(game.players[playerIndex].name), Scale.x(at.x+scoreWidth+10), Scale.y(at.y+sizing.y/2));
    }

    //turn
    textStyle(BOLD);
    if (game.remain>0)
    {
      fill(ColorPalet.get("theme_text"));
      textSize(Scale.min(25));
      text(`remain ${game.remain}`, Scale.x(50), Scale.y(450+100*game.players.length));
    } else {
      if (game.winer_i===-1)
      {
        fill(ColorPalet.get("theme_text"));
        textSize(Scale.min(80));
        text(`égalitée`, Scale.x(40), Scale.y(450+100*game.players.length));
      } else {
        fill(ColorPalet.get(`player_${game.winer_i+1}_text`));
        textSize(Scale.min(80));
        text(`${game.players[game.winer_i].name} won`, Scale.x(40), Scale.y(450+100*game.players.length));
      }
    }
		//--


    translation_draw_nD(this.grid);//dont wait the promise to be resolved
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

class JustCube {
  constructor(state=0) {
    this.mechanic=new Mechanic(this, this.init, this.display);
    this.mechanic.addAction(SketchEvents.PRESS, this.action_press);
    this.mechanic.addAction(SketchEvents.DRAG, this.action_drag);
    this.mechanic.addAction(SketchEvents.WHEEL, this.action_wheel);
  }

  kill() {
    this.mechanic.kill();
  }

	action_press(event)
	{
		translation_key_nD(event, this.grid);
	}
	action_drag(event)
	{
		translation_drag_nD(event, this.grid);
	}
	action_wheel(event)
	{
		translation_wheel_nD(event, this.grid);
	}
	
	init()
	{
		this.grid=new Grid(Settings.RULE_BOX_WIDTH, Settings.RULE_BOX_D);
    translation_init_nD(this.grid);
    perspective_init_nD(this.grid);
	}
	display()
	{
    translation_draw_nD(this.grid);//dont wait the promise to be resolved
	  const margin = Scale.min(400);
    // [/2] -> [/10]
	  let square_top = [(Scale.x(Settings.POS_BOX_FULL) - Scale.min(Settings.POS_BOX_FULL))/10 + margin, (Scale.y(Settings.POS_BOX_FULL) - Scale.min(Settings.POS_BOX_FULL))/2 + margin];
	  let square_size = [Scale.min(Settings.POS_BOX_FULL) - 2*margin, Scale.min(Settings.POS_BOX_FULL) - 2*margin];	
    perspective_draw_nD(this.grid, square_top, square_size);
	}
};