Game.Preloader = function(game) {
    this.preloadBar = null;
};

Game.Preloader.prototype = {
    preload: function() {
//load assets
    this.load.image('map', 'assets/map.png');
    this.load.image('map2', 'assets/map3.png');    
    this.load.atlas('player', 'assets/player/spritesheet.png', 'assets/player/sprites.json');
        },    
    create: function() {
        
        this.state.start('MainMenu');
    }
};
