var levelOne = function(game){};

levelOne.prototype = {
  create: function(){
    startMusic('levelOne');
   
    initializeWorld();
    initializePlayer('mark');

    createZombies(1);
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
