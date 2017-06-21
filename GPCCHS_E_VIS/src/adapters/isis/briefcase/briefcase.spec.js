// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./briefcase');
const { getBriefcase } = require('../stubs');



describe('protobuf/isis/briefcase/Briefcase', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Briefcase.proto`, { keepCase: true })
    .lookup('briefcase.protobuf.Briefcase');
  const fixture = getBriefcase();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      uid: { type: 'long', symbol: `${fixture.uid}` },
      timestamp: { type: 'time', value: fixture.timestamp },
      base: {
        author: {
          objectType: {
            area: { type: 'ushort', value: fixture.base.author.objectType.area },
            service: { type: 'ushort', value: fixture.base.author.objectType.service },
            version: { type: 'uoctet', value: fixture.base.author.objectType.version },
            number: { type: 'ushort', value: fixture.base.author.objectType.number },
          },
          objectKey: {
            domaineId: { type: 'ushort', value: fixture.base.author.objectKey.domaineId },
            uid: { type: 'long', symbol: `${fixture.base.author.objectKey.uid}` },
          },
        },
        title: { type: 'string', value: fixture.base.title },
        description: { type: 'string', value: fixture.base.description },
      },
    });
    
    
  });
});
