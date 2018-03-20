// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus011Model');
const { getPus011Model } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus011Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus011Model');
  const fixture = getPus011Model();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      maxNoTc: { type: 'uinteger', value: fixture.maxNoTc },
      scheduleStatus: { type: 'uinteger', value: fixture.scheduleStatus },
      apid: { type: 'uinteger', value: fixture.apid },
      noFreeCommands: { type: 'uinteger', value: fixture.noFreeCommands },
      lastUpdateTimeNoFreeCommands: { type: 'time', value: fixture.lastUpdateTimeNoFreeCommands },
      freeSpace: { type: 'uinteger', value: fixture.freeSpace },
      lastUpdateTimeFreeSpace: { type: 'time', value: fixture.lastUpdateTimeFreeSpace },
      spaceInNumberOfCommands: { type: 'boolean', value: fixture.spaceInNumberOfCommands },
      noSubSchedule: { type: 'uinteger', value: fixture.noSubSchedule },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      groundDate: { type: 'time', value: fixture.groundDate },
      status: { type: 'uinteger', value: fixture.status },
      useTimeShifts: { type: 'boolean', value: fixture.useTimeShifts },
    });
    
    json.pus011Apid.should.be.an('array').that.have.lengthOf(fixture.pus011Apid.length);
    for (let i = 0; i < fixture.pus011Apid.length; i += 1) {
      json.pus011Apid[i].should.be.an('object').that.have.properties({
        status: { type: 'uinteger', value: fixture.pus011Apid[i].status },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus011Apid[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus011Apid[i].pusElement.lastUpdateTime },
        },
        apid: { type: 'uinteger', value: fixture.pus011Apid[i].apid },
      });
      
    }
  });
});
