// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./isisAggregation');
const { getIsisAggregation } = require('../stubs');

const generationMode = require('./generationMode');
const packetType = require('./packetType');
const validityState = require('../ccsds_mc/validityState');

describe('protobuf/isis/ccsds_mc_aggregation/IsisAggregation', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/IsisAggregation.proto`, { keepCase: true })
    .lookup('ccsds_mc_aggregation.protobuf.IsisAggregation');
  const fixture = getIsisAggregation();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      generationMode: { type: 'enum', value: fixture.generationMode, symbol: generationMode[fixture.generationMode] },
      filtered: { type: 'boolean', value: fixture.filtered },
      deltaTime: { type: 'duration', value: fixture.deltaTime },
      intervalTime: { type: 'duration', value: fixture.intervalTime },
      setIntervalTime: { type: 'duration', value: fixture.setIntervalTime },
      onboardDate: { type: 'time', value: fixture.onboardDate },
      groundDate: { type: 'time', value: fixture.groundDate },
      packetType: { type: 'enum', value: fixture.packetType, symbol: packetType[fixture.packetType] },
      apid: { type: 'ushort', value: fixture.apid },
      service: { type: 'uoctet', value: fixture.service },
      subService: { type: 'uoctet', value: fixture.subService },
      destinationId: { type: 'uoctet', value: fixture.destinationId },
    });
    
    json.values.should.be.an('array').that.have.lengthOf(fixture.values.length);
    for (let i = 0; i < fixture.values.length; i += 1) {
      json.values[i].should.be.an('object').that.have.properties({
        definition: {
          objectType: {
            area: { type: 'ushort', value: fixture.values[i].definition.objectType.area },
            service: { type: 'ushort', value: fixture.values[i].definition.objectType.service },
            version: { type: 'uoctet', value: fixture.values[i].definition.objectType.version },
            number: { type: 'ushort', value: fixture.values[i].definition.objectType.number },
          },
          objectKey: {
            domaineId: { type: 'ushort', value: fixture.values[i].definition.objectKey.domaineId },
            uid: { type: 'long', symbol: `${fixture.values[i].definition.objectKey.uid}` },
          },
        },
        extractedValue: { type: 'double', symbol: fixture.values[i].extractedValue.toString() },
        rawValue: { type: 'double', symbol: fixture.values[i].rawValue.toString() },
        convertedValue: { type: 'double', symbol: fixture.values[i].convertedValue.toString() },
        triggerCounter: { type: 'ushort', value: fixture.values[i].triggerCounter },
        monitoringState: { type: 'string', value: fixture.values[i].monitoringState },
        validityState: { type: 'enum', value: fixture.values[i].validityState, symbol: validityState[fixture.values[i].validityState] },
      });
      
    }
  });
});
