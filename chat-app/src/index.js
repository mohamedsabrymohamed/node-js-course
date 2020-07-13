const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


// listen for event on socket io
io.on('connection',(socket)=>{
    socket.emit('message',generateMessage('Welcome'))
    //send message to everyone except sender
    socket.broadcast.emit('message', generateMessage('new user joiend'))

        //emit update to single connection
        //socket.emit('countUpdated',count)
        //emit update to all connections
        //io.emit('countUpdated',count)
   

   socket.on('sendMessage',(message, callback)=>{
       const filter = new Filter()
       if(filter.isProfane(message)){
           return callback('Profanity is not allowed')
       }
        io.emit('message',generateMessage(message))
        callback()
   })

   //send message when user disconnect chat
   socket.on('disconnect',()=>{
       io.emit('message',generateMessage('user has left'))
   })

   //listen for send location
   socket.on('sendLocation',(coords,callback)=>{
    io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
    callback()
})
})

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})