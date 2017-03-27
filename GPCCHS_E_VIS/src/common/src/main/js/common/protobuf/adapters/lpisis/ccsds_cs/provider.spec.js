// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');


describe('protobuf/lpisis/ccsds_cs/Provider', () => {
  const fixture = stubData.getProvider();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.ccsds_cs.Provider', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.ccsds_cs.Provider', buffer);
    json.should.be.an('object').that.have.properties({
      slotID: { type: 'ushort', value: fixture.slotID },
      factoryID: { type: 'ushort', value: fixture.factoryID },
      providerName: { type: 'string', value: fixture.providerName },
      network: { type: 'uoctet', value: fixture.network },
      session: { type: 'ulong', symbol: `${fixture.session}` },
      serviceProperties: { type: 'uinteger', value: fixture.serviceProperties },
      serviceAddress: {
        supportedCapabilities: { type: 'uinteger', value: fixture.serviceAddress.supportedCapabilities },
        supportedLevels: { type: 'uinteger', value: fixture.serviceAddress.supportedLevels },
        qoSproperties: { type: 'uinteger', value: fixture.serviceAddress.qoSproperties },
        priorityLevels: { type: 'uinteger', value: fixture.serviceAddress.priorityLevels },
        serviceURI: { type: 'uri', value: fixture.serviceAddress.serviceURI },
        dataURI: { type: 'uri', value: fixture.serviceAddress.dataURI },
        dataName: { type: 'string', value: fixture.serviceAddress.dataName },
      },
      providerProperties: { type: 'string', value: fixture.providerProperties },
      providerTime: { type: 'time', value: fixture.providerTime },
    });
  });
});

