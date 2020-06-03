let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
 
io.on('connection', (socket) => {
 
  socket.on('disconnect', function(){
    io.emit(socket.roomid, {msg: ' ... غادر الغرفة',user: socket.username, event: 'left' });  
   // io.emit('users-changed', {user: socket.username, event: 'left'});   
  });
 
  //set name and room
  socket.on('set-name', (data) => {
    socket.username = data.name;
    socket.roomid = data.room
    io.emit(data.room, {msg: ' ... انظم الى المحادثة',user: socket.username, event: 'joined' }); 
   // io.emit('users-changed', {user: socket.name, event: 'joined'});    
  });

  //send the masg with the room id 
  socket.on('chat', (message) => {
    if (message.typping == true) {
      io.emit(message.id, {msg: message.text, user: socket.username,typping:true});   
    } else if(message.img == true)  {
      io.emit(message.id, {msg: message.text, user: socket.username,img: true});   
    } else {
      io.emit(message.id, {msg: message.text, user: socket.username, createdAt: new Date()});   
    }
  });


 


});
 
var port = process.env.PORT || 3001;
 
server.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});
