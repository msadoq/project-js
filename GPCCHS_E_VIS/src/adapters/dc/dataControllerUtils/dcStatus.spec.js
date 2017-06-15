require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../stubs/index');

describe('protobuf/utils/dataControllerUtils/dcStatus', () => {
  const fixture = stubData.getHealthyDcStatus();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.DcStatus', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.DcStatus', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
