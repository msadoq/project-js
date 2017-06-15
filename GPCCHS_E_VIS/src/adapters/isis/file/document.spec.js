// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
require('../../../utils/test');
const stubData = require('../stubs');

const protobuf = require('../../../protobuf');

const { decodeRaw } = require('../types');



describe('protobuf/isis/file/Document', () => {
  const fixture = stubData.getDocument();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('isis.file.Document', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('isis.file.Document', buffer);
    json.should.be.an('object').that.have.properties({
      dirname: { type: 'uri', value: fixture.dirname },
      basename: { type: 'string', value: fixture.basename },
      confidentiality: { type: 'uoctet', value: fixture.confidentiality },
    });
    decodeRaw(json.lockedBy).should.be.an('object').that.have.properties({
      login: { type: 'string', value: fixture.lockedBy.login },
      password: { type: 'string', value: fixture.lockedBy.password },
      profile: { type: 'string', value: fixture.lockedBy.profile },
      userTime: { type: 'time', value: fixture.lockedBy.userTime },
    });
    
    json.properties.should.be.an('array').that.have.lengthOf(fixture.properties.length);
    for (let i = 0; i < fixture.properties.length; i += 1) {
      json.properties[i].should.be.an('object').that.have.properties({
        name: { type: 'identifier', value: fixture.properties[i].name },
        value: { type: 'double', symbol: fixture.properties[i].value.toString() },
      });
      
    }
    json.usersAccess.should.be.an('array').that.have.lengthOf(fixture.usersAccess.length);
    for (let i = 0; i < fixture.usersAccess.length; i += 1) {
      json.usersAccess[i].should.be.an('object').that.have.properties({
        read: { type: 'boolean', value: fixture.usersAccess[i].read },
        changeAccessRight: { type: 'boolean', value: fixture.usersAccess[i].changeAccessRight },
        write: { type: 'boolean', value: fixture.usersAccess[i].write },
      });
      
    }
    json.profilesAccess.should.be.an('array').that.have.lengthOf(fixture.profilesAccess.length);
    for (let i = 0; i < fixture.profilesAccess.length; i += 1) {
      json.profilesAccess[i].should.be.an('object').that.have.properties({
        read: { type: 'boolean', value: fixture.profilesAccess[i].read },
        changeAccessRight: { type: 'boolean', value: fixture.profilesAccess[i].changeAccessRight },
        write: { type: 'boolean', value: fixture.profilesAccess[i].write },
      });
      
    }
  });
});

