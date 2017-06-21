// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./transportedDocuments');
const { getTransportedDocuments } = require('../stubs');



describe('protobuf/isis/editor/TransportedDocuments', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/TransportedDocuments.proto`, { keepCase: true })
    .lookup('editor.protobuf.TransportedDocuments');
  const fixture = getTransportedDocuments();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      
    });
    
    json.documents.should.be.an('array').that.have.lengthOf(fixture.documents.length);
    for (let i = 0; i < fixture.documents.length; i += 1) {
      json.documents[i].should.be.an('object').that.have.properties({
        docPath: { type: 'string', value: fixture.documents[i].docPath },
        docId: { type: 'long', symbol: `${fixture.documents[i].docId}` },
        parentDocId: { type: 'long', symbol: `${fixture.documents[i].parentDocId}` },
      });
      
    }
  });
});
