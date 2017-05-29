var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname + '/'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(data){
    data.timestamp = (new Date()).toLocaleString("en-US", {weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"});
    console.log('time: ' + data.timestamp + '\t username: ' + data.username + '\t message: ' + data.message);
    io.emit('chat message', data);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
