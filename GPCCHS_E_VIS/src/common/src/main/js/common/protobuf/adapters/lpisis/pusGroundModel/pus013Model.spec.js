// Generated file
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/pusGroundModel/Pus013Model', () => {
  const fixture = stubData.getPus013Model();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.pusGroundModel.Pus013Model', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.pusGroundModel.Pus013Model', buffer);
    json.should.be.an('object').that.have.properties({
      noOnGoingDownlinkLDTPacket: { type: 'uinteger', value: fixture.noOnGoingDownlinkLDTPacket },
      groundDate: { type: 'time', value: fixture.groundDate },
      apid: { type: 'uinteger', value: fixture.apid },
      noOnGoingUplinkLDT: { type: 'uinteger', value: fixture.noOnGoingUplinkLDT },
      noOnGoingDownlinkLDTFile: { type: 'uinteger', value: fixture.noOnGoingDownlinkLDTFile },
      currentUplinkLduIdPosition: { type: 'uinteger', value: fixture.currentUplinkLduIdPosition },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
    });
    json.pUS013UplinkLdt.should.be.an('array').that.have.lengthOf(fixture.pUS013UplinkLdt.length);
    for (let i = 0; i < fixture.pUS013UplinkLdt.length; i += 1) {
      json.pUS013UplinkLdt[i].should.be.an('object').that.have.properties({
        ackTimerArmed: { type: 'boolean', value: fixture.pUS013UplinkLdt[i].ackTimerArmed },
        ackTimerDeadline: { type: 'long', value: fixture.pUS013UplinkLdt[i].ackTimerDeadline },
        pus013Ldt: {
          startTime: { type: 'time', value: fixture.pUS013UplinkLdt[i].pus013Ldt.startTime },
          endTime: { type: 'time', value: fixture.pUS013UplinkLdt[i].pus013Ldt.endTime },
          transferType: { type: 'uinteger', value: fixture.pUS013UplinkLdt[i].pus013Ldt.transferType },
          lduId: { type: 'uinteger', value: fixture.pUS013UplinkLdt[i].pus013Ldt.lduId },
          status: { type: 'uinteger', value: fixture.pUS013UplinkLdt[i].pus013Ldt.status },
          size: { type: 'uinteger', value: fixture.pUS013UplinkLdt[i].pus013Ldt.size },
          remainingSize: { type: 'integer', value: fixture.pUS013UplinkLdt[i].pus013Ldt.remainingSize },
          percent: { type: 'uinteger', value: fixture.pUS013UplinkLdt[i].pus013Ldt.percent },
          failureCode: { type: 'uinteger', value: fixture.pUS013UplinkLdt[i].pus013Ldt.failureCode },
          fileId: { type: 'uinteger', value: fixture.pUS013UplinkLdt[i].pus013Ldt.fileId },
          partitionId: { type: 'uinteger', value: fixture.pUS013UplinkLdt[i].pus013Ldt.partitionId },
          fileChecksum: { type: 'string', value: fixture.pUS013UplinkLdt[i].pus013Ldt.fileChecksum },
          fileTypeCode: { type: 'uinteger', value: fixture.pUS013UplinkLdt[i].pus013Ldt.fileTypeCode },
          noLDTParts: { type: 'uinteger', value: fixture.pUS013UplinkLdt[i].pus013Ldt.noLDTParts },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: fixture.pUS013UplinkLdt[i].pus013Ldt.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: fixture.pUS013UplinkLdt[i].pus013Ldt.pusElement.lastUpdateTime },
          },
        },
      });
      
    }
    json.pUS013DownlinkLdt.should.be.an('array').that.have.lengthOf(fixture.pUS013DownlinkLdt.length);
    for (let i = 0; i < fixture.pUS013DownlinkLdt.length; i += 1) {
      json.pUS013DownlinkLdt[i].should.be.an('object').that.have.properties({
        receptionTimerArmed: { type: 'boolean', value: fixture.pUS013DownlinkLdt[i].receptionTimerArmed },
        receptionTimerDeadline: { type: 'time', value: fixture.pUS013DownlinkLdt[i].receptionTimerDeadline },
        groundDate: { type: 'long', value: fixture.pUS013DownlinkLdt[i].groundDate },
        pus013Ldt: {
          startTime: { type: 'time', value: fixture.pUS013DownlinkLdt[i].pus013Ldt.startTime },
          endTime: { type: 'time', value: fixture.pUS013DownlinkLdt[i].pus013Ldt.endTime },
          transferType: { type: 'uinteger', value: fixture.pUS013DownlinkLdt[i].pus013Ldt.transferType },
          lduId: { type: 'uinteger', value: fixture.pUS013DownlinkLdt[i].pus013Ldt.lduId },
          status: { type: 'uinteger', value: fixture.pUS013DownlinkLdt[i].pus013Ldt.status },
          size: { type: 'uinteger', value: fixture.pUS013DownlinkLdt[i].pus013Ldt.size },
          remainingSize: { type: 'integer', value: fixture.pUS013DownlinkLdt[i].pus013Ldt.remainingSize },
          percent: { type: 'uinteger', value: fixture.pUS013DownlinkLdt[i].pus013Ldt.percent },
          failureCode: { type: 'uinteger', value: fixture.pUS013DownlinkLdt[i].pus013Ldt.failureCode },
          fileId: { type: 'uinteger', value: fixture.pUS013DownlinkLdt[i].pus013Ldt.fileId },
          partitionId: { type: 'uinteger', value: fixture.pUS013DownlinkLdt[i].pus013Ldt.partitionId },
          fileChecksum: { type: 'string', value: fixture.pUS013DownlinkLdt[i].pus013Ldt.fileChecksum },
          fileTypeCode: { type: 'uinteger', value: fixture.pUS013DownlinkLdt[i].pus013Ldt.fileTypeCode },
          noLDTParts: { type: 'uinteger', value: fixture.pUS013DownlinkLdt[i].pus013Ldt.noLDTParts },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: fixture.pUS013DownlinkLdt[i].pus013Ldt.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: fixture.pUS013DownlinkLdt[i].pus013Ldt.pusElement.lastUpdateTime },
          },
        },
      });
      
    }
  });
});

