const {
  postApiRequest,
  shouldBeApiError,
} = require('../../lib/utils/test');

describe('workspaces', () => {
  describe('success', () => {
    it('nominal', done => {
      postApiRequest('/api/documents/workspaces', { path: 'path_to_test' })
        .expect(res => {
          const body = res.body;
          body.should.be.an('object').and.have.property('data').that.is.an('object');
          body.data.should.have.properties({
            path: 'path_to_test',
            content: 'my ws file content',
          });
        })
        .expect(200, done);
    });
  });
  describe('error', () => {
    it('no parameter', done => {
      postApiRequest('/api/documents/workspaces', {})
        .expect(shouldBeApiError(400, 'path or oId required', '/body'))
        .expect(400, done);
    });
  });
});
