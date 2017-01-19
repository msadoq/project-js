// Generated file
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/timeBasedDataType/TimeBasedDataUInteger', () => {
  const fixture = stubData.getTimeBasedDataUInteger();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataUInteger', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataUInteger', buffer);
    json.should.be.an('object').that.have.properties({
      timeStamp: { type: 'finetime', value: fixture.timeStamp },
      name: { type: 'string', value: fixture.name },
      value: { type: 'uinteger', value: fixture.value },
    });
    
  });
});
