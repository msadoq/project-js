// const {
//   postApiRequest,
//   shouldBeApiError,
// } = require('../../utils/test');
// const pathApi = require('path');
//
// const reqPathPage = pathApi.join(__dirname, '../../lib/schemaManager/examples/PG.example.json');
// const reqOIdPage = 'oId_to_test';
// // const badpath = pathApi.join(__dirname, '../../lib/schemaMana/er/examples/ERROR.example.json');
//
//
// describe('POST API pages', () => {
//   describe('success', done => {
//     it('path valid PAGE', () => {
//       postApiRequest('/api/documents/pages', { path: reqPathPage })
//         .expect(res => {
//           const body = res.body;
//           body.should.be.an('object').and.have.property('data').that.is.an('object');
//           body.data.should.have.property('path', reqPathPage || 'oId', reqOIdPage);
//           body.data.should.have.property('content');
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
//   //   it('invalid path', done => {
//   //     postApiRequest('/api/documents/pages', { path: })
//   //   })
//   });
//   describe('error fs', () => {
//     it('no access to this file', done => {
//       postApiRequest('/api/documents/pages', { path: '/foo/bar' })
//         .expect(shouldBeApiError(400, 'no access to this file', '/body'))
//         .expect(400, done);
//     });
//     it('file not readable', done => {
//       postApiRequest('/api/documents/pages',
//       { path: pathApi.join(__dirname, '../test/fileNotReadable') })
//         .expect(shouldBeApiError(400, 'no access to this file', '/body'))
//         .expect(400, done);
//     });
//   });
//   describe('if file readable', done => {
//     it('bad content', () => {
//       postApiRequest('/api/documents/pages',
//             { path: reqPathPage, content: 'tintin' })
//             .expect(shouldBeApiError(400, 'content of file not correct', '/body/content'))
//             .expect(400, done);
//     });
//   });
// });
