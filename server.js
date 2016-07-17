var express = require('express');
var app = express();
var port = 3000;

app.use('/css', express.static('html/css/'));
app.use('/js', express.static('html/js/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/html/index.html');
});

var io = require('socket.io').listen(app.listen(port, function () {
  console.log('irc listening on port ' + port);
}));

io.sockets.on('connection', function (socket) {
  socket.on('join', function (data) {
    if (data.username) {
      console.log(data.username + ' has just joined the server');
      var message = 'Please welcome ' + data.username + ' to the chat!'
      io.sockets.emit('message', { username: 'Server', message: message } );
    } else {
      console.log("Error with new client!");
      console.log("Username: " + data.username);
    }
  });
  socket.on('send', function (data) {
    if (data.username && data.message) {
      console.log(data.username + ': ' + data.message);
      io.sockets.emit('message', data);
    } else {
      console.log("Error with chat data!");
      console.log("Username: " + data.username);
      console.log(" Message: " + data.message);
    }
  });
});
