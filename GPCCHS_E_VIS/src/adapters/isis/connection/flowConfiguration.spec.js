// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./flowConfiguration');
const stub = require('./flowConfiguration.stub')();



describe('protobuf/isis/connection/FlowConfiguration', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FlowConfiguration.proto`, { keepCase: true })
    .lookup('connection.protobuf.FlowConfiguration');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      reconnectionDelay: (typeof stub.reconnectionDelay === 'undefined')
        ? null
        : { type: 'integer', value: stub.reconnectionDelay },
      reconnectionNumber: (typeof stub.reconnectionNumber === 'undefined')
        ? null
        : { type: 'integer', value: stub.reconnectionNumber },
    });
    expect(decoded.configurationFiles).toHaveLength(stub.configurationFiles.length);
    for (let i = 0; i < stub.configurationFiles.length; i += 1) {
      expect(decoded.configurationFiles[i]).toMatchObject({
        type: 'uri',
        value: stub.configurationFiles[i],
      });
    }
  });
});
