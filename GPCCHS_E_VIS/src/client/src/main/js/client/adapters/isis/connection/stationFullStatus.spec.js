// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./stationFullStatus');
const stub = require('./stationFullStatus.stub')();

const cUState = require('./cUState');
const processState = require('./processState');
const synthesisState = require('./synthesisState');

describe('protobuf/isis/connection/StationFullStatus', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StationFullStatus.proto`, { keepCase: true })
    .lookup('connection.protobuf.StationFullStatus');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      identifier: {
        spacecraftID: { type: 'string', value: stub.identifier.spacecraftID },
        stationID: { type: 'string', value: stub.identifier.stationID },
      },
      status: {
        state: { type: 'enum', value: stub.status.state, symbol: synthesisState[stub.status.state] },
      },
    });
    
  });
});
