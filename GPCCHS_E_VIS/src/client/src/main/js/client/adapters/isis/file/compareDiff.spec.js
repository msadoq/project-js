// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./compareDiff');
const stub = require('./compareDiff.stub')();



describe('protobuf/isis/file/CompareDiff', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/CompareDiff.proto`, { keepCase: true })
    .lookup('file.protobuf.CompareDiff');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      fileDifference: { type: 'boolean', value: stub.fileDifference },
    });
    expect(decoded.documentProperties).toHaveLength(stub.documentProperties.length);
    for (let i = 0; i < stub.documentProperties.length; i += 1) {
      expect(decoded.documentProperties[i]).toMatchObject({
        propertyName: { type: 'string', value: stub.documentProperties[i].propertyName },
        leftPropertyValue: { type: 'string', value: stub.documentProperties[i].leftPropertyValue },
        rigthPropertyValue: { type: 'string', value: stub.documentProperties[i].rigthPropertyValue },
      });
      
    }
    expect(decoded.versionProperties).toHaveLength(stub.versionProperties.length);
    for (let i = 0; i < stub.versionProperties.length; i += 1) {
      expect(decoded.versionProperties[i]).toMatchObject({
        propertyName: { type: 'string', value: stub.versionProperties[i].propertyName },
        leftPropertyValue: { type: 'string', value: stub.versionProperties[i].leftPropertyValue },
        rigthPropertyValue: { type: 'string', value: stub.versionProperties[i].rigthPropertyValue },
      });
      
    }
  });
});
