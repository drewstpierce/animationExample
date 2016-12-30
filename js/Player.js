var Player = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');

        this.game.enableBody = true;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.setTo(.5, .5);
        this.body.setSize(32, 48);
        this.body.allowRotation = false;
        this.facing = 'right';
        this.state = 'idle';
        this.running = false;
        this.turning = false;
        this.canJump = true;
        this.falling = false;
        this.walkTime = 0;
       var idle = this.animations.add('idle', Phaser.Animation.generateFrameNames('idle', 1, 3), 2, false);
       var jump = this.animations.add('jump', Phaser.Animation.generateFrameNames('jump', 1, 5), 11, false);
       var walk =  this.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 1, 12), 12, false);
       var fall = this.animations.add('fall', Phaser.Animation.generateFrameNames('fall', 1, 2), 12, true);
       var run = this.animations.add('run', Phaser.Animation.generateFrameNames('run', 1, 12), 15, true);
       var crouch = this.animations.add('crouch', Phaser.Animation.generateFrameNames('crouch', 1, 3), 2, false);
       var turn = this.animations.add('turn', Phaser.Animation.generateFrameNames('turn', 1, 11), 15, false);

        walk.onComplete.add(this.addRun, this);
        turn.onComplete.add(this.turnTransition, this);   
      };

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

    Player.prototype.update = function() {  
    if ((this.state === 'runRight') || (this.state === 'runLeft')) {
        this.playerRunSound();
    } else if ((this.state === 'turningRight') || (this.state === 'turningLeft')) {
        this.playerTurnSound();
      }
     /* I'd usually implement a switch statement in this case, but I plan
     on adding more states in the future (hence the additional animations 
     in the sprite atlas). */    
//idle==========================================

      if ((this.facing === 'left') && (!this.game.input.activePointer.isDown)) {
        this.animations.play('idle');
        this.scale.x = -1;
        this.facing = 'left';
        this.running = false;
        this.turning = false;
        this.body.velocity.x = 0;
        this.state = 'idleLeft';
      } 

      if ((this.facing === 'right') && (!this.game.input.activePointer.isDown))   {
        this.animations.play('idle');
        this.scale.x = 1;
        this.facing = 'right';
        this.running = false;
        this.turning = false;
        this.body.velocity.x = 0;
        this.state = 'idleRight';
      } 
      
//walk========================================== 

         if ((this.game.input.activePointer.x < this.game.width/2) && (this.running === false) && (this.turning === false) && (this.game.input.activePointer.isDown)) {
            this.facing = 'left';
            this.state = 'walkLeft';
            this.running = false;
            this.turning = false;
            this.body.velocity.x = -125;
            this.scale.x = -1;
            this.animations.play('walk');
            this.playerWalkSound();
        } else if ((this.game.input.activePointer.x < this.game.width/2) && (this.running === true) && (this.turning === false) && (this.canJump === true) && (this.game.input.activePointer.isDown)) {
          this.body.velocity.x = -155;
        } else if ((this.game.input.activePointer.x < this.game.width/2) && (this.running === false) && (this.turning === true) && (this.canJump === true) && (this.game.input.activePointer.isDown)) {
          this.body.velocity.x = -105;
        } else if ((this.game.input.activePointer.x < this.game.width/2) && (!this.body.onFloor()) && (this.game.input.activePointer.isDown)) {
          this.body.velocity.x = -105;
        }
       else if ((this.game.input.activePointer.x > this.game.width/2) && (this.running === false) && (this.turning === false) && (this.canJump === true) && (this.game.input.activePointer.isDown)) {
            this.facing = 'right';
            this.state = 'walkRight';
            this.running = false;
            this.turning = false;
            this.body.velocity.x = 125;
            this.scale.x = 1;
            this.animations.play('walk');
            this.playerWalkSound();
        } else if ((this.game.input.activePointer.x > this.game.width/2) && (this.running === true) && (this.turning === false) && (this.canJump === true) && (this.game.input.activePointer.isDown)) {
            this.body.velocity.x = 155;
        } else if ((this.game.input.activePointer.x > this.game.width/2) && (this.running === false) && (this.turning === true) && (this.canJump === true) && (this.game.input.activePointer.isDown)) {
            this.body.velocity.x = 105;
        } else if ((this.game.input.activePointer.x > this.game.width/2) && (!this.body.onFloor()) && (this.game.input.activePointer.isDown)) {
          this.body.velocity.x = 105;
        } 
       
//turn========================================== 

        if ((this.running === true) && (this.facing === 'right') && (this.turning === false) && (this.game.input.activePointer.x < this.game.width/2) && (this.canJump === true) && (this.game.input.activePointer.isDown)) {
              this.running = false;
              this.turning = true;
              this.facing = 'left';
              this.state = 'turningLeft';
              this.scale.x = -1;
              this.body.velocity.x = -125;
              this.canJump = true;
              this.animations.play('turn');
              console.log("turningLeft");
            }
          
         if ((this.running === true) && (this.facing === 'left') && (this.turning === false) && (this.game.input.activePointer.x > this.game.width/2) && (this.canJump === true) && (this.game.input.activePointer.isDown)) {
            this.running = false;
            this.turning = true;
            this.facing = 'right';
            this.state = 'turningRight';
            this.scale.x = 1;
            this.body.velocity.x = 125;
            this.canJump = true;
            this.animations.play('turn');
            console.log("turningRight");
          }

          if ((this.x >= 260) && (this.facing === 'right') && (this.game.input.activePointer.isDown)) {
              this.body.velocity.x = 0;
          }

           if ((this.x <= 84) && (this.facing === 'left') && (this.game.input.activePointer.isDown)) {
              this.body.velocity.x = 0;
          }

      };
          
Player.prototype.addRunRight = function() {
            this.facing = 'right';
            this.state = 'runRight';
            this.scale.x = 1;
            this.turning = false;
            this.running = true;
            this.animations.play('run');
            console.log('RR');
      };

Player.prototype.addRunLeft = function() {
            this.facing = 'left';
            this.state = 'runLeft';
            this.scale.x = -1;
            this.turning = false;
            this.running = true;
            this.animations.play('run');
            console.log("RL");
      };

Player.prototype.addRun = function() {
            if (this.game.input.activePointer.x > this.game.width/2) {
              this.addRunRight();
            } else if (this.game.input.activePointer.x < this.game.width/2) {
              this.addRunLeft();
            }
      };

Player.prototype.turnTransition = function() {
          if (this.game.input.activePointer.x > this.game.width/2) {
            this.addRunRight();
          } 
          else if (this.game.input.activePointer.x < this.game.width/2) {
            this.addRunLeft();
          }
      };

Player.prototype.playerWalkSound = function() {
  if (this.game.time.now > this.walkTime) {
                playerWalkAudio.play();
          this.walkTime = this.game.time.now + 470;
        }              
    };

Player.prototype.playerRunSound = function() {
  if (this.game.time.now > this.walkTime) {
                playerWalkAudio.play();
          this.walkTime = this.game.time.now + 370;
        }              
    };

Player.prototype.playerTurnSound = function() {
  if (this.game.time.now > this.walkTime) {
                playerWalkAudio.play();
          this.walkTime = this.game.time.now + 300;
        }              
    };
