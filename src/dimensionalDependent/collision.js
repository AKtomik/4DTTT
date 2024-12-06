function collision_by_front(pointer_at, game)
{
  let checkPosKey = undefined;
  for (let posKey of game.grid.map_keys)
  {
    const i = posKey[0];
    const j = posKey[1];
    const h_box = game.grid.at(posKey);
    
    if (h_box.shape.isInside(pointer_at) && (!checkPosKey || grid.is_in_front(posKey, checkPosKey)))
    {
      checkPosKey = posKey;
      console.log("HIT BOX ",i,j);
    }
  }

  if (checkPosKey)
  {
    game.player_check_at(checkPosKey);
  }
}