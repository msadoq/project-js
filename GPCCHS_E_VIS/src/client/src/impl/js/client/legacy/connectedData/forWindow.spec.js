// /* eslint no-unused-expressions: 0 */
// import { getStore } from '../common/test';
// import forWindow, { extractFromWindow } from './forWindow';
//
// describe('connectedData/forWindow', () => {
//   describe('extractFromWindow', () => {
//     it('works', () => {
//       const store = getStore({
//         windows: { myWindowId: { pages: ['p1', 'p2', 'p3', 'not-exist'] }},
//         pages: {
//           p1: { timebarId: 'tb1', views: ['v1'] },
//           p2: { timebarId: 'tb2', views: ['v2', 'not-exist', 'v3', 'v4'] },
//           p3: { timebarId: 'tb1', views: [] },
//         },
//         views: {
//           v1: { type: 'TextView', configuration: { textViewEntryPoints: [
//             { connectedData: { uuid: 'cd1' } }
//           ] } },
//           v2: { type: 'TextView', configuration: [] },
//           v3: { type: 'TextView', configuration: { textViewEntryPoints: [
//             { connectedData: { uuid: 'cd2' } },
//             { connectedData: { uuid: 'not-exist' } },
//             { connectedData: { uuid: 'cd3' } },
//           ] } },
//           v4: { type: 'PlotView', configuration: { plotViewEntryPoints: [
//             { connectedDataX: { uuid: 'cd4' }, connectedDataY: { uuid: 'cd5' } },
//           ] } },
//         },
//         connectedData: {
//           cd1: { formula: 'f-f' },
//           cd2: { formula: 'f+f' },
//           cd3: { formula: 'f*f' },
//           cd4: { formula: 'f/f' },
//           cd5: { formula: 'f%f' },
//         },
//       });
//       extractFromWindow(store.getState(), 'myWindowId').should.eql([
//         { formula: 'f-f', timebarId: 'tb1' },
//         { formula: 'f+f', timebarId: 'tb2' },
//         { formula: 'f*f', timebarId: 'tb2' },
//         { formula: 'f/f', timebarId: 'tb2' },
//         { formula: 'f%f', timebarId: 'tb2' },
//       ]);
//     });
//     it('incomplete store', () => {
//       extractFromWindow(getStore({}), 'myWindowId').should.eql([]);
//       extractFromWindow(getStore({
//         windows: { w1: { pages: ['p1']} },
//       }), 'w1').should.eql([]);
//       extractFromWindow(getStore({
//         windows: { w1: { pages: ['p1']} },
//         pages: { p1: { views: ['v1']} },
//       }), 'w1').should.eql([]);
//       extractFromWindow(getStore({
//         windows: { w1: { pages: ['p1']} },
//         pages: { p1: { views: ['v1']} },
//         views: { v1: {} },
//       }), 'w1').should.eql([]);
//     });
//   });
//   describe('forWindow', () => {
//     it('empty store', () => {
//       forWindow({}, 'w1').should.eql([]);
//     });
//     it('works', () => {
//       const { getState } = getStore({
//         domains: [{ domainId: 'd1', name: 'cnes.isis' }],
//         timebars: { tb1: { timelines: ['tl1'] }},
//         timelines: { tl1: { id: 'TL1', sessionId: 's1', offset: 10 }},
//         windows: { w1: { pages: ['p1'] }},
//         pages: { p1: { timebarId: 'tb1', views: ['v1'] } },
//         views: { v1: { type: 'TextView', configuration: { textViewEntryPoints: [
//           { connectedData: { uuid: 'cd1' } }
//         ] } } },
//         connectedData: { cd1: { formula: 'c.pn<co>.f', domain: 'cnes.isis', timeline: 'TL1' } },
//       });
//       forWindow(getState(), 'w1').should.eql([{
//         localId: 'c.pn<co>:s1:d1',
//         offset: 10,
//         dataId: {
//           catalog: 'c',
//           parameterName: 'pn',
//           comObject: 'co',
//           domainId: 'd1',
//           sessionId: 's1'
//         },
//       }]);
//     });
//   });
// });
