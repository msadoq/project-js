const ProtoBuf = require('protobufjs');
const adapter = require('./dataId');
const stub = require('./dataId.stub');

describe('protobuf/utils/dataControllerUtils/dataId', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/DataId.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.DataId');
  const fixture = stub.getDataId();

  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  it('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
