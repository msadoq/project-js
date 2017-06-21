// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus019Model');
const { getPus019Model } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus019Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus019Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus019Model');
  const fixture = getPus019Model();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      serviceStatus: { type: 'uinteger', value: fixture.serviceStatus },
      noOfEventActions: { type: 'uinteger', value: fixture.noOfEventActions },
      groundDate: { type: 'time', value: fixture.groundDate },
      apid: { type: 'uinteger', value: fixture.apid },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: fixture.status },
    });
    
    json.pus19EventAction.should.be.an('array').that.have.lengthOf(fixture.pus19EventAction.length);
    for (let i = 0; i < fixture.pus19EventAction.length; i += 1) {
      json.pus19EventAction[i].should.be.an('object').that.have.properties({
        apid: { type: 'uinteger', value: fixture.pus19EventAction[i].apid },
        rid: { type: 'uinteger', value: fixture.pus19EventAction[i].rid },
        actionStatus: { type: 'uinteger', value: fixture.pus19EventAction[i].actionStatus },
        actionTcPacketHeader: { type: 'blob', value: fixture.pus19EventAction[i].actionTcPacketHeader },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus19EventAction[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus19EventAction[i].pusElement.lastUpdateTime },
        },
        ridLabel: { type: 'string', value: fixture.pus19EventAction[i].ridLabel },
      });
      
    }
  });
});
