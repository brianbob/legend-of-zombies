var menu = function(game){};
var start_time;
var timer = 0;
var text;

menu.prototype = {
  preload: function() {
    game.load.image('start', 'assets/legend_of_zombies_screen.png');
    this.music = game.add.audio('start');
    this.music.loop = true;
  },

  create: function () {
    this.music.play();
    game.add.sprite(0, 0, 'start');
    var style = { font: "bold 30px Courier", fill: "#fff", align: "center" };
    text = game.add.text(175, 450, '         LOADING...', style);
  },

  update: function () {
    timer += game.time.elapsed;

    if (timer >= 750) {
      timer -= 1000;
      text.visible = !text.visible;
    }

    if (this.music.isPlaying) {
      text.text = 'Press spacebar to start...';

      if (game.globals.spacebar.isDown){
        // Stop the menu music so the level music can start
        this.music.stop();
        // Reset all variables for fresh game start.
        // @todo
        // Start the first level
        game.state.start('levelOne');
      }
    }
  }
};
