Game.MainMenu = function (game) {

};

Game.MainMenu.prototype = {
    create: function () {
      
        
        this.loadingText = this.add.text(this.game.width/2, this.game.height / 2, "Click or press Enter to start", { font: "10px monospace", fill: "#fff" });
        this.loadingText.anchor.setTo(0.5, 0.5);

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.enterKey.onDown.add(this.playGame, this);
    },

    update: function () {
        if (this.game.input.activePointer.isDown) {
            this.playGame();
        }
    },

    playGame: function () {
        this.state.start('Level1');
    }
};