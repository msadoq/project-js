const ProtoBuf = require('protobufjs');
const adapter = require('./fMDFileInfo');
const stub = require('./fMDFileInfo.stub');


describe('protobuf/utils/dataControllerUtils/fMDFileInfo', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FMDFileInfo.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.FMDFileInfo');
  const fixture = stub.getFMDFileInfo();
  
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
