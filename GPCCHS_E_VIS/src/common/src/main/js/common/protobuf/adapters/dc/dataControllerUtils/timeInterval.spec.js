require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../.././index');

describe('protobuf/utils/dataControllerUtils/timeInterval', () => {
  const fixture = stubData.getTimeInterval();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.TimeInterval', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.TimeInterval', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
