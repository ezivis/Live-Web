// Express is a node module for building HTTP servers
var express = require('express');
var app = express();

// Tell Express to look in the "public" folder for any files first
app.use(express.static('public'));

// If the user just goes to the "route" / then run this function
app.get('/', function (req, res) {
  res.send('Hello World!')
});

// Here is the actual HTTP server 
var http = require('http');
// We pass in the Express object
var httpServer = http.createServer(app);
// Listen on port 80
httpServer.listen(80);

// WebSocket Portion
// WebSockets work with the HTTP server
const { Server } = require('socket.io');
const io = new Server(httpServer, {});

//var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', 
	// We are given a websocket object in our function
	function (socket) {
	
		console.log("We have a new clientaaaaaa: " + socket.id);
		io.emit('newuser', socket.id);
		
		// When this user emits, client side: socket.emit('otherevent',some data);
		socket.on('chatmessage', function(data) {
			console.log("Received: 'chatmessage' " + data);
			
			io.emit('chatmessage', data);
		});
		
		socket.on('otherevent', function(data) {
			console.log("Received: 'otherevent' " + data);
			io.emit('otherevent', data);
		});

		socket.on('otherevent2', function(data) {
			console.log("Received: 'otherevent2' " + data);
			io.emit('otherevent2', data);
		});

		socket.on('replaysend', function(data) {
			console.log("Received: 'replaysend' " + data);
			io.emit('replaysend', data);
		});

		socket.on('mouse', function(data) {
            data.socketid = socket.id;
            io.emit('mouse', data);
		});

		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);