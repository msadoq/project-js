// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./collectionVirtualFolder');
const { getCollectionVirtualFolder } = require('../stubs');



describe('protobuf/isis/file/CollectionVirtualFolder', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/CollectionVirtualFolder.proto`, { keepCase: true })
    .lookup('file.protobuf.CollectionVirtualFolder');
  const fixture = getCollectionVirtualFolder();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      name: { type: 'string', value: fixture.name },
      uid: { type: 'long', symbol: `${fixture.uid}` },
    });
    
    
  });
});
