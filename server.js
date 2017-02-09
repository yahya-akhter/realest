// var mysql      = require('mysql');
var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));
var server = app.listen(app.get('port'), function() {console.log('Node app is running on port', app.get('port'));});
// var io = require('socket.io').listen(server,{origins:'oses-demo.viewdemo.org:* 104.41.152.223 http://oses-demo.viewdemo.org:* http://www.oses-demo.viewdemo.org:*'});
var io = require('socket.io').listen(server);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var queue = [];    // list of sockets waiting for peers
var rooms = {};    // map socket.id => room
var names = {};    // map socket.id => name
var allUsers = {}; // map socket.id => socket

var findPeerForLoneSocket = function(socket) {
    // this is place for possibly some extensive logic
    // which can involve preventing two people pairing multiple times

    if(Object.keys(queue).length>0){
        // somebody is in queue, pair them!
        var peer = queue.pop();
        var room = socket.id + '#' + peer.id;
        // join them both
     	console.log("Room name = "+room);

        peer.join(room);
        socket.join(room);
        // register rooms to their names
        rooms[peer.id] = room;
        rooms[socket.id] = room;
        // exchange names between the two of them and start the chat
        peer.emit('chat start', {'name': names[socket.id], 'room':room});
        socket.emit('chat start', {'name': names[peer.id], 'room':room});
    } else {
        // queue is empty, add our lone socket
        console.log("waiting for peer");
        queue.push(socket);
    }
}

io.on('connection', function (socket) {
    console.log('User '+socket.id + ' connected');
    socket.on('login', function (data) {
        names[socket.id] = data.username;
        allUsers[socket.id] = socket;
        // now check if sb is in queue
        findPeerForLoneSocket(socket);
    });
    socket.on('message', function (data) {
        var room = rooms[socket.id];
        socket.broadcast.to(room).emit('message', data);
    });
    socket.on('leave room', function () {
        var room = rooms[socket.id];
        socket.broadcast.to(room).emit('chat end');
        var peerID = room.split('#');
        peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
        // add both current and peer to the queue
        findPeerForLoneSocket(allUsers[peerID]);
        findPeerForLoneSocket(socket);
    });
    socket.on('disconnect', function () {
        var room = rooms[socket.id];
        socket.broadcast.to(room).emit('chat end');
        // console.log(room);
        var peerID = room.split('#');
        peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
        // current socket left, add the other one to the queue
        findPeerForLoneSocket(allUsers[peerID]);
    });
});