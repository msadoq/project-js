const ProtoBuf = require('protobufjs');
const adapter = require('./domains');
const stub = require('./domains.stub');


describe('protobuf/utils/dataControllerUtils/domains', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Domains.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.Domains');
  const fixture = stub.getDomains();
  
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
