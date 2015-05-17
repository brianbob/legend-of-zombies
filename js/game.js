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
var enemiesAlive;
var enemiesTotal;

function preload() {
  game.load.image('grass', 'assets/grass3.jpg');
  game.load.image('zombies', 'assets/zombies.png', 32, 32);
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
  
  // create our zombies
  zombies = [];
  enemiesTotal = 1;
  enemiesAlive = 20;

  for (var i = 0; i < enemiesTotal; i++) {
    zombies.push(new Zombie(i, game, player));
  }

  // create our bullets
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  // @TODO: Figure out how to manage arrows. Also, print that value to the
  // screen
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
  //enemiesAlive = 0;

  for (var i = 0; i < zombies.length; i++)
  {
    if (zombies[i].alive) {
      //enemiesAlive++;
      // game.physics.arcade.collide(tank, enemies[i].tank);
      // game.physics.arcade.overlap(bullets, enemies[i].tank, bulletHitEnemy, null, this);
      zombies[i].update();
    }
  }
}





