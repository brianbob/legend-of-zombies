function fireArrow () {
  // Make sure we don't fire a million rounds per click.
  if (game.time.now >= nextFire ) {
    nextFire = game.time.now + fireRate;
    var bullet = bullets.getFirstExists(false);
    bullet.reset(player.x, player.y);

    //bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 500);
    switch(direction) {
      case 'left':
        bullet.reset(player.x - 20, player.y + 20);
        bullet.angle = 270;
        bullet.body.velocity.x = -450;
        break;
      case 'right':
        bullet.reset(player.x + 40, player.y + 20);
        bullet.angle = 90;
        bullet.body.velocity.x = 450;
        break;
      case 'up':
        bullet.reset(player.x + 20, player.y - 20);
        bullet.angle = 0;
        bullet.body.velocity.y = -450;
        break;
      case 'down':
        bullet.reset(player.x + 20, player.y + 40);
        bullet.angle = 180;
        bullet.body.velocity.y = 450;
        break;
      default:
        //player.frame = 18;
    }
  }
}

