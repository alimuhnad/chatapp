let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
 
io.on('connection', (socket) => {
 
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.username, event: 'left'});   
  });
 
  //set name and room
  socket.on('set-name', (data) => {
    socket.username = data.name;
    io.to(socket.room).emit('users-changed', {user: data.name, event: 'joined'});    
  });

  //send the masg with the room id 
  socket.on('chat', (message) => {
    io.emit(message.id, {msg: message.text, user: socket.username, createdAt: new Date()});   
  });
  
});
 
var port = process.env.PORT || 3001;
 
server.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});