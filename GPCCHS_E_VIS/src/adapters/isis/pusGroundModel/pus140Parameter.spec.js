// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus140Parameter');
const { getPus140Parameter } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus140Parameter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus140Parameter.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus140Parameter');
  const fixture = getPus140Parameter();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      parameterId: { type: 'uinteger', value: fixture.parameterId },
      apid: { type: 'uinteger', value: fixture.apid },
      currentValue: { type: 'double', symbol: fixture.currentValue.toString() },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
    });
    
    
  });
});
