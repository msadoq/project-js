// import { getStore } from '../common/test';
// import decorate from './decorateView';
//
// describe('connectedData/decorateView', () => {
//   it('valid', () => {
//     const { getState } = getStore({
//       domains: [
//         { domainId: 'd1', name: 'cnes.isis.sat1' },
//         { domainId: 'd2', name: 'cnes.isis.sat2' },
//         { domainId: 'd3', name: 'cnes.isis.sat2.ion' },
//         { domainId: 'd4', name: 'cnes.isis.sat2.flak' },
//       ],
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
//     });
//     const decoratedData = decorate(getState(), [
//         { domain: 'cnes.isis.sat1', timebarId: 'tb1', timeline: 'TL1', formula: 'c.pn<co>.f', viewType: 'PlotView' },
//         { domain: 'cnes.isis.sat2', timebarId: 'tb2', timeline: 'TL2', formula: 'c2.pn2<co2>.f2', viewType: 'PlotView' },
//     ]);
//     decoratedData.should.be.an('object');
//     decoratedData.should.have.keys('c.pn<co>:s1:d1', 'c2.pn2<co2>:s2:d2');
//     decoratedData['c.pn<co>:s1:d1'].should.have.keys('localIds');
//     decoratedData['c.pn<co>:s1:d1'].localIds.should.have.keys('PlotView.f.0');
//     decoratedData['c.pn<co>:s1:d1'].localIds['PlotView.f.0'].should.have.keys('viewType', 'field', 'offset', 'dataId');
//     decoratedData['c2.pn2<co2>:s2:d2'].should.have.keys('localIds');
//     decoratedData['c2.pn2<co2>:s2:d2'].localIds.should.have.keys('PlotView.f2.10');
//     decoratedData['c2.pn2<co2>:s2:d2'].localIds['PlotView.f2.10'].should.have.keys('viewType', 'field', 'offset', 'dataId');
//   });
// });
