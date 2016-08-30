const {
  postApiRequest,
  shouldBeApiError,
} = require('../../lib/utils/test');
const pathApi = require('path');

const reqPathOk = pathApi.join(__dirname, '../../lib/schemaManager/examples/WS.example.json');
const reqOIdOk = 'oId_to_test';

describe('POST API workspaces', () => {
  describe('success', done => {
    it('path valid', () => {
      postApiRequest('/api/documents/workspaces', { path: reqPathOk })
        .expect(res => {
          const body = res.body;
          body.should.be.an('object').and.have.property('data').that.is.an('object');
          body.data.should.have.property({ path: reqPathOk });
        });
    });
        // console.log('CA PASSE?');
    it('oId valid', () => {
      postApiRequest('/api/documents/workspaces', { oId: reqOIdOk })
      .expect(res => {
        const body = res.body;
        body.should.be.an('object').and.have.properties('data').that.is.an('object');
        body.data.should.have.property({ oId: reqOIdOk });
      })
      .expect(200, done);
    });
  });
  describe('error params', () => {
    it('no parameter', done => {
      postApiRequest('/api/documents/workspaces', {})
        .expect(shouldBeApiError(400, 'path or oId required', '/body'))
        .expect(400, done);
    });
    it('path + oId not allowed', done => {
      postApiRequest('/api/documents/workspaces', { path: '', oId: '' })
        .expect(shouldBeApiError(400, 'path OR oId is required (not both)', '/body'))
        .expect(400, done);
    });
  });

  describe('error fs', () => {
    it('no access to this file', done => {
      postApiRequest('/api/documents/workspaces',
    { path: '/foo/bar' })
      .expect(shouldBeApiError(400, 'no access to this file', '/body'))
      .expect(400, done);
    });
    it('file not readable', done => {
      postApiRequest('/api/documents/workspaces',
    { path: pathApi.join(__dirname, '../test/fileNotReadable') })
      .expect(shouldBeApiError(400, 'no access to this file', '/body'))
      .expect(400, done);
    });
  });
  describe('if file readable', done => {
    it('bad content', () => {
      postApiRequest('/api/documents/workspaces',
        { path: pathApi.join(__dirname, '../../lib/schemaManager/examples/WS.example.json'),
         content: 'tintin' })
        .expect(shouldBeApiError(400, 'content of file not correct', '/body/content'))
        .expect(400, done);
    });
  });
});
