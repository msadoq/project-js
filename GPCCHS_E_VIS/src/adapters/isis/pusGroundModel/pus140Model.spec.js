// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus140Model');
const { getPus140Model } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus140Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus140Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus140Model');
  const fixture = getPus140Model();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      groundDate: { type: 'time', value: fixture.groundDate },
      apid: { type: 'uinteger', value: fixture.apid },
      noOfParameters: { type: 'uinteger', value: fixture.noOfParameters },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: fixture.status },
    });
    
    json.pus140Parameter.should.be.an('array').that.have.lengthOf(fixture.pus140Parameter.length);
    for (let i = 0; i < fixture.pus140Parameter.length; i += 1) {
      json.pus140Parameter[i].should.be.an('object').that.have.properties({
        parameterId: { type: 'uinteger', value: fixture.pus140Parameter[i].parameterId },
        apid: { type: 'uinteger', value: fixture.pus140Parameter[i].apid },
        currentValue: { type: 'double', symbol: fixture.pus140Parameter[i].currentValue.toString() },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus140Parameter[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus140Parameter[i].pusElement.lastUpdateTime },
        },
      });
      
    }
  });
});
