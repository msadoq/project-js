// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus019EventAction');
const { getPus019EventAction } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus019EventAction', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus019EventAction.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus019EventAction');
  const fixture = getPus019EventAction();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      apid: { type: 'uinteger', value: fixture.apid },
      rid: { type: 'uinteger', value: fixture.rid },
      actionStatus: { type: 'uinteger', value: fixture.actionStatus },
      actionTcPacketHeader: { type: 'blob', value: fixture.actionTcPacketHeader },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      ridLabel: { type: 'string', value: fixture.ridLabel },
    });
    
    
  });
});
