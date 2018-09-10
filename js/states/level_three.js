var levelThree = function(game){};

levelThree.prototype = {
  create: function(){
    startMusic('levelThree');
   
    initializeWorld();
    initializePlayer('mark');

    createZombies(3);
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
