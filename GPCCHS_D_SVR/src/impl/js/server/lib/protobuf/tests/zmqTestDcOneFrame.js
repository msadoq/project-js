const protoBuf = require('protobufjs');
const zmq = require('zmq');
const { join } = require('path');

const socketPull = zmq.socket('pull');

const { ReportingParameter } = require('../../dataTypeManager/protoFile/reportingParameter.proto');

const builder = protoBuf.newBuilder();
const buildProtobuf = (...protofiles) => {
  protofiles.map(file => protoBuf.loadProtoFile({
    root: join(__dirname, '../proto/dc'),
    file,
  }, builder));
}
buildProtobuf('dataControllerUtils/NewDataMessage.proto');
const { NewDataMessage } = builder.build('dataControllerUtils').protobuf;

console.log('CONNECT socketIn');

const socketConnect = socketPull.bind('tcp://127.0.0.1:49165');
socketConnect.on('message', (header, msg) => {
  // MSG[0] IS MESSAGE HEADER, IGNORE IT.
  console.log(msg);

  // MSG[0] is now the DataId header, decode it.
  const newData = NewDataMessage.decode(msg);
  console.log(newData.dataId);
  newData.payloads.forEach(p => {
    const param = ReportingParameter.decode(p.payload);
    const timestamp = p.timestamp;
    console.log(param); // deserialized param occurence
    console.log(timestamp); // Long
  });
});

// function sendMessage(header, payload) {
//   socketOut.send([header, payload]);
// }
