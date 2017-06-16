const protobufjs = require('protobufjs');
const adapter = require('./action.js');
const SUBSCRIPTIONACTION_ADD = 0;
const SUBSCRIPTIONACTION_DELETE = 1;

const addAction = {
  action: SUBSCRIPTIONACTION_ADD,
};
const deleteAction = {
  action: SUBSCRIPTIONACTION_DELETE,
};

describe('standalone/proto', () => {
  let protoMock = {};
  let buffer;
  const builder = protobufjs.loadSync(__dirname+'/Action.proto');  
  const lookedUp = builder.lookup('dataControllerUtils.protobuf.Action');
  protoMock.encode = (raw) => {
    return lookedUp.encode(adapter.encode(raw)).finish();
  }
  protoMock.decode = (buf) => {
    return adapter.decode(lookedUp.decode(buf));
  }
  
  test('encode', () => {
    buffer = protoMock.encode(addAction);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(protoMock.decode(buffer)).toMatchObject(addAction);
  });
});
