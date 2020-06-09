const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, 'public'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

let messages = [];

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);
    //console.log('a user connected');

    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
});

http.listen(3000, () => {
    console.log('Listening on *:3000');
});