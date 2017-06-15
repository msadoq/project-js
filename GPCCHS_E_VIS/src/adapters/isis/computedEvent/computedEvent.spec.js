// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
require('../../../utils/test');
const stubData = require('../stubs');

const protobuf = require('../../../protobuf');

const { decodeRaw } = require('../types');

const eventClass = require('./eventClass');

describe('protobuf/isis/computedEvent/ComputedEvent', () => {
  const fixture = stubData.getComputedEvent();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('isis.computedEvent.ComputedEvent', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('isis.computedEvent.ComputedEvent', buffer);
    json.should.be.an('object').that.have.properties({
      eventDate: { type: 'time', value: fixture.eventDate },
      eventClass: { type: 'enum', value: fixture.eventClass, symbol: eventClass[fixture.eventClass] },
      systemDate: { type: 'time', value: fixture.systemDate },
      mission: { type: 'string', value: fixture.mission },
      origin: { type: 'string', value: fixture.origin },
      satellite: { type: 'ulong', symbol: `${fixture.satellite}` },
    });
    decodeRaw(json.producer).should.be.an('object').that.have.properties({
      slotID: { type: 'ushort', value: fixture.producer.slotID },
      factoryID: { type: 'ushort', value: fixture.producer.factoryID },
      providerName: { type: 'string', value: fixture.producer.providerName },
      network: { type: 'uoctet', value: fixture.producer.network },
      session: { type: 'ulong', symbol: `${fixture.producer.session}` },
      serviceProperties: { type: 'uinteger', value: fixture.producer.serviceProperties },
      providerProperties: { type: 'string', value: fixture.producer.providerProperties },
      providerTime: { type: 'time', value: fixture.producer.providerTime },
    });
    
    json.specificAttributes.should.be.an('array').that.have.lengthOf(fixture.specificAttributes.length);
    for (let i = 0; i < fixture.specificAttributes.length; i += 1) {
      json.specificAttributes[i].should.be.an('object').that.have.properties({
        name: { type: 'identifier', value: fixture.specificAttributes[i].name },
        value: { type: 'double', symbol: fixture.specificAttributes[i].value.toString() },
      });
      
    }
  });
});

