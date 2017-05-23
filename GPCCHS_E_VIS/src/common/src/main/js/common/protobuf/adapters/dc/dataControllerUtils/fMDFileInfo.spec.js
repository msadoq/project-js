require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/utils/dataControllerUtils/fMDFileInfo', () => {
  const fixture = stubData.getFMDFileInfo();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.FMDFileInfo', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.FMDFileInfo', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
