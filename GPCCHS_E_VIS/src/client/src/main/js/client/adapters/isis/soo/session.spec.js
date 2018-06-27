// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./session');
const stub = require('./session.stub')();

const activityRequest = require('./activityRequest');
const modeType = require('./modeType');

describe('protobuf/isis/soo/Session', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Session.proto`, { keepCase: true })
    .lookup('soo.protobuf.Session');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      mode: { type: 'enum', value: stub.mode, symbol: modeType[stub.mode] },
      name: { type: 'string', value: stub.name },
      activity: { type: 'enum', value: stub.activity, symbol: activityRequest[stub.activity] },
      creationDate: { type: 'time', value: stub.creationDate },
    });
    expect(decoded.functionalChains).toHaveLength(stub.functionalChains.length);
    for (let i = 0; i < stub.functionalChains.length; i += 1) {
      expect(decoded.functionalChains[i]).toMatchObject({
        name: { type: 'string', value: stub.functionalChains[i].name },
        activity: { type: 'enum', value: stub.functionalChains[i].activity, symbol: activityRequest[stub.functionalChains[i].activity] },
        creationDate: { type: 'time', value: stub.functionalChains[i].creationDate },
      });
      
    }
  });
});
