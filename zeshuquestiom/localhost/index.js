var https = require('https');
var http = require('http');
var fs = require('fs');


const express = require('express');
const Datastore = require('nedb');

const app = express();
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.listen(3000,()=>console.log('listening the 3000'));
const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

var options = {
  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-cert.pem').toString()
};
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);
