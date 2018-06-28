const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use (express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user is connected');

  socket.emit('newMessage', {
    from: 'mike@example.com',
    text: 'Hey how ?',
    createdAt: 123
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage: ', message);
  });

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  });
});


server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
