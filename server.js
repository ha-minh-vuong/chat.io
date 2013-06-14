/**
 * server.js
 * chat.io
 *
 * Copyright (c) 2013 Vuong. All rights reserved.
 *
 */


var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public/'));
server.listen(8000);

io.sockets.on('connection', function(socket){
  console.log('Client connected: ' + socket);
  socket.on('message', function(data){
    console.log(data);
    socket.broadcast.emit('message', data);
  });
});

app.get('/', function(req, res){
  res.render('index.jade');
});

