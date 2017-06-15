// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
require('../../../utils/test');
const stubData = require('../stubs');

const protobuf = require('../../../protobuf');

const { decodeRaw } = require('../types');



describe('protobuf/isis/userEvent/UserEvent', () => {
  const fixture = stubData.getUserEvent();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('isis.userEvent.UserEvent', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('isis.userEvent.UserEvent', buffer);
    json.should.be.an('object').that.have.properties({
      eventDate: { type: 'time', value: fixture.eventDate },
      systemDate: { type: 'time', value: fixture.systemDate },
      mission: { type: 'string', value: fixture.mission },
      satellite: { type: 'ulong', symbol: `${fixture.satellite}` },
    });
    decodeRaw(json.userProfile).should.be.an('object').that.have.properties({
      login: { type: 'string', value: fixture.userProfile.login },
      password: { type: 'string', value: fixture.userProfile.password },
      profile: { type: 'string', value: fixture.userProfile.profile },
      userTime: { type: 'time', value: fixture.userProfile.userTime },
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

