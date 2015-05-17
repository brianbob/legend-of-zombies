function fireArrow () {
  // Make sure we don't fire a million rounds per click.
  if (game.time.now >= nextFire ) {
    nextFire = game.time.now + fireRate;
    var bullet = arrows.getFirstExists(false);
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

function updatePlayer() {
  //  Reset the players velocity (movement)
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  if (cursors.left.isDown)
  {
    //  Move to the left
    player.body.velocity.x = -150;
    player.animations.play('left');
    direction = 'left';
  }
  else if (cursors.right.isDown)
  {
    //  Move to the right
    player.body.velocity.x = 150;
    player.animations.play('right');
    direction = 'right';
  }
  else if (cursors.up.isDown )
  {
    player.body.velocity.y = -150;
    player.animations.play('up');
    direction = 'up';
  }
  else if (cursors.down.isDown )
  {
    player.body.velocity.y = +150;
    player.animations.play('down');
    direction = 'down';
  }
  else
  {   //  Stand still
    player.animations.stop();
    switch(direction) {
      case 'left':
        player.frame = 13;
        break;
      case 'right':
        player.frame = 4;
        break;
      case 'up':
        player.frame = 29;
        break;
      case 'down':
        player.frame = 18;
        break;
      default:
        //player.frame = 18;
    }
  }

  if (spacebar.isDown)
  {
    fireArrow();
  }
}

 /**
 * Create our zombie class
 *
 * @param {type} index
 * @param {type} game
 * @param {type} player
 * @returns {Zombie} 
 * */
Zombie = function (index, game, player) {

  var x = game.world.randomX;
  var y = game.world.randomY;

  this.game = game;
  // @TODO make this different depending on the type of zombie.
  this.health = 3;
  this.player = player;
  this.alive = true;
  
  this.zombie = game.add.sprite(x, y, 'zombies');

  // I have no idea what this does.
  this.zombie.anchor.set(0.5);

  this.zombie.name = index.toString();
  game.physics.enable(this.zombie, Phaser.Physics.ARCADE);
  this.zombie.body.immovable = false;
  this.zombie.body.collideWorldBounds = true;
  this.zombie.body.bounce.setTo(1, 1);

  this.zombie.animations.add('left', [12, 13, 14], 10, true);
  this.zombie.animations.add('right', [24, 25, 26], 10, true);
  this.zombie.animations.add('down', [0, 1, 2], 10, true);
  this.zombie.animations.add('up', [36, 37, 38], 10, true);
  
  //this.zombie.angle = game.rnd.angle();
  //game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);

};

Zombie.prototype.damage = function() {

  this.health -= 3;

  if (this.health <= 0) {
      this.alive = false;
      this.zombie.kill();

      return true;
  }

  return false;
};

Zombie.prototype.update = function() {
  //this.turret.rotation = this.game.physics.arcade.angleBetween(this.tank, this.player);
  //if (this.game.physics.arcade.distanceBetween(this.tank, this.player) < 300) 
  
  this.zombie.body.velocity.x = 0;
  this.zombie.body.velocity.y = 0;
  
  //console.log('Player.x: ' + this.player.x);
  //console.log('zombie.x: ' + this.x);
  
  if(this.player.x < this.zombie.x) {
    this.zombie.body.velocity.x = -25;
  }
  else if (this.player.x > this.zombie.x){
    this.zombie.body.velocity.x = 25;
  }
  
  if(this.player.y < this.zombie.y) {
    this.zombie.body.velocity.y = -25;
  }
  else if(this.player.y > this.zombie.y) {
    this.zombie.body.velocity.y = 25;
  }

  // @TODO Update the zombie direction
  this.zombie.frame = 1;
};

function arrowHitZombieFace(zombie, arrow) {
  arrow.kill();
  zombies[zombie.name].damage();
  //var destroyed = zombies[zombie.name].damage();
}

function gameOver() {
  player.kill()
  console.log('you suck! game over...');
}