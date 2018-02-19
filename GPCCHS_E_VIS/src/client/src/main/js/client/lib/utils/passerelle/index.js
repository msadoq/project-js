// const zmq = require('zeromq');
import { realZmq } from 'common/zmq';
import { v4 } from 'uuid';
import parameters from '../../common/configurationManager';
import getLogger from '../../common/logManager';

const logger = getLogger('Passerelle');
const spawn = require('child_process').spawn;

const callbackMap = {};

let requester;
let subscriber;

const PYTHON_EXEC_PATH = (parameters.get('PYTHON_EXEC_PATH'));
const spawned = spawn(PYTHON_EXEC_PATH, [`${__dirname}/../../../scripts/gpvi_interfacelayer_server.py`]);

exports.spawnPasserelle = () => {
  spawned.on('error', (err) => {
    logger.error('Failed to start subprocess.');
    logger.error(err);
  });

  spawned.stdout.on('data', (data) => {
    logger.info(`stdout: ${data}`);
  });

  spawned.stderr.on('data', (data) => {
    logger.info(`stderr: ${data}`);
  });
};
// ------------------------------------------------------------------------------------------
// Create the 0MQ socket in order to establish the communication between client and server
// ------------------------------------------------------------------------------------------
exports.init = () => {
  const zmqPub = parameters.get('ZMQ_PASSERELLE_PUB');
  const zmqSub = parameters.get('ZMQ_PASSERELLE_SUB');

  subscriber = realZmq.socket('sub');
  subscriber.subscribe('');
  subscriber.connect(zmqSub);

  requester = realZmq.socket('pub');
  requester.bind(zmqPub);

  subscriber.on('message', (data) => {
    const message = data.toString();
    const header = decodeHeaderFromResponse(message);
    const payload = decodePayloadFromResponse(message);
    callbackMap[header.transactionID](payload);
    delete callbackMap[header.transactionID];
  });
};


// ------------------------------------------------------------------------------------------
// function caller
// ------------------------------------------------------------------------------------------
exports.caller = (method, parametersObject, callbackReponseMethod) => {
  // get a transaction ID
  const uid = v4();

  // store the callback in internal structure
  callbackMap[uid] = callbackReponseMethod;

  // Encode Header
  const header = encodeH(method, uid);

  // Encode Payload
  const payload = encodeP(parametersObject);

  // Encode message
  const message = encodeMessage(header, payload);

  // Make the call
  // console.log('Message send : '+ JSON.stringify(message));
  requester.send(JSON.stringify(message));
};

// ------------------------------------------------------------------------------------------
// function encodeH
// ------------------------------------------------------------------------------------------
function encodeH(method, uuid) {
  const header = { transactionID: 'uuid', method: 'methode' };
  header.transactionID = uuid;
  header.method = method;

  return header;
}

// ------------------------------------------------------------------------------------------
// function encodeP
// ------------------------------------------------------------------------------------------
function encodeP(param) {
  const body = param;

  return body;
}

// ------------------------------------------------------------------------------------------
// function encodeMessage
// ------------------------------------------------------------------------------------------
function encodeMessage(header, payload) {
  const message = { header: 'header', payload: 'body' };
  message.header = header;
  message.payload = payload;

  return message;
}


// ------------------------------------------------------------------------------------------
// function decodeHeaderFromResponse
// ------------------------------------------------------------------------------------------
function decodeHeaderFromResponse(response) {
  const res = JSON.parse(response);
  return res.header;
}

// ------------------------------------------------------------------------------------------
// function decodePayloadFromResponse
// ------------------------------------------------------------------------------------------
function decodePayloadFromResponse(response) {
  const res = JSON.parse(response);
  return res.payload;
}


// ------------------------------------------------------------------------------------------
// MAIN
// ------------------------------------------------------------------------------------------
process.once('SIGINT', () => {
  // close zmq sockets
  requester.close();
  subscriber.close();
  // kill the python process
  spawned.kill();
});

process.once('SIGTERM', () => {
  // close zmq sockets
  requester.close();
  subscriber.close();
  // kill the python process
  spawned.kill();
});
