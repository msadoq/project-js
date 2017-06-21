// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./uCPReport');
const { getUCPReport } = require('../stubs');



describe('protobuf/isis/connection/UCPReport', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/UCPReport.proto`, { keepCase: true })
    .lookup('connection.protobuf.UCPReport');
  const fixture = getUCPReport();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      date: { type: 'time', value: fixture.date },
    });
    
    json.parameters.should.be.an('array').that.have.lengthOf(fixture.parameters.length);
    for (let i = 0; i < fixture.parameters.length; i += 1) {
      json.parameters[i].should.be.an('object').that.have.properties({
        name: { type: 'string', value: fixture.parameters[i].name },
        value: { type: 'double', symbol: fixture.parameters[i].value.toString() },
      });
      
    }
  });
});
