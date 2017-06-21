// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./stationStatus');
const { getStationStatus } = require('../stubs');

const cUState = require('./cUState');
const processState = require('./processState');
const synthesisState = require('./synthesisState');

describe('protobuf/isis/connection/StationStatus', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StationStatus.proto`, { keepCase: true })
    .lookup('connection.protobuf.StationStatus');
  const fixture = getStationStatus();
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
    
    json.flowStates.should.be.an('array').that.have.lengthOf(fixture.flowStates.length);
    for (let i = 0; i < fixture.flowStates.length; i += 1) {
      json.flowStates[i].should.be.an('object').that.have.properties({
        status: {
          status: {
            state: { type: 'enum', value: fixture.flowStates[i].status.status.state, symbol: synthesisState[fixture.flowStates[i].status.status.state] },
          },
        },
        identifier: {
          flowID: { type: 'long', symbol: `${fixture.flowStates[i].identifier.flowID}` },
          spacecraftID: { type: 'string', value: fixture.flowStates[i].identifier.spacecraftID },
          stationID: { type: 'string', value: fixture.flowStates[i].identifier.stationID },
          flowInfo: (typeof fixture.flowStates[i].identifier.flowInfo === 'undefined')
            ? null
            : {
              name: { type: 'string', value: fixture.flowStates[i].identifier.flowInfo.name },
              isDefault: { type: 'boolean', value: fixture.flowStates[i].identifier.flowInfo.isDefault },
            },
        },
      });
      
    }
  });
});
