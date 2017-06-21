// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./action');
const { getAction } = require('../stubs');



describe('protobuf/isis/ccsds_mc/Action', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Action.proto`, { keepCase: true })
    .lookup('ccsds_mc.protobuf.Action');
  const fixture = getAction();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      stageStartedRequired: { type: 'boolean', value: fixture.stageStartedRequired },
      stageProgressRequired: { type: 'boolean', value: fixture.stageProgressRequired },
      stageCompletedRequired: { type: 'boolean', value: fixture.stageCompletedRequired },
      delay: (typeof fixture.delay === 'undefined')
        ? null
        : { type: 'uinteger', value: fixture.delay },
      tCID: { type: 'long', symbol: `${fixture.tCID}` },
    });
    
    json.argumentValues.should.be.an('array').that.have.lengthOf(fixture.argumentValues.length);
    for (let i = 0; i < fixture.argumentValues.length; i += 1) {
      json.argumentValues[i].should.be.an('object').that.have.properties({
        value: { type: 'double', symbol: fixture.argumentValues[i].value.toString() },
      });
      
    }
    json.argumentIds.should.be.an('array').that.have.lengthOf(fixture.argumentIds.length);
    for (let i = 0; i < fixture.argumentIds.length; i += 1) {
      json.argumentIds[i].should.have.properties({
        type: 'long',
        symbol: `${fixture.argumentIds[i]}`,
      });
    }
    json.isConvertedValues.should.be.an('array').that.have.lengthOf(fixture.isConvertedValues.length);
    for (let i = 0; i < fixture.isConvertedValues.length; i += 1) {
      json.isConvertedValues[i].should.have.properties({
        type: 'boolean',
        value: fixture.isConvertedValues[i],
      });
    }
  });
});
