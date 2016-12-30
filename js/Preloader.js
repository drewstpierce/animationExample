Game.Preloader = function(game) {
    this.preloadBar = null;
};

Game.Preloader.prototype = {
    preload: function() {
//load assets
    this.load.image('background0', 'assets/parallax0.png');
      this.load.image('background1', 'assets/parallax1.png');
        this.load.image('background2', 'assets/parallax2.png');
          this.load.image('background3', 'assets/parallax3.png'); 
          this.load.audio('playerWalkAudio', 'assets/audio/playerWalkAudio.mp3');
          this.load.audio('playerRunAudio', 'assets/audio/playerRunAudio.mp3');
    this.load.atlas('player', 'assets/player/spritesheet.png', 'assets/player/sprites.json');
        },    
    create: function() {
        
        this.state.start('MainMenu');
    }
};
