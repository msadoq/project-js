// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus013DownlinkLdt');
const { getPus013DownlinkLdt } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus013DownlinkLdt', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus013DownlinkLdt.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus013DownlinkLdt');
  const fixture = getPus013DownlinkLdt();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      receptionTimerArmed: { type: 'boolean', value: fixture.receptionTimerArmed },
      receptionTimerDeadline: { type: 'time', value: fixture.receptionTimerDeadline },
      groundDate: { type: 'long', symbol: `${fixture.groundDate}` },
      pus013Ldt: {
        startTime: { type: 'time', value: fixture.pus013Ldt.startTime },
        endTime: { type: 'time', value: fixture.pus013Ldt.endTime },
        transferType: { type: 'uinteger', value: fixture.pus013Ldt.transferType },
        lduId: { type: 'uinteger', value: fixture.pus013Ldt.lduId },
        status: { type: 'uinteger', value: fixture.pus013Ldt.status },
        size: { type: 'uinteger', value: fixture.pus013Ldt.size },
        remainingSize: { type: 'integer', value: fixture.pus013Ldt.remainingSize },
        percent: { type: 'uinteger', value: fixture.pus013Ldt.percent },
        failureCode: { type: 'uinteger', value: fixture.pus013Ldt.failureCode },
        fileId: { type: 'uinteger', value: fixture.pus013Ldt.fileId },
        partitionId: { type: 'uinteger', value: fixture.pus013Ldt.partitionId },
        fileChecksum: { type: 'string', value: fixture.pus013Ldt.fileChecksum },
        fileTypeCode: { type: 'uinteger', value: fixture.pus013Ldt.fileTypeCode },
        noLDTParts: { type: 'uinteger', value: fixture.pus013Ldt.noLDTParts },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus013Ldt.pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus013Ldt.pusElement.lastUpdateTime },
        },
      },
    });
    
    
  });
});
