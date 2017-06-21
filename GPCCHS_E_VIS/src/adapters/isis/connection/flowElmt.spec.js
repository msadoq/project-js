// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./flowElmt');
const { getFlowElmt } = require('../stubs');



describe('protobuf/isis/connection/FlowElmt', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FlowElmt.proto`, { keepCase: true })
    .lookup('connection.protobuf.FlowElmt');
  const fixture = getFlowElmt();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      flowIdentifier: {
        flowID: { type: 'long', symbol: `${fixture.flowIdentifier.flowID}` },
        spacecraftID: { type: 'string', value: fixture.flowIdentifier.spacecraftID },
        stationID: { type: 'string', value: fixture.flowIdentifier.stationID },
        flowInfo: (typeof fixture.flowIdentifier.flowInfo === 'undefined')
          ? null
          : {
            name: { type: 'string', value: fixture.flowIdentifier.flowInfo.name },
            isDefault: { type: 'boolean', value: fixture.flowIdentifier.flowInfo.isDefault },
          },
      },
    });
    
    json.cUIdentifiers.should.be.an('array').that.have.lengthOf(fixture.cUIdentifiers.length);
    for (let i = 0; i < fixture.cUIdentifiers.length; i += 1) {
      json.cUIdentifiers[i].should.be.an('object').that.have.properties({
        cUID: { type: 'long', symbol: `${fixture.cUIdentifiers[i].cUID}` },
        channelName: { type: 'string', value: fixture.cUIdentifiers[i].channelName },
        spacecraftID: { type: 'string', value: fixture.cUIdentifiers[i].spacecraftID },
        stationID: { type: 'string', value: fixture.cUIdentifiers[i].stationID },
        flowID: { type: 'long', symbol: `${fixture.cUIdentifiers[i].flowID}` },
        cUInfo: (typeof fixture.cUIdentifiers[i].cUInfo === 'undefined')
          ? null
          : {
            isSLE: { type: 'boolean', value: fixture.cUIdentifiers[i].cUInfo.isSLE },
            reconnectionNumber: (typeof fixture.cUIdentifiers[i].cUInfo.reconnectionNumber === 'undefined')
              ? null
              : { type: 'integer', value: fixture.cUIdentifiers[i].cUInfo.reconnectionNumber },
            reconnectionDelay: (typeof fixture.cUIdentifiers[i].cUInfo.reconnectionDelay === 'undefined')
              ? null
              : { type: 'integer', value: fixture.cUIdentifiers[i].cUInfo.reconnectionDelay },
            name: { type: 'string', value: fixture.cUIdentifiers[i].cUInfo.name },
            sicFile: (typeof fixture.cUIdentifiers[i].cUInfo.sicFile === 'undefined')
              ? null
              : { type: 'string', value: fixture.cUIdentifiers[i].cUInfo.sicFile },
          },
      });
      
    }
    json.processIdentifiers.should.be.an('array').that.have.lengthOf(fixture.processIdentifiers.length);
    for (let i = 0; i < fixture.processIdentifiers.length; i += 1) {
      json.processIdentifiers[i].should.be.an('object').that.have.properties({
        processId: { type: 'long', symbol: `${fixture.processIdentifiers[i].processId}` },
        functionOId: { type: 'string', value: fixture.processIdentifiers[i].functionOId },
        processInfo: (typeof fixture.processIdentifiers[i].processInfo === 'undefined')
          ? null
          : {
            name: { type: 'string', value: fixture.processIdentifiers[i].processInfo.name },
          },
      });
      
    }
  });
});
