// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
require('../../../utils/test');
const { encodeRaw, decodeRaw } = require('./serviceAddress');
const { getServiceAddress } = require('../stubs');



describe('protobuf/isis/ccsds_cs/ServiceAddress', () => {
  const fixture = getServiceAddress();
  let buffer;
  it('encode', () => {
    buffer = encodeRaw(fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = decodeRaw(buffer);
    json.should.be.an('object').that.have.properties({
      supportedCapabilities: { type: 'uinteger', value: fixture.supportedCapabilities },
      supportedLevels: { type: 'uinteger', value: fixture.supportedLevels },
      qoSproperties: { type: 'uinteger', value: fixture.qoSproperties },
      priorityLevels: { type: 'uinteger', value: fixture.priorityLevels },
      serviceURI: { type: 'uri', value: fixture.serviceURI },
      dataURI: { type: 'uri', value: fixture.dataURI },
      dataName: { type: 'string', value: fixture.dataName },
    });
    
  });
});
