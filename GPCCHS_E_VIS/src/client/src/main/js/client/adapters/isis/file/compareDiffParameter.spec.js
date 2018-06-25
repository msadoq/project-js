// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./compareDiffParameter');
const stub = require('./compareDiffParameter.stub')();



describe('protobuf/isis/file/CompareDiffParameter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/CompareDiffParameter.proto`, { keepCase: true })
    .lookup('file.protobuf.CompareDiffParameter');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      propertyName: { type: 'string', value: stub.propertyName },
      leftPropertyValue: { type: 'string', value: stub.leftPropertyValue },
      rigthPropertyValue: { type: 'string', value: stub.rigthPropertyValue },
    });
    
  });
});
