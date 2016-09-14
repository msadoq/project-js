// const {
//   postApiRequest,
//   shouldBeApiError,
// } = require('../../lib/utils/test');
// const constants = require('../../lib/constants');
//
// describe('POST API subscriptions', () => {
//   describe('success', () => {
//     const fixture = {
//       dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//       field: 'rawValue',
//       domainId: 0,
//       timeLineType: constants.TIMELINETYPE_SESSION,
//       sessionId: 1,
//       setFileName: '',
//       subscriptionState: constants.SUBSCRIPTIONSTATE_PLAY,
//       visuSpeed: 0,
//       visuWindow: {
//         lower: 0,
//         upper: 42,
//       },
//       filter: [
//         {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           field: 'rawValue',
//           operator: constants.FILTEROPERATOR_GT,
//           value: 25,
//         }, {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           field: 'rawValue',
//           operator: constants.FILTEROPERATOR_LT,
//           value: 75,
//         },
//       ],
//     };
//     it('call', done => {
//       postApiRequest('/api/subscriptions', fixture)
//         .expect(res => {
//           const body = res.body;
//           body.should.be.an('object').and.have.property('data').that.is.an('object');
//           body.data.should.have.property('subscriptionId');
//         })
//         .expect(200, done);
//     });
//   });
//   describe('error', () => {
//     describe('dataFullName', () => {
//       it('missing', done => {
//         postApiRequest('/api/subscriptions', {})
//           .expect(shouldBeApiError(400, 'dataFullName required', '/body/dataFullName'))
//           .expect(400, done);
//       });
//       it('invalid', done => {
//         postApiRequest('/api/subscriptions', {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE',
//         })
//           .expect(shouldBeApiError(400, 'dataFullName is invalid', '/body/dataFullName'))
//           .expect(400, done);
//       });
//     });
//
//     describe('domainId', () => {
//       it('missing', done => {
//         postApiRequest('/api/subscriptions', {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//         })
//           .expect(shouldBeApiError(400, 'domainId required', '/body/domainId'))
//           .expect(400, done);
//       });
//       it('invalid', done => {
//         postApiRequest('/api/subscriptions', {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           domainId: 'text',
//         })
//           .expect(shouldBeApiError(400, 'domainId is invalid', '/body/domainId'))
//           .expect(400, done);
//       });
//     });
//
//     describe('timeLineType', () => {
//       it('missing', done => {
//         postApiRequest('/api/subscriptions', {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           domainId: 0,
//         })
//           .expect(shouldBeApiError(400, 'timeLineType required', '/body/timeLineType'))
//           .expect(400, done);
//       });
//       it('invalid', done => {
//         postApiRequest('/api/subscriptions', {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           domainId: 0,
//           timeLineType: 'other',
//         })
//           .expect(shouldBeApiError(400, 'timeLineType is invalid', '/body/timeLineType'))
//           .expect(400, done);
//       });
//       it('missing sessionId', done => {
//         postApiRequest('/api/subscriptions', {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           domainId: 0,
//           timeLineType: constants.TIMELINETYPE_SESSION,
//         })
//           .expect(shouldBeApiError(400, 'sessionId required', '/body/sessionId'))
//           .expect(400, done);
//       });
//       it('missing setFileName', done => {
//         postApiRequest('/api/subscriptions', {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           domainId: 0,
//           timeLineType: constants.TIMELINETYPE_DATASET,
//         })
//           .expect(shouldBeApiError(400, 'setFileName required', '/body/setFileName'))
//           .expect(400, done);
//       });
//     });
//
//     describe('subscriptionState', () => {
//       it('missing', done => {
//         postApiRequest('/api/subscriptions', {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           domainId: 0,
//           timeLineType: constants.TIMELINETYPE_SESSION,
//           sessionId: 1,
//         })
//           .expect(shouldBeApiError(400, 'subscriptionState required', '/body/subscriptionState'))
//           .expect(400, done);
//       });
//       it('missing', done => {
//         postApiRequest('/api/subscriptions', {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           domainId: 0,
//           timeLineType: constants.TIMELINETYPE_SESSION,
//           sessionId: 1,
//           subscriptionState: 'other',
//         })
//           .expect(shouldBeApiError(400, 'subscriptionState is invalid', '/body/subscriptionState'))
//           .expect(400, done);
//       });
//     });
//
//     describe('visuWindow', () => {
//       it('missing', done => {
//         postApiRequest('/api/subscriptions', {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           domainId: 0,
//           timeLineType: constants.TIMELINETYPE_SESSION,
//           subscriptionState: constants.SUBSCRIPTIONSTATE_PAUSE,
//           sessionId: 1,
//         })
//           .expect(shouldBeApiError(400, 'visuWindow required', '/body/visuWindow'))
//           .expect(400, done);
//       });
//       it('missing .lower', done => {
//         postApiRequest('/api/subscriptions', {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           domainId: 0,
//           timeLineType: constants.TIMELINETYPE_SESSION,
//           sessionId: 1,
//           subscriptionState: constants.SUBSCRIPTIONSTATE_PAUSE,
//           visuWindow: { upper: 10 },
//         })
//           .expect(shouldBeApiError(400, 'visuWindow.lower required', '/body/visuWindow/lower'))
//           .expect(400, done);
//       });
//       it('missing .upper', done => {
//         postApiRequest('/api/subscriptions', {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           domainId: 0,
//           timeLineType: constants.TIMELINETYPE_SESSION,
//           sessionId: 1,
//           subscriptionState: constants.SUBSCRIPTIONSTATE_PAUSE,
//           visuWindow: { lower: 10 },
//         })
//           .expect(shouldBeApiError(400, 'visuWindow.upper required', '/body/visuWindow/upper'))
//           .expect(400, done);
//       });
//       it('invalid .lower', done => {
//         postApiRequest('/api/subscriptions', {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           domainId: 0,
//           timeLineType: constants.TIMELINETYPE_SESSION,
//           sessionId: 1,
//           subscriptionState: constants.SUBSCRIPTIONSTATE_PAUSE,
//           visuWindow: { lower: 'text', upper: 10 },
//         })
//           .expect(shouldBeApiError(400, 'visuWindow.lower is invalid', '/body/visuWindow/lower'))
//           .expect(400, done);
//       });
//       it('invalid .upper', done => {
//         postApiRequest('/api/subscriptions', {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           domainId: 0,
//           timeLineType: constants.TIMELINETYPE_SESSION,
//           sessionId: 1,
//           subscriptionState: constants.SUBSCRIPTIONSTATE_PAUSE,
//           visuWindow: { lower: 10, upper: 'text' },
//         })
//           .expect(shouldBeApiError(400, 'visuWindow.upper is invalid', '/body/visuWindow/upper'))
//           .expect(400, done);
//       });
//     });
//     describe('visuSpeed', () => {
//       it('invalid', done => {
//         postApiRequest('/api/subscriptions', {
//           dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//           domainId: 0,
//           timeLineType: constants.TIMELINETYPE_SESSION,
//           sessionId: 1,
//           subscriptionState: constants.SUBSCRIPTIONSTATE_PAUSE,
//           visuWindow: { lower: 10, upper: 10 },
//           visuSpeed: 'text',
//         })
//           .expect(shouldBeApiError(400, 'visuSpeed is invalid', '/body/visuSpeed'))
//           .expect(400, done);
//       });
//     });
//
//     describe('filter', () => {
//       const fixture = {
//         dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//         domainId: 0,
//         timeLineType: constants.TIMELINETYPE_SESSION,
//         sessionId: 1,
//         subscriptionState: constants.SUBSCRIPTIONSTATE_PAUSE,
//         visuWindow: { lower: 10, upper: 10 },
//       };
//       it('invalid', done => {
//         postApiRequest('/api/subscriptions', Object.assign({}, fixture, { filter: 'text' }))
//           .expect(shouldBeApiError(400, 'filter is invalid', '/body/filter'))
//           .expect(400, done);
//       });
//       it('empty', done => {
//         postApiRequest('/api/subscriptions', Object.assign({}, fixture, { filter: [] }))
//           .expect(200, done);
//       });
//       it('rule invalid', done => {
//         postApiRequest('/api/subscriptions', Object.assign({}, fixture, {
//           filter: [
//             'text',
//           ],
//         }))
//         .expect(shouldBeApiError(400, 'filter rule is invalid', '/body/filter/0'))
//         .expect(400, done);
//       });
//       it('rule dataFullName required', done => {
//         postApiRequest('/api/subscriptions', Object.assign({}, fixture, { filter: [{}] }))
//         .expect(shouldBeApiError(
//           400,
//           'filter rule dataFullName required',
//           '/body/filter/0/dataFullName'
//         ))
//         .expect(400, done);
//       });
//       it('rule dataFullName invalid', done => {
//         postApiRequest('/api/subscriptions', Object.assign({}, fixture, {
//           filter: [
//             {
//               dataFullName: 'text',
//             },
//           ],
//         }))
//         .expect(shouldBeApiError(
//           400,
//           'filter rule dataFullName is invalid',
//           '/body/filter/0/dataFullName'
//         ))
//         .expect(400, done);
//       });
//       it('rule field required', done => {
//         postApiRequest('/api/subscriptions', Object.assign({}, fixture, {
//           filter: [
//             {
//               dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//             },
//           ],
//         }))
//         .expect(shouldBeApiError(
//           400,
//           'filter rule field required',
//           '/body/filter/0/field'
//         ))
//         .expect(400, done);
//       });
//       it('rule field invalid', done => {
//         postApiRequest('/api/subscriptions', Object.assign({}, fixture, {
//           filter: [
//             {
//               dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//               field: 10, // int
//             },
//           ],
//         }))
//         .expect(shouldBeApiError(
//           400,
//           'filter rule field is invalid',
//           '/body/filter/0/field'
//         ))
//         .expect(400, done);
//       });
//       it('rule operator required', done => {
//         postApiRequest('/api/subscriptions', Object.assign({}, fixture, {
//           filter: [
//             {
//               dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//               field: 'rawValue',
//             },
//           ],
//         }))
//         .expect(shouldBeApiError(
//           400,
//           'filter rule operator required',
//           '/body/filter/0/operator'
//         ))
//         .expect(400, done);
//       });
//       it('rule operator invalid', done => {
//         postApiRequest('/api/subscriptions', Object.assign({}, fixture, {
//           filter: [
//             {
//               dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//               field: 'rawValue',
//               operator: 'text',
//             },
//           ],
//         }))
//         .expect(shouldBeApiError(
//           400,
//           'filter rule operator is invalid',
//           '/body/filter/0/operator'
//         ))
//         .expect(400, done);
//       });
//       it('rule value required', done => {
//         postApiRequest('/api/subscriptions', Object.assign({}, fixture, {
//           filter: [
//             {
//               dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//               field: 'rawValue',
//               operator: constants.FILTEROPERATOR_GT,
//             },
//           ],
//         }))
//         .expect(shouldBeApiError(
//           400,
//           'filter rule value required',
//           '/body/filter/0/value'
//         ))
//         .expect(400, done);
//       });
//       it('rule value invalid', done => {
//         postApiRequest('/api/subscriptions', Object.assign({}, fixture, {
//           filter: [
//             {
//               dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
//               field: 'rawValue',
//               operator: constants.FILTEROPERATOR_GT,
//               value: '', // empty string
//             },
//           ],
//         }))
//         .expect(shouldBeApiError(
//           400,
//           'filter rule value is invalid',
//           '/body/filter/0/value'
//         ))
//         .expect(400, done);
//       });
//     });
//   });
// });
