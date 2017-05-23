require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../.././index');

describe('protobuf/utils/dataControllerUtils/fMDGet', () => {
  const fixture = stubData.getFMDGet();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.FMDGet', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.FMDGet', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
