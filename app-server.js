var express = require('express');
var _ = require('underscore');
var app = express();

var connections = [];
var title = 'Untitled Presentation';
var audience = [];

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000);
var io = require('socket.io').listen(server);

var queue = [];    // list of sockets waiting for peers
var rooms = {};    // map socket.id => room
var names = {};    // map socket.id => name
var allUsers = {}; // map socket.id => socket


/************************************************************/
/*** This is the place for possibly some extensive logic  ***/
/*** which can involve preventing two people pairing      ***/
/*** multiple times.                                      ***/
/************************************************************/
var findPeerForLoneSocket = function(socket) {
    if(Object.keys(queue).length>0){
        // Somebody is in queue, pair them!
        var peer = queue.pop();
        var room = socket.id + '#' + peer.id;

        peer.join(room);
        socket.join(room);
        // register rooms to their names
        rooms[peer.id] = room;
        rooms[socket.id] = room;

        // exchange names between the two of them and start the chat
        io.sockets.in(room).emit('startGame', {'room':room});

    } else {
        // queue is empty, add our lone socket
        console.log("waiting for peer");
        queue.push(socket);
    }
}

io.sockets.on('connection', function (socket) {

	socket.once('disconnect', function() {

		var member = _.findWhere(audience, { id: this.id });

		if (member) {
			audience.splice(audience.indexOf(member), 1);
			io.sockets.emit('audience', audience);
			console.log("Left: %s (%s audience members)", member.name, audience.length)
		}

		connections.splice(connections.indexOf(socket), 1);
		socket.disconnect();
		console.log("Disconnected: %s sockets remaining.", connections.length);
	});

	socket.on('join', function(payload) {
		var newMember = {
			id: this.id,
			name: payload.name
		};
		this.emit('joined', newMember);
		audience.push(newMember);
		io.sockets.emit('audience', audience);
		console.log("Audience Joined: %s", payload.name);
	});

	socket.emit('welcome', {
		title: title
	});

	connections.push(socket);
    console.log("Connected: %s sockets connected.", connections.length);
});

console.log("Polling server is running at 'http://localhost:3000'");