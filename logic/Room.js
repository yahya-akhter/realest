var Game = require('./Game');
/*
 * Creating room for you two player.
 * @param old [State]: old state to intialize the new state
 */
var Room = function(data) {

	var globals = {};
	this.roomId = data.roomId;
	this.player1 = data.player1;
	this.player2 = data.player2;

	this.init = function() {
		this.player1.join(this.roomId);
		this.player2.join(this.roomId);
		globals.game = new Game();
		globals.game.start();
		io.sockets.in(this.roomId).emit('startGame', {'roomId':this.roomId});       
    };

    this.init();
}

module.exports = Room;