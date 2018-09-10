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
  
  //this.zombie = game.add.sprite(x, y, 'zombies');
  this.zombie = game.globals.zombieGroup.create(x, y, 'zombies');

  // I have no idea what this does.
  //this.zombie.anchor.set(0.5);

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
      this.zombie.destroy();
      // @TODO this.destroy ?

      return true;
  }

  return false;
};

Zombie.prototype.update = function() {
    
  this.zombie.body.velocity.x = 0;
  this.zombie.body.velocity.y = 0;
  
  if(Math.abs(this.player.x - this.zombie.x) > Math.abs(this.player.y - this.zombie.y)) {
    if(this.player.x < this.zombie.x) {
      this.zombie.body.velocity.x = -25;
      this.zombie.animations.play('left');
    }
    else if (this.player.x > this.zombie.x){
      this.zombie.body.velocity.x = 25;
      this.zombie.animations.play('right');
    }
  } else {
    if(this.player.y < this.zombie.y) {
      this.zombie.body.velocity.y = -25;
      this.zombie.animations.play('up');
    }
    else if(this.player.y > this.zombie.y) {
      this.zombie.body.velocity.y = 25;
      this.zombie.animations.play('down');
    } 
  }
};
