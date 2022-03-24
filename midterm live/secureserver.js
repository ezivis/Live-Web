// We need the file system here
var fs = require('fs');

// Express is a node module for building HTTP servers
var express = require('express');
const Datastore = require('nedb')
var app = express();

// Tell Express to look in the "public" folder for any files first
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api',(request, response) =>{
	database.find({},(err,data) =>{
	if(err){
		response.end();
		return;
	}
	response.json(data);
	});
});

app.post('/api',(request,response) =>{
	const data = request.body;
	database.insert(data);
	response.json(data);
});
// If the user just goes to the "route" / then run this function

// Here is the actual HTTP server 
var https = require('https');

// Security options - key and certificate
var options = {
	key: fs.readFileSync('my-key.pem'),
	cert: fs.readFileSync('my-cert.pem')
  };
  
  // We pass in the Express object and the options object
var httpServer = https.createServer(options, app);

// We pass in the Express object
//var httpServer = http.createServer(app);

// Listen on port 80
httpServer.listen(443);

// WebSocket Portion
// WebSockets work with the HTTP server
const { Server } = require('socket.io');
const { response } = require('express');
const io = new Server(httpServer, {});

var allData = [];

//var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', 
	// We are given a websocket object in our function
	function (socket) {

		for (let i = 0; i < allData.length; i++) {
			socket.emit('mouse', allData[i]);

		}
	
		console.log("We have a new client: " + socket.id);
        io.emit('newuser', socket.id);

		// When this user "send" from clientside javascript, we get a "message"
		// client side: socket.send("the message");  or socket.emit('message', "the message");
		socket.on('word', 
			// Run this function when a message is sent
			function (send) {
				console.log("message: " + send);
				
				// Call "broadcast" to send it to all clients (except sender), this is equal to
				// socket.broadcast.emit('message', data);
				//socket.broadcast.send(data);
				
				// To all clients, on io.sockets instead
				io.emit('word', send);
			}
		);	
		
		socket.on('mouse', 
			// Run this function when a message is sent
			function (send) {
				allData.push(send);
				console.log("message: " + send);
				
				// Call "broadcast" to send it to all clients (except sender), this is equal to
				// socket.broadcast.emit('message', data);
				//socket.broadcast.send(data);
				
				// To all clients, on io.sockets instead
				io.emit('mouse', send);
			}
		);	
		
		socket.on('disconnect', function() {
			console.log("Client has disconnected");
		});
	}
);