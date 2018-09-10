var levelTwo = function(game){};

levelTwo.prototype = {
  create: function(){
    startMusic('levelTwo');
   
    initializeWorld();
    initializePlayer('mark');

    createZombies(2);
    createArrows();
    
    createGameText();
  },
  update: function(){
    updatePlayer();
    updateArrows();
    updateZombies();
    
    updateGameText();
    
    checkforLevelCompletion();
  }
};
