var zmq = require('zmq')
  , sock = zmq.socket('pull');
var cacheApi = require('./binCacheApi');
var dataTypesCtrl = require('../../dataTypesControler');
const request = require('request');


sock.connect('tcp://127.0.0.1:3000');
console.log('Worker connected to port 3000');


sock.on('message', function(msg){
    cacheApi.addItem('1', msg);
    var jsonElem = dataTypesCtrl.binToJson('2', '1', msg);
    //request.post({url:'http://localhost:1337/api/jsonCache', form: {key:'value'}}, function(err,httpResponse,body){ /* ... */ })
    request.post({url:'http://localhost:1337/api/jsonCache', form: {id : 1, jsonElem}}, 
    function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    });
});