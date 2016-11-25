require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/dc/dataControllerUtils/queryArguments', () => {
  const fixture = stubData.getQueryArguments();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.QueryArguments', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.QueryArguments', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
