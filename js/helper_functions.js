/**
 * Function called to shoot an arrow.
 */
function fireArrow () {
  if(game.globals.arrowsLeft > 0) {    
    // Make sure we only fire one arrow
    if (game.time.now >= game.globals.nextFire ) {
      game.globals.nextFire = game.time.now + game.globals.fireRate;
      var arrow = game.globals.arrows.create(game.globals.player.x, game.globals.player.y, 'arrow');
      
      // Decrement our arrow count by one 
      game.globals.arrowsLeft--;

      // Set the direction of the arrow and it's velocity.
      switch(game.globals.direction) {
        case 'left':
          arrow.reset(game.globals.player.x - 20, game.globals.player.y + 20);
          arrow.angle = 270;
          arrow.body.velocity.x = -450;
          break;
        case 'right':
          arrow.reset(game.globals.player.x + 40, game.globals.player.y + 20);
          arrow.angle = 90;
          arrow.body.velocity.x = 450;
          break;
        case 'up':
          arrow.reset(game.globals.player.x + 20, game.globals.player.y - 20);
          arrow.angle = 0;
          arrow.body.velocity.y = -450;
          break;
        case 'down':
          arrow.reset(game.globals.player.x + 20, game.globals.player.y + 40);
          arrow.angle = 180;
          arrow.body.velocity.y = 450;
          break;
        default:
          //player.frame = 18;
      }
    }
  }
}

/**
 * Function that gets called to update the player.
 * 
 * Update the player's direction and velocity, as well as check to see if the 
 * player attempted to fire an arrow.
 *
 */
function updatePlayer() {
  //  Reset the players velocity (movement)
  game.globals.player.body.velocity.x = 0;
  game.globals.player.body.velocity.y = 0;

  if (game.globals.cursors.left.isDown)
  {
    //  Move to the left
    game.globals.player.body.velocity.x = -150;
    game.globals.player.animations.play('left');
    game.globals.direction = 'left';
  }
  else if (game.globals.cursors.right.isDown)
  {
    //  Move to the right
    game.globals.player.body.velocity.x = 150;
    game.globals.player.animations.play('right');
    game.globals.direction = 'right';
  }
  else if (game.globals.cursors.up.isDown )
  {
    game.globals.player.body.velocity.y = -150;
    game.globals.player.animations.play('up');
    game.globals.direction = 'up';
  }
  else if (game.globals.cursors.down.isDown )
  {
    game.globals.player.body.velocity.y = +150;
    game.globals.player.animations.play('down');
    game.globals.direction = 'down';
  }
  else
  {   //  Stand still
    game.globals.player.animations.stop();
    switch(game.globals.direction) {
      case 'left':
        game.globals.player.frame = 12;
        break;
      case 'right':
        game.globals.player.frame = 23;
        break;
      case 'up':
        game.globals.player.frame = 34;
        break;
      case 'down':
        game.globals.player.frame = 1;
        break;
      default:
        //player.frame = 18;
    }
  }

  if (game.globals.spacebar.isDown) {
    fireArrow();
  }
}

/**
 * Function that gets called to update the zombies.
 * 
 * For each zombie, have it attempt to collide with other zombies (to prevent 
 * stacking), have it attempt to collide with the player (to deal damage), and
 * call the zombie update function.
 *
 */
function updateZombies() {
  for (var i = 0; i < game.globals.zombies.length; i++) {
    if (game.globals.zombies[i].alive) {
      game.physics.arcade.overlap(game.globals.player, game.globals.zombies[i].zombie, zombieHitPlayer, null, this);
      //game.physics.arcade.collide(game.globals.zombies, game.globals.zombies[i].zombie);
      game.physics.arcade.overlap(game.globals.arrows, game.globals.zombies[i].zombie, arrowHitZombieFace, null, this);

      game.globals.zombies[i].update();
    }
  }
}

/**
 * Function that gets called to update the arrows.
 * 
 * For each arrow, check to see if it's out of the world bounds. If it is, 
 * destroy it.
 *
 */
function updateArrows() {
  game.globals.arrows.children.forEach(function(arrow) {
    if(arrow.checkWorldBounds) {
      arrow.destroy();
    }
  }, this);
}

/**
 * Function that gets called when an arrow hits a zombie.  
 *
 * Destroy the arrow and deal damage to the zombie.
 *
 * @param {object} zombie
 * @param {object} arrow
 */
