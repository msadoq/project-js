// const {
//   postApiRequest,
//   shouldBeApiError,
// } = require('../../lib/utils/test');
// const pathApi = require('path');
//
// const reqPathOkPV = pathApi.join(__dirname, '../../lib/schemaManager/examples/PV.example.json');
// const reqPathOkTV = pathApi.join(__dirname, '../../lib/schemaManager/examples/TV.example.json');
// const reqOIdOk = 'oId_to_test';
// const kind = 'Relative';
//
// describe('POST API pages', () => {
//   describe('success', done => {
//     const fixture = {
//       hideBorders:  false,
//         views: [
//         {
//           oId: reqOIdOk,
//           geometry:   [
//             kind: kind,
//               x: 5
//               y: 5
//               w: 45
//               h: 50
//           ],
//           windowState: 'Normalized',
//         },
//       ],
//     };
//     it('call', done => {
//       postApiRequest('/api/documents/pages', fixture)
//         .expect(res => {
//           const body = res.body;
//           body.should.be.an('object').and.have.property('data').that.is.an('object');
//           body.data.should.have.property('views');
//         })
//         .expect(200, done);
//     });
//   });
//   describe('error params', () => {
//     it('no parameter', done => {
//       postApiRequest('/api/documents/pages', {})
//         .expect(shouldBeApiError(400, 'path or oId required', '/body'))
//         .expect(400, done);
//     });
//     it('path + oId not allowed', done => {
//       postApiRequest('/api/documents/pages', { path: '', oId: '' })
//         .expect(shouldBeApiError(400, 'path OR oId is required (not both)', '/body'))
//         .expect(400, done);
//     });
//     it('hideBorders required', done => {
//       postApiRequest('/api/documents/pages', { path: reqPathOkPV })
//         .expect(shouldBeApiError(400, 'hideBorders required', '/body/hideBorders'))
//         .expect(400, done);
//     });
//     it('hideBorders is to TRUE', done => {
//       postApiRequest('/api/documents/pages', { path: reqPathOkPV, hideBorders: true })
//         .expect(shouldBeApiError(400, 'hideBorders have to be false', '/body/hideBorders'))
//         .expect(400, done);
//     });
//     it('bad type for hideBorders', done => {
//       postApiRequest('/api/documents/pages', { path: reqPathOkPV, hideBorders: 5 })
//         .expect(shouldBeApiError(400, 'bad type for hideBorders', '/body/hideBorders'))
//         .expect(400, done);
//     });
//   });
// });
