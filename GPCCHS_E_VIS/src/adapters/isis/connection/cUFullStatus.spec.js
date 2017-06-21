// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./cUFullStatus');
const { getCUFullStatus } = require('../stubs');

const cUState = require('./cUState');

describe('protobuf/isis/connection/CUFullStatus', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/CUFullStatus.proto`, { keepCase: true })
    .lookup('connection.protobuf.CUFullStatus');
  const fixture = getCUFullStatus();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      identifier: {
        cUID: { type: 'long', symbol: `${fixture.identifier.cUID}` },
        channelName: { type: 'string', value: fixture.identifier.channelName },
        spacecraftID: { type: 'string', value: fixture.identifier.spacecraftID },
        stationID: { type: 'string', value: fixture.identifier.stationID },
        flowID: { type: 'long', symbol: `${fixture.identifier.flowID}` },
        cUInfo: (typeof fixture.identifier.cUInfo === 'undefined')
          ? null
          : {
            isSLE: { type: 'boolean', value: fixture.identifier.cUInfo.isSLE },
            reconnectionNumber: (typeof fixture.identifier.cUInfo.reconnectionNumber === 'undefined')
              ? null
              : { type: 'integer', value: fixture.identifier.cUInfo.reconnectionNumber },
            reconnectionDelay: (typeof fixture.identifier.cUInfo.reconnectionDelay === 'undefined')
              ? null
              : { type: 'integer', value: fixture.identifier.cUInfo.reconnectionDelay },
            name: { type: 'string', value: fixture.identifier.cUInfo.name },
            sicFile: (typeof fixture.identifier.cUInfo.sicFile === 'undefined')
              ? null
              : { type: 'string', value: fixture.identifier.cUInfo.sicFile },
          },
      },
      status: {
        state: { type: 'enum', value: fixture.status.state, symbol: cUState[fixture.status.state] },
        sLEReport: (typeof fixture.status.sLEReport === 'undefined')
          ? null
          : { type: 'blob', value: fixture.status.sLEReport },
      },
    });
    
    
  });
});
