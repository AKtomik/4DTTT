function collision_by_front(mouseEvent, game)
{
  const pointer_at = createVector(mouseEvent.clientX, mouseEvent.clientY);
  
  game.grid.sort_keys();
  //reverse iteration
  for (let i=game.grid.map_keys.length-1;i>=0;i--)
  {
    const h_box = game.grid.at(game.grid.map_keys[i]);
    if (h_box.shape.isInside(pointer_at))
    {
      game.player_check_at(game.grid.map_keys[i]);
      return;
    }
  }
}