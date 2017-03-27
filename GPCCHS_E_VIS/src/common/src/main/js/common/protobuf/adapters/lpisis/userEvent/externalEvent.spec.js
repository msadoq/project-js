// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');


describe('protobuf/lpisis/userEvent/ExternalEvent', () => {
  const fixture = stubData.getExternalEvent();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.userEvent.ExternalEvent', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.userEvent.ExternalEvent', buffer);
    json.should.be.an('object').that.have.properties({
      eventDate: { type: 'time', value: fixture.eventDate },
      systemDate: { type: 'time', value: fixture.systemDate },
      mission: { type: 'string', value: fixture.mission },
      satellite: { type: 'ulong', symbol: `${fixture.satellite}` },
      producer: {
        slotID: { type: 'ushort', value: fixture.producer.slotID },
        factoryID: { type: 'ushort', value: fixture.producer.factoryID },
        providerName: { type: 'string', value: fixture.producer.providerName },
        network: { type: 'uoctet', value: fixture.producer.network },
        session: { type: 'ulong', symbol: `${fixture.producer.session}` },
        serviceProperties: { type: 'uinteger', value: fixture.producer.serviceProperties },
        serviceAddress: {
          supportedCapabilities: { type: 'uinteger', value: fixture.producer.serviceAddress.supportedCapabilities },
          supportedLevels: { type: 'uinteger', value: fixture.producer.serviceAddress.supportedLevels },
          qoSproperties: { type: 'uinteger', value: fixture.producer.serviceAddress.qoSproperties },
          priorityLevels: { type: 'uinteger', value: fixture.producer.serviceAddress.priorityLevels },
          serviceURI: { type: 'uri', value: fixture.producer.serviceAddress.serviceURI },
          dataURI: { type: 'uri', value: fixture.producer.serviceAddress.dataURI },
          dataName: { type: 'string', value: fixture.producer.serviceAddress.dataName },
        },
        providerProperties: { type: 'string', value: fixture.producer.providerProperties },
        providerTime: { type: 'time', value: fixture.producer.providerTime },
      },
    });
    json.specificAttributes.should.be.an('array').that.have.lengthOf(fixture.specificAttributes.length);
    for (let i = 0; i < fixture.specificAttributes.length; i += 1) {
      json.specificAttributes[i].should.be.an('object').that.have.properties({
        name: { type: 'identifier', value: fixture.specificAttributes[i].name },
        value: { type: 'double', value: fixture.specificAttributes[i].value },
      });
    }
  });
});

