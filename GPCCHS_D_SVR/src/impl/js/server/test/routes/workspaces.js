const {
  postApiRequest,
  shouldBeApiError,
} = require('../../lib/utils/test');

describe('POST API workspaces', () => {
  describe('success', () => {
    it('nominal', done => {
      postApiRequest('/api/documents/workspaces', { path: 'path_to_test', oId: 'oId_to_test'})
        .expect(res => {
          const body = res.body;
          body.should.be.an('object').and.have.property('data').that.is.an('object');
          body.data.should.have.property({
            path: 'path_to_test',
            oId: 'oId_to_test'
          });
        })
        .expect(200, done);
    });
  });
  describe('error params', () => {
    it('no parameter', done => {
      postApiRequest('/api/documents/workspaces', {})
        .expect(shouldBeApiError(400, 'path or oId required', '/body'))
        .expect(400, done);
    }),
     it('path + oId not allowed', done => {
      postApiRequest('/api/documents/workspaces', { path: 'path_to_test', oId: 'oId_to_test' })
        .expect(shouldBeApiError(400, 'path OR oId is required (not both)', '/body'))
        .expect(400, done);
    }),
    it('path invalid', done => {
      postApiRequest('/api/documents/workspaces', { path: ''})
        .expect(shouldBeApiError(400, 'path invalid', '/body/path'))
        .expect(400, done);
    }),
    it('oId invalid', done => {
      postApiRequest('/api/documents/workspaces', { oId: ''})
        .expect(shouldBeApiError(400, 'oId invalid', '/body/oId'))
        .expect(400, done);
    });
  });
  describe('error fs', () => {
   it('no parameter', done => {
      postApiRequest('/api/documents/workspaces', {})
        .expect(shouldBeApiError(400, 'path or oId required', '/body'))
        .expect(400, done);
   }),
    it('no existing file', done => {
      postApiRequest('/api/documents/workspaces', { data: req.body.fileExist})
        .expect(shouldBeApiError(400, 'no existing file', '/body'))
        .expect(400, done);
  }),
     it('no access to this file', done => {
      postApiRequest('/api/documents/workspaces', { data: req.body.accessFile})
        .expect(shouldBeApiError(400, 'no access to this file', '/body'))
        .expect(400, done);
  }),
    it('can/t read this file', done => {
      postApiRequest('/api/documents/workspaces', {})
        .expect(shouldBeApiError(400, 'can/t read this file', '/body'))
        .expect(400, done);
 });
});

});
