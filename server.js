//
// # SimpleServer
//
// A simple server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var sockets = [];

io.on('connection', function (socket) {
    // messages.forEach(function (data) {
    //   socket.emit('message', data);
    // });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
    //   updateRoster();
    });

    socket.on('message', function (msg) {
      var text = String(msg || '');

      if (!text) return;

      socket.get('name', function (err, name) {
        var data = {
          name: name,
          text: text
        };

        broadcast('message', data);
        // messages.push(data);
      });
    });

    socket.on('startWithParameters', function(params) {
        console.log('herbivore count: ' + params.herbivoreCount);
        socket.emit('activity', getInitialPlacements(params));
    })

  });

function getInitialPlacements(params) {
  var initials = [];
  for(var i = 0; i < params.herbivoreCount; i++) {
    initials.push({
        x: Math.random() * params.ecosystem.width
      , y: Math.random() * params.ecosystem.height
    })
  }
  return initials;
}

function updateRoster() {
  async.map(
    sockets,
    function (socket, callback) {
      socket.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Life server listening at", addr.address + ":" + addr.port);
});
