// Globals, yo.
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player;
var cursors;
var bullets;
var zombies;
var direction;
var fireRate = 200;
var nextFire = 0;
var spacebar;

function preload() {
  game.load.image('grass', 'assets/grass3.jpg');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/link.png', 32, 40);
  game.load.image('arrow', 'assets/arrow.png');
}


function create() {

  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //  A simple background for our game
  game.add.tileSprite(0, 0, 800, 600, 'grass');

  // The player and its settings
  player = game.add.sprite(132, game.world.height - 150, 'dude');

  //  We need to enable physics on the player
  game.physics.arcade.enable(player);

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.collideWorldBounds = true;

  //  Our two animations, walking left and right.
  player.animations.add('left', [9, 10, 11, 12, 13, 14, 15, 16, 17], 10, true);
  player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, ], 10, true);
  player.animations.add('down', [19, 20, 21, 22, 23, 24, 25, 26, 27 ], 10, true);
  player.animations.add('up', [29, 30, 31, 32, 33, 34, 35, 36, 37 ], 10, true);

  // create our bullets
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'arrow');
  bullets.setAll('outOfBoundsKill', true);
  bullets.setAll('checkWorldBounds', true);

  //  Our controls.
  cursors = game.input.keyboard.createCursorKeys();
  spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
  updatePlayer();
  
  //update zombies
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


