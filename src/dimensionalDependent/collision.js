function collision_by_front(mouseEvent, game)
{
  const pointer_at = createVector(mouseEvent.clientX, mouseEvent.clientY);
  let checkPosKey = undefined;
  for (let posKey of game.grid.map_keys)
  {
    const h_box = game.grid.at(posKey);
    
    if (h_box.shape.isInside(pointer_at) && (!checkPosKey || grid.is_in_front(posKey, checkPosKey)))
    {
      checkPosKey = posKey;
    }
  }

  if (checkPosKey)
  {
    game.player_check_at(checkPosKey);
  }
}