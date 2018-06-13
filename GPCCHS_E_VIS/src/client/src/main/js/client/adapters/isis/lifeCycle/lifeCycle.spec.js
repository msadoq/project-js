// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./lifeCycle');
const { getLifeCycle } = require('../stubs');



describe('protobuf/isis/lifeCycle/LifeCycle', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/LifeCycle.proto`, { keepCase: true })
    .lookup('lifeCycle.protobuf.LifeCycle');
  const fixture = getLifeCycle();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      launchingTime: { type: 'time', value: fixture.launchingTime },
    });
    
    json.launchingParameters.should.be.an('array').that.have.lengthOf(fixture.launchingParameters.length);
    for (let i = 0; i < fixture.launchingParameters.length; i += 1) {
      json.launchingParameters[i].should.be.an('object').that.have.properties({
        name: { type: 'identifier', value: fixture.launchingParameters[i].name },
        value: { type: 'double', symbol: fixture.launchingParameters[i].value.toString() },
      });
      
    }
  });
});
