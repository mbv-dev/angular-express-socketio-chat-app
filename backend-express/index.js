const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
    console.log(`Express running on port ${PORT}`)
})

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('User joined');
    })
    socket.on('message', (data) => {
        console.log(data)
        socket.broadcast.emit('new message', data)
    })
})