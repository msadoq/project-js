// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./flowFullStatus');
const { getFlowFullStatus } = require('../stubs');

const cUState = require('./cUState');
const processState = require('./processState');
const synthesisState = require('./synthesisState');

describe('protobuf/isis/connection/FlowFullStatus', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FlowFullStatus.proto`, { keepCase: true })
    .lookup('connection.protobuf.FlowFullStatus');
  const fixture = getFlowFullStatus();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      status: {
        status: {
          state: { type: 'enum', value: fixture.status.status.state, symbol: synthesisState[fixture.status.status.state] },
        },
      },
      identifier: {
        flowID: { type: 'long', symbol: `${fixture.identifier.flowID}` },
        spacecraftID: { type: 'string', value: fixture.identifier.spacecraftID },
        stationID: { type: 'string', value: fixture.identifier.stationID },
        flowInfo: (typeof fixture.identifier.flowInfo === 'undefined')
          ? null
          : {
            name: { type: 'string', value: fixture.identifier.flowInfo.name },
            isDefault: { type: 'boolean', value: fixture.identifier.flowInfo.isDefault },
          },
      },
    });
    
    
  });
});
