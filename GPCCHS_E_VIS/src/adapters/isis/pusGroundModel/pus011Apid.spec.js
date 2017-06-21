// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus011Apid');
const { getPus011Apid } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus011Apid', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011Apid.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus011Apid');
  const fixture = getPus011Apid();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      status: { type: 'uinteger', value: fixture.status },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      apid: { type: 'uinteger', value: fixture.apid },
    });
    
    
  });
});
