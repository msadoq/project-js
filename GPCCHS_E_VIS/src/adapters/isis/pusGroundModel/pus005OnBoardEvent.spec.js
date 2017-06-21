// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus005OnBoardEvent');
const { getPus005OnBoardEvent } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus005OnBoardEvent', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus005OnBoardEvent.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus005OnBoardEvent');
  const fixture = getPus005OnBoardEvent();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      reportId: { type: 'uinteger', value: fixture.reportId },
      onBoardStatus: { type: 'uinteger', value: fixture.onBoardStatus },
      alarmLevel: { type: 'string', value: fixture.alarmLevel },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      reportIdLabel: { type: 'string', value: fixture.reportIdLabel },
    });
    
    
  });
});
