// const {
//   postApiRequest,
//   shouldBeApiError,
// } = require('../../utils/test');
// const pathApi = require('path');
//
// const reqPathPV = pathApi.join(__dirname, '../../lib/schemaManager/examples/PV.example.json');
// const reqPathTV = pathApi.join(__dirname, '../../lib/schemaManager/examples/TV.example.json');
// const reqOIdView = 'oId_to_test';
//
//
// describe('POST API views', () => {
//   describe('success', done => {
//     it('path valid VIEW ', () => {
//       postApiRequest('/api/documents/views', { path: reqPathPV } || { path: reqPathTV })
//         .expect(res => {
//           const body = res.body;
//           body.should.be.an('object').and.have.property('data').that.is.an('object');
//           body.data.should.have.property(('path', reqPathPV || reqPathTV) || 'oId', reqOIdView);
//           body.data.should.have.property('content');
//         })
//         .expect(200, done);
//     });
//   });
//
//   describe('error params', () => {
//     it('no parameter', done => {
//       postApiRequest('/api/documents/views', {})
//         .expect(shouldBeApiError(400, 'path or oId required', '/body'))
//         .expect(400, done);
//     });
//     it('path + oId not allowed', done => {
//       postApiRequest('/api/documents/views', { path: '', oId: '' })
//         .expect(shouldBeApiError(400, 'path OR oId is required (not both)', '/body'))
//         .expect(400, done);
//     });
//   });
//   describe('error fs', () => {
//     it('no access to this file', done => {
//       postApiRequest('/api/documents/views',
//       { path: '/foo/bar' })
//         .expect(shouldBeApiError(400, 'no access to this file', '/body'))
//         .expect(400, done);
//     });
//     it('file not readable', done => {
//       postApiRequest('/api/documents/views',
//       { path: pathApi.join(__dirname, '../test/fileNotReadable') })
//         .expect(shouldBeApiError(400, 'no access to this file', '/body'))
//         .expect(400, done);
//     });
//   });
//   // describe('if file readable', done => {
//   //   it('Plot view bad content', () => {
//   //     postApiRequest('/api/documents/views',
//   //         { path: pathApi.join(__dirname, '../../lib/schemaManager/examples/PV.example.json'),
//   //          content: 'tintin' })
//   //         .expect(shouldBeApiError(400, 'content of file not correct', '/body/content'))
//   //         .expect(400, done);
//   //   });
//     // it('Text view bad content', () => {
//     //   postApiRequest('/api/documents/views',
//     //       { path: pathApi.join(__dirname, '../../lib/schemaManager/examples/TV.example.json'),
//     //        content: 'tintin' })
//     //       .expect(shouldBeApiError(400, 'content of file not correct', '/body/content'))
//     //       .expect(400, done);
//     // });
//   // });
// });
