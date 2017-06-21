// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./opAlertConfiguration');
const { getOpAlertConfiguration } = require('../stubs');



describe('protobuf/isis/opAlert/OpAlertConfiguration', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/OpAlertConfiguration.proto`, { keepCase: true })
    .lookup('opAlert.protobuf.OpAlertConfiguration');
  const fixture = getOpAlertConfiguration();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      numberCalls: { type: 'integer', value: fixture.numberCalls },
      alertByPHONE: { type: 'boolean', value: fixture.alertByPHONE },
      alertByAUDIO: { type: 'boolean', value: fixture.alertByAUDIO },
      alertByEMAIL: { type: 'boolean', value: fixture.alertByEMAIL },
      alertBySMS: { type: 'boolean', value: fixture.alertBySMS },
      maxNumberRetries: { type: 'integer', value: fixture.maxNumberRetries },
      delayRetries: { type: 'duration', value: fixture.delayRetries },
    });
    
    
  });
});
