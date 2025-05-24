const express = require('express');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());

let messages = [];

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send all messages on new connection
  socket.emit('loadMessages', messages);

  // Handle new message
  socket.on('message', (msg) => {
    msg.id = uuidv4();
    messages.push(msg);
    io.emit('message', msg);
  });

  // Handle delete message
  socket.on('deleteMessage', (id) => {
    messages = messages.filter(msg => msg.id !== id);
    io.emit('messageDeleted', id);
  });

  socket.on('typing', (user) => {
    socket.broadcast.emit('typing', user);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');
// const { v4: uuidv4 } = require('uuid'); // to generate unique IDs, install `uuid`

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: '*',
//         methods: ['GET', 'POST']
//     }
// });

// app.use(cors());

// // Store messages with unique id
// let messages = []; 

// // REST route to get messages
// app.get('/api/messages', (req, res) => {
//     res.json(messages);
// });

// io.on('connection', (socket) => {
//     console.log('New client connected');

//     socket.emit('loadMessages', messages);

//     socket.on('message', (message) => {
//         // Assign unique id to message
//         message.id = uuidv4();
//         messages.push(message);
//         io.emit('message', message);
//     });

//     socket.on('deleteMessage', (messageId) => {
//         messages = messages.filter(msg => msg.id !== messageId);
//         io.emit('messageDeleted', messageId);
//     });

//     socket.on('typing', (user) => {
//         socket.broadcast.emit('typing', user);
//     });

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

// const PORT = process.env.PORT || 4000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
