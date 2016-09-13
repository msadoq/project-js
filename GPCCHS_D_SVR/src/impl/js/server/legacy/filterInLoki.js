const constants = require('../lib/constants');

const dcLokiOperatorMapping = {
  [constants.FILTEROPERATOR_EQ]: '$eq',
  [constants.FILTEROPERATOR_NE]: '$ne',
  [constants.FILTEROPERATOR_LT]: '$lt',
  [constants.FILTEROPERATOR_LE]: '$lte',
  [constants.FILTEROPERATOR_GT]: '$gt',
  [constants.FILTEROPERATOR_GE]: '$gte',
  [constants.FILTEROPERATOR_CONTAINS]: '$contains',
  [constants.FILTEROPERATOR_ICONTAINS]: '$containsNone',
};

const resolveCacheFilter = filter => ({
  [`jsonPayload.${filter.field}`]: {
    [dcLokiOperatorMapping[filter.operator]]: filter.value,
  },
});

const resolveCacheFilters = filterArray => (
  filterArray.constructor === Array
    ? filterArray.map(filter => resolveCacheFilter(filter))
    : []
);

// -> in model method
// if (filter && filter.length) {
//   const filters = resolveCacheFilters(filter);
//   if (filters.length) {
//     query.$and = query.$and.concat(filters);
//   }
// }

// -> in model test
// describe('filter', () => {
//   beforeEach(() => {
//     const r1 = getDcReportingParameter({ data: { rawValue: 40 } });
//     const r2 = getDcReportingParameter({ data: { rawValue: 55 } });
//     const r3 = getDcReportingParameter({ data: { rawValue: 75 } });
//     model.addRecord(r1.meta, r1.data);
//     model.addRecord(r2.meta, r2.data);
//     model.addRecord(r3.meta, r3.data);
//   });
//
//   it('one', () => {
//     model.retrieveBySubscription(Object.assign({}, query, {
//       filter: [
//         {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           field: 'rawValue',
//           operator: constants.FILTEROPERATOR_LT,
//           value: 75,
//         },
//       ],
//     })).should.be.an('array').that.has.lengthOf(2);
//   });
//   it('multi', () => {
//     model.retrieveBySubscription(Object.assign({}, query, {
//       filter: [
//         {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           field: 'rawValue',
//           operator: constants.FILTEROPERATOR_LT,
//           value: 76,
//         },
//         {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           field: 'rawValue',
//           operator: constants.FILTEROPERATOR_GT,
//           value: 46,
//         },
//       ],
//     })).should.be.an('array').that.has.lengthOf(2);
//   });
// });

module.exports = { resolveCacheFilters };