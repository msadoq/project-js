// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./execution');
const { getExecution } = require('../stubs');



describe('protobuf/isis/execution/Execution', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Execution.proto`, { keepCase: true })
    .lookup('execution.protobuf.Execution');
  const fixture = getExecution();
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
    
    json.launchingParameter.should.be.an('array').that.have.lengthOf(fixture.launchingParameter.length);
    for (let i = 0; i < fixture.launchingParameter.length; i += 1) {
      json.launchingParameter[i].should.be.an('object').that.have.properties({
        name: { type: 'identifier', value: fixture.launchingParameter[i].name },
        value: { type: 'double', symbol: fixture.launchingParameter[i].value.toString() },
      });
      
    }
  });
});