function arrowHitZombieFace(zombie, arrow) {
  game.globals.zombies[zombie.name].damage();
  arrow.destroy();
}

/**
 * Function that gets called when a zombie contacts the player.
 * 
 * @todo Currently under construction. Needs to damage the player, not end the game.
 * 
 */
function zombieHitPlayer() {
  console.log('zombiehitplayer called');
  if (game.time.now >= game.globals.nextDamage ) {
    game.globals.nextDamage = game.time.now + game.globals.damageRate;
    game.globals.health -= game.globals.zombieDamage;
    console.log('damage should be being done');
  }
  
  // If the player is dead, start over.
  if(game.globals.health <= 0) {
    game.state.start('gameOver');
  }
}

/**
 *  Creates the game text in the top left corner of the screen.
 */
function createGameText() {
  // Set our text
  var style = { font: "bold 16px Courier", fill: "#fff", align: "center" };
  ammoText = game.add.text(8, 8, 'Arrows: ' + game.globals.arrowsLeft, style);
  healthText = game.add.text(8, 32, 'Health: ' + game.globals.health, style);
}

/**
 *  Updates the game text in the top left corner of the screen.
 */
function updateGameText() {
  ammoText.text = 'Arrows: ' + game.globals.arrowsLeft;  
  healthText.text = 'Health: ' + game.globals.health;
}

/**
 * Create the ground and start the physics engine.
 * 
 * @TODO add tress?
 */
function initializeWorld() {
  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //  A simple background for our game
  game.add.tileSprite(0, 0, 800, 600, 'grass');
}

/**
 * Create the player.
 * 
 * @TODO finish add support for multiple players
 * 
 * @param player
 *   The player name as a string.
 */
function initializePlayer(player) {
  // Create the player object.
  game.globals.player = game.add.sprite(132, game.world.height - 150, 'link');

  //  We need to enable physics on the player
  game.physics.arcade.enable(game.globals.player);

  // Don't allow the player to go outside of the world.
  game.globals.player.body.collideWorldBounds = true;
  
  switch (player) {
    case 'mark' :
      game.globals.player.animations.add('left', [11, 12, 13], 10, true);
      game.globals.player.animations.add('right', [22, 23, 24], 10, true);
      game.globals.player.animations.add('down', [0, 1, 2], 10, true);
      game.globals.player.animations.add('up', [33, 34, 35], 10, true);
      break;
    case 'brian' :
      break;
    case 'kevin' :
      break;
    case 'adam' :
      break;
  }
}

/**
 * Create zombies! 
 * 
 * @param level 
 *   The current level, expressed as an int. (i.e., 1, 2, or 3)
 */
function createZombies(level) {
  //  Create (or recreate) our zombie group and array
  game.globals.zombieGroup = game.add.group();
  game.globals.zombies = [];
  
  // Determine how many zombies we're going to add, 
  // determined by what level it is. 
  var numZombs = level * game.globals.enemiesTotal;
  
  // Create the zombies and add them to the zombie group.
  for (var i = 0; i < numZombs; i++) {
    game.globals.zombies.push(new Zombie(i, game, game.globals.player));
  }
}

/**
 * Create the arrows group and set it's properties.
 */
function createArrows() {
  game.globals.arrows = game.add.group();
  game.globals.arrows.enableBody = true;
  game.globals.arrows.physicsBodyType = Phaser.Physics.ARCADE;
  game.globals.arrows.setAll('outOfBoundsKill', true);
  game.globals.arrows.setAll('checkWorldBounds', true);
}

/**
 *  Checks to see if the level is complete. If it is, it stops the music and 
 *  loads the next level.
 */
function checkforLevelCompletion() {
  if(game.globals.zombieGroup.children.length === 0) {
    // Stop the current level's track.
    this.music.stop();
    game.globals.zombieGroup.destroy();
    
    // Load the next level.
    if (game.state.current === 'levelOne') {
      game.state.start('levelTwo');      
    }
    if (game.state.current === 'levelTwo') {
      game.state.start('levelThree');      
    }
    if (game.state.current === 'levelThree') {
      game.state.start('victory');      
    }
  }
}

/**
 * Starts playing the track passed.
 * 
 * @param {string} music
 *   The name of the track to play
 */
function startMusic(music) {
  this.music = game.add.audio(music);
  this.music.loop = true;
  this.music.play();
}