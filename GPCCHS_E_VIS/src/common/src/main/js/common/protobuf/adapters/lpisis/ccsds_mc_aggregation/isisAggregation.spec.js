// Generated file
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');

const generationMode = require('./generationMode');
const packetType = require('./packetType');
const validityState = require('../ccsds_mc/validityState');

describe('protobuf/lpisis/ccsds_mc_aggregation/IsisAggregation', () => {
  const fixture = stubData.getIsisAggregation();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.ccsds_mc_aggregation.IsisAggregation', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.ccsds_mc_aggregation.IsisAggregation', buffer);
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
            uid: { type: 'long', value: fixture.values[i].definition.objectKey.uid },
          },
        },
        extractedValue: { type: 'double', value: fixture.values[i].extractedValue },
        rawValue: { type: 'double', value: fixture.values[i].rawValue },
        convertedValue: { type: 'double', value: fixture.values[i].convertedValue },
        triggerCounter: { type: 'ushort', value: fixture.values[i].triggerCounter },
        monitoringState: { type: 'string', value: fixture.values[i].monitoringState },
        validityState: { type: 'enum', value: fixture.values[i].validityState, symbol: validityState[fixture.values[i].validityState] },
      });
      
    }
  });
});

