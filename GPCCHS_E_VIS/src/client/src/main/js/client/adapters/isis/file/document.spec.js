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
const adapter = require('./document');
const { getDocument } = require('../stubs');



describe('protobuf/isis/file/Document', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Document.proto`, { keepCase: true })
    .lookup('file.protobuf.Document');
  const fixture = getDocument();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      lockedBy: (typeof fixture.lockedBy === 'undefined')
        ? null
        : { type: 'string', value: fixture.lockedBy },
      dirname: { type: 'uri', value: fixture.dirname },
      usersAccess: (typeof fixture.usersAccess === 'undefined')
        ? null
        : {
          read: { type: 'boolean', value: fixture.usersAccess.read },
          changeAccessRight: { type: 'boolean', value: fixture.usersAccess.changeAccessRight },
          write: { type: 'boolean', value: fixture.usersAccess.write },
          execute: { type: 'boolean', value: fixture.usersAccess.execute },
        },
      basename: { type: 'string', value: fixture.basename },
      creatorUser: (typeof fixture.creatorUser === 'undefined')
        ? null
        : { type: 'string', value: fixture.creatorUser },
      filesize: { type: 'uinteger', value: fixture.filesize },
    });
    
    json.properties.should.be.an('array').that.have.lengthOf(fixture.properties.length);
    for (let i = 0; i < fixture.properties.length; i += 1) {
      json.properties[i].should.be.an('object').that.have.properties({
        name: { type: 'identifier', value: fixture.properties[i].name },
        value: { type: 'double', symbol: fixture.properties[i].value.toString() },
      });
      
    }
  });
});
