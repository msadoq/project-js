// import { should, getStore } from '../common/test';
// import { showSelectedView } from './fileTreatment';
//
// describe('mainProcess/fileTreatment', () => {
//   const { getState } = getStore({
//     windows: {
//       win1: {
//         debug: {
//           timebarVisibility: true,
//           whyDidYouUpdate: false
//         },
//         focusedPage: 'page1',
//         geometry: {
//           h: 800,
//           kind: 'Absolute',
//           w: 1310,
//           x: 110,
//           y: 10,
//         },
//         pages: ['page1', 'page2'],
//         title: 'window1'
//       },
//     },
//     pages: {
//       page1: { timebarId: 1234, path: 'testPlot.json', views: ['view1', 'view2'] },
//       page2: { timebarId: 1234, path: 'testText.json', views: ['view3'] }
//     },
//     views: {
//       view1: {
//         type: 'PlotView',
//         configuration: {},
//         path: 'views/view1.json',
//         // TODO : it is broken? probably not a good a idea to use absolute path in test code :o/
//         absolutePath: '/path/to/test/testAs/views/view1.json'
//       },
//       view2: {
//         type: 'TextView',
//         configuration: {},
//         path: 'views/view2.json',
//         // TODO : it is broken? probably not a good a idea to use absolute path in test code :o/
//         absolutePath: '/path/to/test/test/testAs/views/view2.json'
//       },
//       view3: {
//         type: 'TextView',
//         configuration: {},
//         path: 'views/view3.json',
//         // TODO : it is broken? probably not a good a idea to use absolute path in test code :o/
//         absolutePath: '/path/to/test/test/testAs/views/view3.json'
//       },
//     },
//     timebars: {
//       1234: {
//         extUpperBound: 1420107500000,
//         id: 'tb1',
//         masterId: 'Session 1',
//         playingState: 'pause',
//         rulerResolution: 11250,
//         rulerStart: 1420106400000,
//         slideWindow: {
//           lower: 1420106550000,
//           upper: 1420107150000
//         },
//         speed: 1,
//         visuWindow: {
//           current: 1420106460000,
//           defaultWidth: 900000,
//           lower: 1420106400000,
//           upper: 1420106700000,
//         },
//         timelines: ['tl1'],
//         mode: 'Normal'
//       }
//     },
//     timelines: {
//       tl1: {
//         color: null,
//         id: 'Session 1',
//         kind: 'Session',
//         offset: 0,
//         sessionId: 1
//       }
//     },
//     hsc: {
//       file: 'workspace1.json',
//       folder: '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/test/testWk',
//     }
//   });
//   it('showSelectedView', () => {
//     showSelectedView('myPageId').should.have.property('title', 'Title 1');
//   });
// });
