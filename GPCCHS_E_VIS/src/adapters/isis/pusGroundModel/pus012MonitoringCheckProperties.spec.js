// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus012MonitoringCheckProperties');
const { getPus012MonitoringCheckProperties } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus012MonitoringCheckProperties', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus012MonitoringCheckProperties.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus012MonitoringCheckProperties');
  const fixture = getPus012MonitoringCheckProperties();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      ridStatus: { type: 'uinteger', value: fixture.ridStatus },
      actionStatus: { type: 'uinteger', value: fixture.actionStatus },
      value: { type: 'double', symbol: fixture.value.toString() },
      rid: { type: 'uinteger', value: fixture.rid },
      mask: { type: 'string', value: fixture.mask },
      actionName: { type: 'string', value: fixture.actionName },
      ridLabel: { type: 'string', value: fixture.ridLabel },
    });
    
    
  });
});
