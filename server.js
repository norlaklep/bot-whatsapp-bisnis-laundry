const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { exec } = require('child_process');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('Client connected');

    // Run the node script and send the output to the client
    const child = exec('node index.js');
    child.stdout.on('data', (data) => {
        socket.emit('terminalOutput', data);
    });

    child.stderr.on('data', (data) => {
        socket.emit('terminalOutput', data);
    });

    child.on('close', (code) => {
        socket.emit('terminalOutput', `Process exited with code ${code}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});
