const express = require('express');
const mongoose = require('./config/db');
const sessionRoutes = require('./routes/sessions');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.use('/api', sessionRoutes);

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('timerUpdate', (data) => {
    io.emit('liveTimer', data); // Broadcast to all clients
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
