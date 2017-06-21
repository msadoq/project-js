// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./folder');
const { getFolder } = require('../stubs');



describe('protobuf/isis/file/Folder', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Folder.proto`, { keepCase: true })
    .lookup('file.protobuf.Folder');
  const fixture = getFolder();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      path: { type: 'uri', value: fixture.path },
    });
    
    json.profilesAccess.should.be.an('array').that.have.lengthOf(fixture.profilesAccess.length);
    for (let i = 0; i < fixture.profilesAccess.length; i += 1) {
      json.profilesAccess[i].should.be.an('object').that.have.properties({
        read: { type: 'boolean', value: fixture.profilesAccess[i].read },
        changeAccessRight: { type: 'boolean', value: fixture.profilesAccess[i].changeAccessRight },
        write: { type: 'boolean', value: fixture.profilesAccess[i].write },
        profile: {
          login: { type: 'string', value: fixture.profilesAccess[i].profile.login },
          password: { type: 'string', value: fixture.profilesAccess[i].profile.password },
          profile: { type: 'string', value: fixture.profilesAccess[i].profile.profile },
          userTime: { type: 'time', value: fixture.profilesAccess[i].profile.userTime },
        },
      });
      
    }
    json.usersAccess.should.be.an('array').that.have.lengthOf(fixture.usersAccess.length);
    for (let i = 0; i < fixture.usersAccess.length; i += 1) {
      json.usersAccess[i].should.be.an('object').that.have.properties({
        read: { type: 'boolean', value: fixture.usersAccess[i].read },
        changeAccessRight: { type: 'boolean', value: fixture.usersAccess[i].changeAccessRight },
        write: { type: 'boolean', value: fixture.usersAccess[i].write },
        user: {
          login: { type: 'string', value: fixture.usersAccess[i].user.login },
          password: { type: 'string', value: fixture.usersAccess[i].user.password },
          profile: { type: 'string', value: fixture.usersAccess[i].user.profile },
          userTime: { type: 'time', value: fixture.usersAccess[i].user.userTime },
        },
      });
      
    }
    json.properties.should.be.an('array').that.have.lengthOf(fixture.properties.length);
    for (let i = 0; i < fixture.properties.length; i += 1) {
      json.properties[i].should.be.an('object').that.have.properties({
        name: { type: 'identifier', value: fixture.properties[i].name },
        value: { type: 'double', symbol: fixture.properties[i].value.toString() },
      });
      
    }
  });
});
