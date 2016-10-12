// import { should, getStore } from '../common/test';
// import forView from './forView';
//
// describe('connectedData/forView', () => {
//   it('valid', () => {
//     const store = getStore({
//       windows: { myWindowId: { pages: ['p1', 'p2', 'p3', 'not-exist'] }},
//       pages: {
//         p1: { timebarId: 'tb1', views: ['v1'] },
//         p2: { timebarId: 'tb2', views: ['v2', 'not-exist', 'v3', 'v4'] },
//         p3: { timebarId: 'tb1', views: [] },
//       },
//       views: {
//         v1: { type: 'TextView',
//           configuration: { textViewEntryPoints: [
//           { connectedData: { uuid: 'cd1' } },
//           { connectedData: { uuid: 'cd2' } }
//           ] } },
//         v2: { type: 'TextView', configuration: [] },
//         v3: { type: 'TextView',
//         configuration: { textViewEntryPoints: [
//           { connectedData: { uuid: 'cd2' } },
//           { connectedData: { uuid: 'not-exist' } },
//         ] } },
//         v4: { type: 'PlotView',
//         configuration: { plotViewEntryPoints: [
//           { connectedDataX: { uuid: 'cd4' }, connectedDataY: { uuid: 'cd5' } },
//         ] } },
//       },
//       timebars: {
//         tb1: { timelines: ['tl1', 'tl3', 'tl4'] },
//         tb2: { timelines: ['tl2'] },
//       },
//       timelines: {
//         tl1: { id: 'TL1', sessionId: 's1', offset: 0 },
//         tl2: { id: 'TL2', sessionId: 's2', offset: 10 },
//         tl3: { id: 'TL3', sessionId: 's3', offset: -10 },
//         tl4: { id: '4TL', sessionId: 's4', offset: 0 },
//       },
//       connectedData: {
//         cd1: { domain: 'cnes.isis.sat1', timeline: 'TL1', formula: 'c.pn<co>.f' },
//         cd2: { domain: 'cnes.isis.sat2', timeline: 'TL3', formula: 'c2.pn2<co2>.f2' },
//       },
//       domains: [
//         { domainId: 'd1', name: 'cnes.isis.sat1' },
//         { domainId: 'd2', name: 'cnes.isis.sat2' },
//         { domainId: 'd3', name: 'cnes.isis.sat2.ion' },
//         { domainId: 'd4', name: 'cnes.isis.sat2.flak' },
//       ],
//     });
//
//     const decoratedData = forView(store.getState(), 'tb1', 'v1');
//     decoratedData.should.be.an('object');
//     decoratedData.should.have.keys('c.pn<co>:s1:d1', 'c2.pn2<co2>:s3:d2');
//     decoratedData['c.pn<co>:s1:d1'].should.have.keys('localIds', 'timebarId');
//     decoratedData['c.pn<co>:s1:d1'].localIds['TextView.f.0'].should.have.keys('viewType', 'field', 'offset', 'dataId');
//     decoratedData['c2.pn2<co2>:s3:d2'].should.have.keys('localIds', 'timebarId');
//     decoratedData['c2.pn2<co2>:s3:d2'].localIds['TextView.f2.-10'].should.have.keys('viewType', 'field', 'offset', 'dataId');
//   });
// });
