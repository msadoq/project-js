require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/dc/dataControllerUtils/queryArguments', () => {
  const fixture = stubData.getQueryArguments();
  console.log("FIXTURE : ",fixture);
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.QueryArguments', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.QueryArguments', buffer);
    json.should.be.an('object').that.have.properties({
      sortFieldName: (typeof fixture.sortFieldName === 'undefined') ? null : fixture.sortFieldName,
      sortOrder: (typeof fixture.sortOrder === 'undefined') ? null : fixture.sortOrder,
      limitStart: (typeof fixture.limitStart === 'undefined') ? null : fixture.limitStart,
      limitNumber: (typeof fixture.limitNumber === 'undefined') ? null : fixture.limitNumber,
      getLastType: (typeof fixture.getLastType === 'undefined') ? null : fixture.getLastType,
      getLastFromTime: (typeof fixture.getLastFromTime === 'undefined') ? null : fixture.getLastFromTime,
      getLastNumber: (typeof fixture.getLastNumber === 'undefined') ? null : fixture.getLastNumber,
    });
    // --> filters removed from server
    // json.filters.should.be.an('array').that.have.lengthOf(fixture.filters.length);
    // for (let i = 0; i < fixture.filters.length; i += 1) {
    //   json.filters[i].should.be.an('object').that.have.properties({
    //     fieldName: fixture.filters[i].fieldName,
    //     type: fixture.filters[i].type,
    //     fieldValue: { type: 'ulong', symbol: `${fixture.filters[i].fieldValue}` },
    //   });
    // }
  });
});
