const {
  postApiRequest,
  shouldBeApiError,
} = require('../../lib/utils/test');
const pathApi = require('path');

const reqPathPage = pathApi.join(__dirname, '../../lib/schemaManager/examples/PG.example.json');
const reqPathPV = pathApi.join(__dirname, '../../lib/schemaManager/examples/PV.example.json');
const reqPathTV = pathApi.join(__dirname, '../../lib/schemaManager/examples/TV.example.json');
const reqOIdPage = 'oId_to_test';


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
      postApiRequest('/api/documents/workspaces', { oId: reqOIdPage })
        .expect(res => {
          const body = res.body;
          body.should.be.an('object').and.have.properties('data').that.is.an('object');
          body.data.should.have.property({ oId: reqOIdPage });
        });
    });
    it('path valid VIEW', () => {
      postApiRequest('/api/documents/workspaces', { path: reqPathPV })
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
});
