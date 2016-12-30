
Game.Level1 = function(game) {};


var leftKey;
var rightKey;
var upKey;
var downKey;
var jumpKey;
var xx;
var yy;
var background1;
var background2;
var nonThreat;
var cursors;
var jumpButton;
var initX;
var sprite;
var coins;
var door;
var doors;
var layer2;
var tiles;
var map;
var dir;


Game.Level1.prototype = {
    create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.world.setBounds(0, 0, 384, 216);
    
    this.world.setBounds(0, 0, 384, 216);
    background0 = this.game.add.tileSprite(0, 0, 384, this.game.height, 'background0');
    background2 = this.game.add.tileSprite(0, 0, 384, this.game.height, 'background2');
background1 = this.game.add.tileSprite(0, 0, 384, this.game.height, 'background1');
background3 = this.game.add.tileSprite(0, 0, 384, this.game.height, 'background3');
    
   
    this.setUpKeys();
    
    this.game.add.existing(
    player = new Player(this.game, this.game.width/2, this.game.height/2 + 55)
    );
    
    this.game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    //audio init
    playerWalkAudio = this.add.audio('playerWalkAudio', 0.5);
    playerRunAudio = this.add.audio('playerRunAudio', 0.5);
   },
    setUpKeys: function() {
        attackKey = this.input.keyboard.addKey(Phaser.Keyboard.X);
        leftKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
        rightKey = this.input.keyboard.addKey(Phaser.Keyboard.D);
        upKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
        downKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
        jumpKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
   
    update: function() {
        this.world.wrap(player, 0, true);

        if ((player.x >= 260) && (player.facing === 'right') &&  (this.game.input.activePointer.isDown)) {
            if (player.state === 'walkRight') {
               background1.tilePosition.x -= .8;
               background2.tilePosition.x -= 1;
                background3.tilePosition.x -= 1.3; 
            } else if (player.state === 'runRight') {
               background1.tilePosition.x -= 1;
               background2.tilePosition.x -= 1.5;
                background3.tilePosition.x -= 2;
        } 
            } else if ((player.x <= 84) && (player.facing === 'left') && (this.game.input.activePointer.isDown)) {
                if (player.state === 'walkLeft') {
               background1.tilePosition.x += .8;
               background2.tilePosition.x += 1;
                background3.tilePosition.x += 1.3; 
            } else if (player.state === 'runLeft') {
               background1.tilePosition.x += 1;
               background2.tilePosition.x += 1.5;
                background3.tilePosition.x += 2;
        } 
            } else {
            background1.tilePosition.x += 0;
            background2.tilePosition.x += 0;
            background3.tilePosition.x += 0;
        }
    }
};
