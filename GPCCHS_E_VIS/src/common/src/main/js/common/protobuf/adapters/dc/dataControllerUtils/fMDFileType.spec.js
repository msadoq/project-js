require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/utils/dataControllerUtils/fMDFileType', () => {
  const fixture = stubData.getFMDFileType();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.FMDFileType', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.FMDFileType', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
