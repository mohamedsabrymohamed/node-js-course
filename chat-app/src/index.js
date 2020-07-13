const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0

// listen for event on socket io
io.on('connection',(socket)=>{
    socket.emit('message','Welcome')
    //send message to everyone except sender
    socket.broadcast.emit('message', 'new user joiend')

        //emit update to single connection
        //socket.emit('countUpdated',count)
        //emit update to all connections
        //io.emit('countUpdated',count)
   

   socket.on('sendMessage',(message)=>{
    io.emit('message',message)
   })

   //send message when user disconnect chat
   socket.on('disconnect',()=>{
       io.emit('message','user has left')
   })

   //listen for send location
   socket.on('sendLocation',(coords)=>{
    io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
})
})

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})