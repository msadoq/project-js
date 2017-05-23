// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../.././index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/timeBasedDataType/TimeBasedDataBlob', () => {
  const fixture = stubData.getTimeBasedDataBlob();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataBlob', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataBlob', buffer);
    json.should.be.an('object').that.have.properties({
      timeStamp: { type: 'finetime', value: fixture.timeStamp },
      name: { type: 'string', value: fixture.name },
      value: { type: 'blob', value: fixture.value },
    });
  });
});

