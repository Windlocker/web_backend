var express = require('express');
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sessionstore = require('sessionstore');
var cookie = require('cookie');
var path = require('path');
var bodyParser = require('body-parser');
var randomstring = require('randomstring');
var app = express();
var debug = require('debug')('dicon:server');
var rndString = require("randomstring");
var fs = require('fs');
var router = express.Router();
var async = require('async');
var CORS = require('cors')();
var device = require('express-device');

require('./func');
//module setting
var db = require('./mongo');
var passport = require('./passport')(db.Users);

var port = process.env.PORT || 3003;
var store = sessionstore.createSessionStore();

//set engin
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(CORS);
app.use( session( { store: store, secret: '쿠키먹고싶어요', saveUninitialized: true}));
app.use(device.capture());

//create server
var server = app.listen(port);
app.on('error', onError);
app.on('listening', onListening);

var io = require('socket.io')(server);

io.on('connection', function(socket){
  socket.on('message', function(msg){
    io.emit('message', msg);
  });

  socket.on('test', function(msg){
    io.emit('test', msg);
  });
});

//router setting
var index = require('./routes/index')(express.Router(), device);
var menu = require('./routes/menu')(express.Router());
var users = require('./routes/users')(express.Router(), db.Users, passport);
var auth = require('./routes/auth')(express.Router(), db.Users, passport, rndString);
var lock = require('./routes/lock')(express.Router(), db.Users);
var file = require('./routes/file')(express.Router(), db.Users);
var system = require('./routes/system')(express.Router(), db.Users, io);

//router setting
app.use('/', index);
app.use('/menu', menu);
app.use('/users', users);
app.use('/auth', auth);
app.use('/lock', lock);
app.use('/file', file);
app.use('/system', system);

//error handle
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0)  return port;
  return false;
}

function onError(error) {
  if (error.syscall !== 'listen')
    throw error;


    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  console.log(addr);

  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = app;
