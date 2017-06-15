// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
require('../../../utils/test');
const stubData = require('../stubs');

const protobuf = require('../../../protobuf');

const { decodeRaw } = require('../types');

const generationMode = require('./generationMode');
const packetType = require('./packetType');
const validityState = require('../ccsds_mc/validityState');

describe('protobuf/isis/ccsds_mc_aggregation/IsisAggregation', () => {
  const fixture = stubData.getIsisAggregation();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('isis.ccsds_mc_aggregation.IsisAggregation', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('isis.ccsds_mc_aggregation.IsisAggregation', buffer);
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

