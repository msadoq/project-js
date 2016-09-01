// require('../../lib/utils/test');
// const model = require('../../lib/models/cacheBinary');
// const { getDataId, getReportingParameter } = require('../../lib/stubs/data');
// const protobuf = require('../../lib/protobuf');
//
// describe('models/cacheBinary', () => {
//   beforeEach(() => {
//     model.clear();
//   });
//
//   const dataId = getDataId();
//   const now = Date.now();
//   const payload = protobuf.encode(
//     'lpisis.decommutedParameter.ReportingParameter',
//     getReportingParameter()
//   );
//
//   describe('addRecord', () => {
//     it('one', () => {
//       model.addRecord(dataId, now, payload);
//       const records = model.find();
//       records.should.be.an('array').that.has.lengthOf(1);
//       records[0].should.be.an('object');
//       records[0].should.have.property('localId', model.getLocalId(dataId));
//       records[0].should.have.property('timestamp', now);
//       records[0].should.have.property('payload', payload);
//     });
//     it('multi', () => {
//       model.addRecord(dataId, now, payload);
//       model.addRecord(dataId, now, payload);
//       model.count().should.equal(2);
//     });
//   });
// });
