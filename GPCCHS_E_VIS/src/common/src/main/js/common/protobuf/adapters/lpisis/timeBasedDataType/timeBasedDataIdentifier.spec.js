// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../stubs/index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/timeBasedDataType/TimeBasedDataIdentifier', () => {
  const fixture = stubData.getTimeBasedDataIdentifier();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.timeBasedDataType.TimeBasedDataIdentifier', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.timeBasedDataType.TimeBasedDataIdentifier', buffer);
    json.should.be.an('object').that.have.properties({
      timeStamp: { type: 'finetime', value: fixture.timeStamp },
      name: { type: 'string', value: fixture.name },
      value: { type: 'identifier', value: fixture.value },
    });
  });
});

