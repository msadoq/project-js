// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/timeBasedDataType/TimeBasedDataByte', () => {
  const fixture = stubData.getTimeBasedDataByte();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataByte', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataByte', buffer);
    json.should.be.an('object').that.have.properties({
      timeStamp: { type: 'finetime', value: fixture.timeStamp },
      name: { type: 'string', value: fixture.name },
      value: { type: 'octet', value: fixture.value },
    });
    
  });
});

