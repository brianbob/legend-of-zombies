
//We use window.game because we want it to be accessible from everywhere
window.game = new Phaser.Game(800, 600, Phaser.AUTO);

// Globals, yo.
game.globals = {
  player: null,        // Variable for the player variable.
  cursors: null,       // Variable for the arrow keys.
  arrows: null,        // Variable for the arrows array.
  zombies: [],         // Variable for the zombie array.
  direction: null,     // Variable for the direction the player is facing.
  fireRate: 200,       // The rate at which arrows can be fired. In milliseconds I think.
  damageRate: 200,     // The rate at which zombie damage can be dealt. In milliseconds I think.
  nextFire: 0,         // Holder for the next time an arrow can be fired.
  nextDamage: 0,       // Holder for the next time zombie damage can be dealt.
  zombieDamage: 10,    // Sets the base damage a zombie does to a player.
  spacebar: null,      // Global spacebar key variable.
  enter: null,         // Global enter key variable.
  enemiesTotal: 5,     // Base number of zombies per level.
  zombieGroup: null,   // Zombie group variable.
  arrowsLeft: 20,      // Number of arrows to start with.
  health: 100          // Player health.
};

// Create our game states
game.state.add('boot', boot);
game.state.add('load', load);
game.state.add('menu', menu);
game.state.add('levelOne', levelOne);
game.state.add('levelTwo', levelTwo);
game.state.add('levelThree', levelThree);
game.state.add('gameOver', gameOver);
game.state.add('victory', victory);

// Start the game.
game.state.start('boot');
