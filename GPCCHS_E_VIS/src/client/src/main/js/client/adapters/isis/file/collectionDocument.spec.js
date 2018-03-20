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
const adapter = require('./collectionDocument');
const { getCollectionDocument } = require('../stubs');



describe('protobuf/isis/file/CollectionDocument', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/CollectionDocument.proto`, { keepCase: true })
    .lookup('file.protobuf.CollectionDocument');
  const fixture = getCollectionDocument();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      name: { type: 'string', value: fixture.name },
      externalVersion: (typeof fixture.externalVersion === 'undefined')
        ? null
        : { type: 'string', value: fixture.externalVersion },
      internalVersion: (typeof fixture.internalVersion === 'undefined')
        ? null
        : { type: 'ulong', symbol: `${fixture.internalVersion}` },
      uri: { type: 'uri', value: fixture.uri },
      brokenLink: { type: 'boolean', value: fixture.brokenLink },
      isVersion: { type: 'boolean', value: fixture.isVersion },
    });
    
    
  });
});
