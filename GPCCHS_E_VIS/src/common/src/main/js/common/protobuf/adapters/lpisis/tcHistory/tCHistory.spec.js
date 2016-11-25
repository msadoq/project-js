// Generated file
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');

describe('protobuf/lpisis/tcHistory/tCHistory', () => {
  const fixture = stubData.getTCHistory();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.tcHistory.TCHistory', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.tcHistory.TCHistory', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
