const {
  postApiRequest,
  shouldBeApiError,
} = require('../../lib/utils/test');
const pathApi = require('path');

const reqPathPage = pathApi.join(__dirname, '../../lib/schemaManager/examples/PG.example.json');
const reqPathPV = pathApi.join(__dirname, '../../lib/schemaManager/examples/PV.example.json');
const reqPathTV = pathApi.join(__dirname, '../../lib/schemaManager/examples/TV.example.json');
const reqOIdPage = 'oId_to_test';
const badPath = 'zzz';


describe('POST API pages', () => {
  describe('success', done => {
    it('path valid PAGE ', () => {
      postApiRequest('/api/documents/pages', { path: reqPathPage })
        .expect(res => {
          const body = res.body;
          body.should.be.an('object').and.have.property('data').that.is.an('object');
          body.data.should.have.property({ path: reqPathPage });
        });
    });
    it('oId valid PAGE', () => {
      postApiRequest('/api/documents/pages', { oId: reqOIdPage })
        .expect(res => {
          const body = res.body;
          body.should.be.an('object').and.have.properties('data').that.is.an('object');
          body.data.should.have.property({ oId: reqOIdPage });
        });
    });
    it('path valid VIEW', () => {
      postApiRequest('/api/documents/pages', { path: reqPathPV })
        .expect(res => {
          const body = res.body;
          body.should.be.an('object').and.have.properties('data').that.is.an('object');
          body.data.should.have.property({ path: reqPathPV });
        })
        .expect(200, done);
    });
  });
  describe('error params', () => {
    it('no parameter', done => {
      postApiRequest('/api/documents/pages', {})
        .expect(shouldBeApiError(400, 'path or oId required', '/body'))
        .expect(400, done);
    });
    it('path + oId not allowed', done => {
      postApiRequest('/api/documents/pages', { path: '', oId: '' })
        .expect(shouldBeApiError(400, 'path OR oId is required (not both)', '/body'))
        .expect(400, done);
    });
  });
  describe('error fs', () => {
    it('no access to this file', done => {
      postApiRequest('/api/documents/pages', { path: '/foo/bar' })
        .expect(shouldBeApiError(400, 'no access to this file', '/body'))
        .expect(400, done);
    });
    it('file not readable', done => {
      postApiRequest('/api/documents/pages',
      { path: pathApi.join(__dirname, '../test/fileNotReadable') })
        .expect(shouldBeApiError(400, 'no access to this file', '/body'))
        .expect(400, done);
    });
  });
  describe('if file readable', done => {
    it('bad content', () => {
      postApiRequest('/api/documents/pages',
          { path: reqPathPage, content: 'tintin' })
          .expect(shouldBeApiError(400, 'content of file not correct', '/body/content'))
          .expect(400, done);
    });
  });
  describe('checks if Page contains View', done => {
    it('no view', () => {
      postApiRequest('/api/documents/pages',
          { path: reqPathPage, view: { path: badPath } })
          .expect(shouldBeApiError(400, 'view doesnt exist for this page', '/body'))
          .expect(400, done);
    });
    it('Plotview exist', () => {
      postApiRequest('/api/documents/pages',
          { path: reqPathPage, view: { path: reqPathPV } })
          .expect(shouldBeApiError(400, 'Plotview found for this page', '/body'))
          .expect(400, done);
    });
    it('Textview exist', () => {
      postApiRequest('/api/documents/pages',
          { path: reqPathPage, view: { path: reqPathTV } })
          .expect(shouldBeApiError(400, 'Textview found for this page', '/body'))
          .expect(400, done);
    });
  });
});
