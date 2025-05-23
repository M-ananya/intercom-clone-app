const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors());

let messages = []; // Array to store messages

app.get('/api/messages', (req, res) => {
    res.json(messages); // Send the stored messages as a response
});

io.on('connection', (socket) => {
    console.log('New client connected');

    // Send existing messages to the newly connected client
    socket.emit('loadMessages', messages);

    socket.on('message', (message) => {
        message.id = uuidv4();
        messages.push(message); // Store the message
        io.emit('message', message); // Broadcast the message to all clients
    });
    
    socket.on('deleteMessage', (messageId) => {
        console.log('Delete message requested:', messageId);
        if (!messageId) return;
        messages = messages.filter(msg => msg.id !== messageId);
        io.emit('messageDeleted', messageId);
    });

    socket.on('typing', (user) => {
        socket.broadcast.emit('typing', user);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
