// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus003Packet');
const { getPus003Packet } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus003Packet', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus003Packet.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus003Packet');
  const fixture = getPus003Packet();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      sid: { type: 'uinteger', value: fixture.sid },
      validityParameterId: { type: 'uinteger', value: fixture.validityParameterId },
      validityParameterMask: { type: 'string', value: fixture.validityParameterMask },
      validityParameterExpectedValue: { type: 'double', symbol: fixture.validityParameterExpectedValue.toString() },
      collectionInterval: { type: 'duration', value: fixture.collectionInterval },
      status: { type: 'uinteger', value: fixture.status },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      sidLabel: { type: 'string', value: fixture.sidLabel },
    });
    
    
  });
});
