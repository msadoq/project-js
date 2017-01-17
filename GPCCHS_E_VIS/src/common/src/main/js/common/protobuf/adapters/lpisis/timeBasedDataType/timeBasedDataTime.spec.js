// Generated file
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/timeBasedDataType/TimeBasedDataTime', () => {
  const fixture = stubData.getTimeBasedDataTime();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataTime', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataTime', buffer);
    json.should.be.an('object').that.have.properties({
      timeStamp: { type: 'finetime', value: fixture.timeStamp },
      name: { type: 'string', value: fixture.name },
      value: { type: 'time', value: fixture.value },
    });
    
  });
});

