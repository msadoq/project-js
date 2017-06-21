// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pusElementList');
const { getPusElementList } = require('../stubs');



describe('protobuf/isis/pusGroundModel/PusElementList', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/PusElementList.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.PusElementList');
  const fixture = getPusElementList();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      
    });
    
    json.pusValue.should.be.an('array').that.have.lengthOf(fixture.pusValue.length);
    for (let i = 0; i < fixture.pusValue.length; i += 1) {
      json.pusValue[i].should.be.an('object').that.have.properties({
        value: { type: 'double', symbol: fixture.pusValue[i].value.toString() },
      });
      
    }
  });
});
