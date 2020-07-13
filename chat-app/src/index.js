const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


// listen for event on socket io
io.on('connection',(socket)=>{
  
    console.log('New WebSocket connection')
        //emit update to single connection
        //socket.emit('countUpdated',count)
        //emit update to all connections
        //io.emit('countUpdated',count)
   
  //listen for join
  socket.on('join',( options , callback) =>{
      //add user 
      const {error , user} = addUser({ id: socket.id, ...options})

      if(error) {
        return callback(error)
      }
    //join room
    socket.join(user.room)
    //send greeting message
    socket.emit('message',generateMessage(`Welcome`))
    //send message to everyone except current user
    //socket.broadcast.emit('message', generateMessage('new user joiend'))            
    //send message to everyone except current user in specific room
    socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined the room`))  
    

    io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
    })


    callback()          
})

//send message listener
   socket.on('sendMessage',(message, callback)=>{
       const user = getUser(socket.id)
       const filter = new Filter()
       if(filter.isProfane(message)){
           return callback('Profanity is not allowed')
       }
        io.to(user.room).emit('message',generateMessage(user.username,message))
        callback()
   })

   //send message when user disconnect chat
   socket.on('disconnect',()=>{
       const user = removeUser(socket.id)
       if(user){
           io.to(user.room).emit('message',generateMessage(`${user.username} has left`))
           
           
           io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
       }
   })

   //listen for send location
   socket.on('sendLocation',(coords,callback)=>{
       const user = getUser(socket.id)
    io.to(user.room).emit('locationMessage', generateLocationMessage(user.username,`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
    callback()
    })

          
})

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})