var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var count = 0;
app.get('/', function(req, res) {
    res.render('index', {count: count});
})

var server = app.listen(8000, function(){
    console.log('listening on port 8000');
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    console.log('Socket connection made');
    console.log('Client socket ID: ', socket.id);
    socket.on('button_pressed', function(data) {
        count++;
        console.log(count);
        socket.emit('count_incremented', {count: count});
    })
    socket.on('reset_pressed', function(data) {
        count = 0;
        console.log(count);
        socket.emit('count_incremented', {count: count});
    })
})
