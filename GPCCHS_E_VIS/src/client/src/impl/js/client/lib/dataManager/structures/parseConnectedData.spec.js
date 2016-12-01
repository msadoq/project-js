// import applyDomainsAndTimebar from './applyDomainsAndTimebar';
//
// describe('data/map/applyDomainsAndTimebar', () => {
//   let connectedData;
//   let visuWindow;
//   let timelines;
//   let domains;
//   beforeEach(() => {
//     connectedData = {
//       formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue',
//       domain: 'cnes',
//       timeline: 'tl1',
//       filter: {}
//     };
//     visuWindow = { lower: 2, upper: 10, current: 5 };
//     timelines = [
//       { id: 'tl1', sessionId: 'session1', offset: 0 },
//       { id: 'tl2', sessionId: 'session2', offset: 10 },
//       { id: 'other', sessionId: 'sessionOther', offset: -10 },
//       { id: undefined, sessionId: 'invalid', offset: 0 },
//     ];
//     domains = [
//       { domainId: 'd1', name: 'cnes' },
//       { domainId: 'd2', name: 'cnes.isis' },
//       { domainId: 'd3', name: 'cnes.isis.sat1' },
//       { domainId: 'd4', name: 'cnes.isis.sat2' },
//       { domainId: 'd5', name: 'cnes.isis.sat2.gun' },
//       { domainId: 'invalid', name: undefined },
//     ];
//   });
//   // connectedData, structureType, timebarId, visuWindow, timelines, domains, allowMultiple
//   it('no domains', () => {
//     applyDomainsAndTimebar(connectedData, 'range', 'tb1', visuWindow, timelines, [], false)
//     .should.deep.equal({});
//   });
//   it('multiple domains', () => {
//     connectedData.domain = 'cnes*';
//     applyDomainsAndTimebar(connectedData, 'range', 'tb1', visuWindow, timelines, domains, true)
//     .should.deep.equal({});
//   });
//   it('no session', () => {
//     connectedData.timeline = 'tl10';
//     applyDomainsAndTimebar(connectedData, 'range', 'tb1', visuWindow, timelines, domains, false)
//     .should.deep.equal({});
//   });
//   it('multiple session', () => {
//     connectedData.timeline = 'tl*';
//     applyDomainsAndTimebar(connectedData, 'range', 'tb1', visuWindow, timelines, domains, true)
//     .should.deep.equal({});
//   });
//   it('invalid formula', () => {
//     connectedData.formula = 'formula';
//     applyDomainsAndTimebar(connectedData, 'range', 'tb1', visuWindow, timelines, domains, false)
//     .should.deep.equal({});
//   });
//   it('valid', () => {
//     const res = applyDomainsAndTimebar(connectedData, 'range', 'tb1', visuWindow, timelines,
//                                        domains, false);
//     res.should.be.an('object')
//     .with.keys('range@Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>:session1:d1');
//     res['range@Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>:session1:d1'].should.deep.equal(
//       {
//         structureType: 'range',
//         dataId: {
//           catalog: 'Reporting',
//           parameterName: 'ATT_BC_STR1VOLTAGE',
//           comObject: 'ReportingParameter',
//           domainId: 'd1',
//           sessionId: 'session1'
//         },
//         filter: {},
//         localIds: {
//           'extractedValue.tb1:0': {
//             expectedInterval: [2, 10],
//             field: 'extractedValue',
//             offset: 0,
//             timebarId: 'tb1',
//           }
//         }
//       });
//   });
// });
