const ProtoBuf = require('protobufjs');
const adapter = require('./fMDGet');
const stub = require('./fMDGet.stub');


describe('protobuf/utils/dataControllerUtils/fMDGet', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FMDGet.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.FMDGet');
  const fixture = stub.getFMDGet();
  
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
