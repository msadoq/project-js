// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./briefcaseContent');
const { getBriefcaseContent } = require('../stubs');



describe('protobuf/isis/briefcase/BriefcaseContent', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/BriefcaseContent.proto`, { keepCase: true })
    .lookup('briefcase.protobuf.BriefcaseContent');
  const fixture = getBriefcaseContent();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      author: {
        objectType: {
          area: { type: 'ushort', value: fixture.author.objectType.area },
          service: { type: 'ushort', value: fixture.author.objectType.service },
          version: { type: 'uoctet', value: fixture.author.objectType.version },
          number: { type: 'ushort', value: fixture.author.objectType.number },
        },
        objectKey: {
          domaineId: { type: 'ushort', value: fixture.author.objectKey.domaineId },
          uid: { type: 'long', symbol: `${fixture.author.objectKey.uid}` },
        },
      },
      title: { type: 'string', value: fixture.title },
      description: { type: 'string', value: fixture.description },
    });
    
    json.link.should.be.an('array').that.have.lengthOf(fixture.link.length);
    for (let i = 0; i < fixture.link.length; i += 1) {
      json.link[i].should.be.an('object').that.have.properties({
        objectType: {
          area: { type: 'ushort', value: fixture.link[i].objectType.area },
          service: { type: 'ushort', value: fixture.link[i].objectType.service },
          version: { type: 'uoctet', value: fixture.link[i].objectType.version },
          number: { type: 'ushort', value: fixture.link[i].objectType.number },
        },
        objectKey: {
          domaineId: { type: 'ushort', value: fixture.link[i].objectKey.domaineId },
          uid: { type: 'long', symbol: `${fixture.link[i].objectKey.uid}` },
        },
      });
      
    }
  });
});
