const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public'))); // serve static files from public folder

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('locationUpdate', (data) => {
        console.log(`Location update: ${data.latitude}, ${data.longitude}`);
        // Emit to all connected clients
        io.emit('locationUpdate', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
