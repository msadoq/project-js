'use strict';

const electron = require('electron');
const app = electron.app;
app.commandLine.appendSwitch('no-proxy-server');
const BrowserWindow = electron.BrowserWindow;

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const dataCacheRoutes = require('./routes/dataCacheRoute');
const zmqProviderRoutes = require('./routes/zmqProviderRoute');
const timeLinesRoutes = require('./routes/timeLinesRoute');
const subscriptionsRoutes = require('./routes/subscriptionsRoute');
const dataTypesControlerRoutes = require('./routes/dataTypesControlerRoute');
const expressApp = express();
const debug = require('debug')('express-test:server');
const http = require('http');
const port = normalizePort(process.env.PORT || '1337');
const fs = require('fs');
var dataCache = require('./vima_mwr/dataCache')
var timelineMgr = require('./vima_mwr/timeLineManager')

var server;


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('Listening on ' + addr.port)
  //HVWindow.loadURL('http://127.0.0.1:'+ addr.port+'/historyView');
  chartWindow.loadURL('http://127.0.0.1:'+ addr.port +'/chart');
  chartWindow2.loadURL('http://127.0.0.1:'+ addr.port +'/chart2');
  parameterWindow.loadURL('http://127.0.0.1:'+ addr.port +'/parameters');
  //chartWindow.toggleDevTools();
}

var HVWindow = null;
var chartWindow = null;
var chartWindow2 = null;
var parameterWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  HVWindow = new BrowserWindow({
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: false
    },
  	width: 640,
  	height: 400
  });

  chartWindow = new BrowserWindow({
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: false
    },
  	width: 640,
  	height: 400
  });

  chartWindow2 = new BrowserWindow({
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: false
    },
  	width: 640,
  	height: 400
  });

  parameterWindow = new BrowserWindow({
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: false
    },
  	width: 640,
  	height: 400
  });
  
  server = http.createServer(expressApp);
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
  
  var io = require('socket.io')(server);
  dataCache.setWebSocket(io);
  //timelineMgr(io);
  
  // view engine setup
  expressApp.set('views', path.join(__dirname, 'views'));
  expressApp.set('view engine', 'pug');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  
  expressApp.use(function(req, res, next){
    res.io = io;
    next();
  });
  
  expressApp.use(logger('dev'));
  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({ extended: false }));
  expressApp.use(cookieParser());
  expressApp.use(express.static(path.join(__dirname, 'public')));
  expressApp.use('/', routes);
  expressApp.use('/api', dataCacheRoutes);
  expressApp.use('/api', timeLinesRoutes);
  expressApp.use('/api', subscriptionsRoutes);
  expressApp.use('/test', zmqProviderRoutes);
  expressApp.use('/api', dataTypesControlerRoutes);
  expressApp.set('port', port);

  expressApp.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // development error handler
  // will print stacktrace
  if (expressApp.get('env') === 'development') {
    expressApp.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  expressApp.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  HVWindow.on('closed', function() {
    HVWindow = null;
    chartWindow = null;
    parametertWindow = null;
    server.close();
  });
});

