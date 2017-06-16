const stubData = require('./ackRequest.stub.js');
const protobufjs = require('protobufjs');
const adapter = require('./ackRequest.js');

describe('protobuf/isis/ackRequest/AckRequest', () => {
  let protoMock = {};
  let buffer;

  const builder = protobufjs.loadSync(__dirname+'/AckRequest.proto');  
  const lookedUp = builder.lookup('ackRequest.protobuf.AckRequest');

  protoMock.encode = (raw) => {
    return lookedUp.encode(adapter.encode(raw)).finish();
  }
  protoMock.decode = (buf) => {
    return adapter.decode(lookedUp.decode(buf));
  }

  test('encode', () => {
    console.log(stubData);
    buffer = protoMock.encode(stubData);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = protoMock.decode(buffer);
    expect(decoded).toHaveProperty('ackRequestDate.type','time');
    expect(decoded).toHaveProperty('ackRequestDate.value',stubData.ackRequestDate);
    expect(decoded).toHaveProperty('systemDate.type','time');
    expect(decoded).toHaveProperty('systemDate.value',stubData.systemDate);
    expect(decoded).toHaveProperty('ack.ackDate.type','time');
    expect(decoded).toHaveProperty('ack.ackDate.value',stubData.ack.ackDate);
    expect(decoded).toHaveProperty('comment.type','string');
    expect(decoded).toHaveProperty('comment.value',stubData.comment);
    
  });
});

