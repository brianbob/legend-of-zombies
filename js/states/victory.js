var victory = function(game){};

victory.prototype = {
  preload: function() {
    game.load.image('victory', 'assets/game_over.png');
  },

  create: function(){
    game.add.sprite(0, 0, 'victory');
  },

  update: function(){
    if (game.globals.enter.isDown){
      game.state.start('menu');
    }
  }
};
