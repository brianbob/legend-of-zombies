var gameOver = function(game){};

gameOver.prototype = {
  preload: function() {
    game.load.image('gameOver', 'assets/game_over.png');
  },

  create: function(){
    game.add.sprite(0, 0, 'gameOver');
  },

  update: function(){
    if (game.globals.enter.isDown){
      game.state.start('menu');
    }
  }
};
