// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./flowList');
const { getFlowList } = require('../stubs');



describe('protobuf/isis/connection/FlowList', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FlowList.proto`, { keepCase: true })
    .lookup('connection.protobuf.FlowList');
  const fixture = getFlowList();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      
    });
    
    json.flowElmts.should.be.an('array').that.have.lengthOf(fixture.flowElmts.length);
    for (let i = 0; i < fixture.flowElmts.length; i += 1) {
      json.flowElmts[i].should.be.an('object').that.have.properties({
        flowIdentifier: {
          flowID: { type: 'long', symbol: `${fixture.flowElmts[i].flowIdentifier.flowID}` },
          spacecraftID: { type: 'string', value: fixture.flowElmts[i].flowIdentifier.spacecraftID },
          stationID: { type: 'string', value: fixture.flowElmts[i].flowIdentifier.stationID },
          flowInfo: (typeof fixture.flowElmts[i].flowIdentifier.flowInfo === 'undefined')
            ? null
            : {
              name: { type: 'string', value: fixture.flowElmts[i].flowIdentifier.flowInfo.name },
              isDefault: { type: 'boolean', value: fixture.flowElmts[i].flowIdentifier.flowInfo.isDefault },
            },
        },
      });
      json.flowElmts[i].cUIdentifiers.should.be.an('array').that.have.lengthOf(fixture.flowElmts[i].cUIdentifiers.length);
      for (let ii = 0; ii < fixture.flowElmts[i].cUIdentifiers.length; ii += 1) {
        json.flowElmts[i].cUIdentifiers[ii].should.be.an('object').that.have.properties({
          cUID: { type: 'long', symbol: `${fixture.flowElmts[i].cUIdentifiers[ii].cUID}` },
          channelName: { type: 'string', value: fixture.flowElmts[i].cUIdentifiers[ii].channelName },
          spacecraftID: { type: 'string', value: fixture.flowElmts[i].cUIdentifiers[ii].spacecraftID },
          stationID: { type: 'string', value: fixture.flowElmts[i].cUIdentifiers[ii].stationID },
          flowID: { type: 'long', symbol: `${fixture.flowElmts[i].cUIdentifiers[ii].flowID}` },
          cUInfo: (typeof fixture.flowElmts[i].cUIdentifiers[ii].cUInfo === 'undefined')
            ? null
            : {
              isSLE: { type: 'boolean', value: fixture.flowElmts[i].cUIdentifiers[ii].cUInfo.isSLE },
              reconnectionNumber: (typeof fixture.flowElmts[i].cUIdentifiers[ii].cUInfo.reconnectionNumber === 'undefined')
                ? null
                : { type: 'integer', value: fixture.flowElmts[i].cUIdentifiers[ii].cUInfo.reconnectionNumber },
              reconnectionDelay: (typeof fixture.flowElmts[i].cUIdentifiers[ii].cUInfo.reconnectionDelay === 'undefined')
                ? null
                : { type: 'integer', value: fixture.flowElmts[i].cUIdentifiers[ii].cUInfo.reconnectionDelay },
              name: { type: 'string', value: fixture.flowElmts[i].cUIdentifiers[ii].cUInfo.name },
              sicFile: (typeof fixture.flowElmts[i].cUIdentifiers[ii].cUInfo.sicFile === 'undefined')
                ? null
                : { type: 'string', value: fixture.flowElmts[i].cUIdentifiers[ii].cUInfo.sicFile },
            },
        });
        
      }
      json.flowElmts[i].processIdentifiers.should.be.an('array').that.have.lengthOf(fixture.flowElmts[i].processIdentifiers.length);
      for (let ii = 0; ii < fixture.flowElmts[i].processIdentifiers.length; ii += 1) {
        json.flowElmts[i].processIdentifiers[ii].should.be.an('object').that.have.properties({
          processId: { type: 'long', symbol: `${fixture.flowElmts[i].processIdentifiers[ii].processId}` },
          functionOId: { type: 'string', value: fixture.flowElmts[i].processIdentifiers[ii].functionOId },
          processInfo: (typeof fixture.flowElmts[i].processIdentifiers[ii].processInfo === 'undefined')
            ? null
            : {
              name: { type: 'string', value: fixture.flowElmts[i].processIdentifiers[ii].processInfo.name },
            },
        });
        
      }
    }
  });
});
