var load = function(game){};

load.prototype = {
  loadingLabel: function () {
  },

  preload: function () {
    game.load.spritesheet('zombies', 'assets/zombies.png', 32, 32);
    game.load.spritesheet('link', 'assets/link.png', 32, 32);

    game.load.image('grass', 'assets/grass3.jpg');
    game.load.image('arrow', 'assets/arrow.png');

    game.load.audio('start', ['music/all_of_us_start.mp3', 'music/all_of_us_start.ogg']);
    game.load.audio('levelOne', ['music/jumpshot_level_one.mp3', 'music/jumpshot_level_one.ogg']);
    game.load.audio('levelTwo', ['music/chibi_ninja_level_two.mp3', 'music/chibi_ninja_level_two.ogg']);
    game.load.audio('levelThree', ['music/were_the_resistors_level_three.mp3', 'music/were_the_resistors_level_three.ogg'] );
  },

  create: function () {
    //  Set the controls.
    game.globals.cursors = game.input.keyboard.createCursorKeys();
    game.globals.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.globals.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    console.log('loaded, starting menu....');
    game.state.start('menu');
  }
};
