// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./flowSmallStatus');
const { getFlowSmallStatus } = require('../stubs');

const cUState = require('./cUState');
const processState = require('./processState');
const synthesisState = require('./synthesisState');

describe('protobuf/isis/connection/FlowSmallStatus', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FlowSmallStatus.proto`, { keepCase: true })
    .lookup('connection.protobuf.FlowSmallStatus');
  const fixture = getFlowSmallStatus();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      state: { type: 'enum', value: fixture.state, symbol: synthesisState[fixture.state] },
    });
    
    json.connectionStates.should.be.an('array').that.have.lengthOf(fixture.connectionStates.length);
    for (let i = 0; i < fixture.connectionStates.length; i += 1) {
      json.connectionStates[i].should.be.an('object').that.have.properties({
        identifier: {
          cUID: { type: 'long', symbol: `${fixture.connectionStates[i].identifier.cUID}` },
          channelName: { type: 'string', value: fixture.connectionStates[i].identifier.channelName },
          spacecraftID: { type: 'string', value: fixture.connectionStates[i].identifier.spacecraftID },
          stationID: { type: 'string', value: fixture.connectionStates[i].identifier.stationID },
          flowID: { type: 'long', symbol: `${fixture.connectionStates[i].identifier.flowID}` },
          cUInfo: (typeof fixture.connectionStates[i].identifier.cUInfo === 'undefined')
            ? null
            : {
              isSLE: { type: 'boolean', value: fixture.connectionStates[i].identifier.cUInfo.isSLE },
              reconnectionNumber: (typeof fixture.connectionStates[i].identifier.cUInfo.reconnectionNumber === 'undefined')
                ? null
                : { type: 'integer', value: fixture.connectionStates[i].identifier.cUInfo.reconnectionNumber },
              reconnectionDelay: (typeof fixture.connectionStates[i].identifier.cUInfo.reconnectionDelay === 'undefined')
                ? null
                : { type: 'integer', value: fixture.connectionStates[i].identifier.cUInfo.reconnectionDelay },
              name: { type: 'string', value: fixture.connectionStates[i].identifier.cUInfo.name },
              sicFile: (typeof fixture.connectionStates[i].identifier.cUInfo.sicFile === 'undefined')
                ? null
                : { type: 'string', value: fixture.connectionStates[i].identifier.cUInfo.sicFile },
            },
        },
        status: {
          state: { type: 'enum', value: fixture.connectionStates[i].status.state, symbol: cUState[fixture.connectionStates[i].status.state] },
          sLEReport: (typeof fixture.connectionStates[i].status.sLEReport === 'undefined')
            ? null
            : { type: 'blob', value: fixture.connectionStates[i].status.sLEReport },
        },
      });
      
    }
    json.processFullState.should.be.an('array').that.have.lengthOf(fixture.processFullState.length);
    for (let i = 0; i < fixture.processFullState.length; i += 1) {
      json.processFullState[i].should.be.an('object').that.have.properties({
        processState: { type: 'enum', value: fixture.processFullState[i].processState, symbol: processState[fixture.processFullState[i].processState] },
        processId: { type: 'long', symbol: `${fixture.processFullState[i].processId}` },
        functionOId: { type: 'string', value: fixture.processFullState[i].functionOId },
      });
      
    }
  });
});
