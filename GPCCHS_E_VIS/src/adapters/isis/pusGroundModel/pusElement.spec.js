// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pusElement');
const { getPusElement } = require('../stubs');



describe('protobuf/isis/pusGroundModel/PusElement', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/PusElement.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.PusElement');
  const fixture = getPusElement();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      lastUpdateMode: { type: 'uinteger', value: fixture.lastUpdateMode },
      lastUpdateTime: { type: 'time', value: fixture.lastUpdateTime },
    });
    
    
  });
});
