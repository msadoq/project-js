const {
  postApiRequest,
  shouldBeApiError,
} = require('../../../lib/utils/test');
const pathApi = require('path');

const reqPathWksp = pathApi.join(__dirname, '../../schemaManager/examples/WS.example.json');
const reqPathInvalid =
pathApi.join(__dirname, '../../schemaManager/examples/WS.example.jsons');
const reqOIdWksp = 'oId_to_test';
const file =
pathApi.join(__dirname, '../../schemaManager/examples/TV.example.mis.json');

describe('POST API workspaces', () => {
  describe('success', () => {
    it('path valid', done => {
      postApiRequest('/api/documents/workspaces', { path: reqPathWksp })
        .expect(res => {
          const body = res.body;
          // console.log(body);
          body.should.be.an('object').and.have.property('data').that.is.an('object');
          body.data.should.have.property('path', reqPathWksp || 'oId', reqOIdWksp);
          body.data.should.have.property('content');
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
      postApiRequest('/api/documents/workspaces', { path: reqPathWksp, oId: reqOIdWksp })
        .expect(shouldBeApiError(400, 'path OR oId is required (not both)', '/body'))
        .expect(400, done);
    });
  });

  describe('file system and read json', () => {
    describe.only('error fs', () => {
      it('no access to this file : file don\'t exist', done => {
        postApiRequest('/api/documents/workspaces',
      { path: '/foo/bar' })
        .expect(shouldBeApiError(400, 'no access to this file : file don\'t exist', '/body'))
        .expect(400, done);
      });
      it('no access to this file: invalid path', done => {
        postApiRequest('/api/documents/workspaces',
      { path: '/TV.example.json' })
        .expect(shouldBeApiError(400, 'no access to this file: invalid path', '/body'))
        .expect(400, done);
      });
    });
    describe('file readable / not readable', () => {
      it('file not readable', done => {
        postApiRequest('/api/documents/workspaces',
      { path: pathApi.join(__dirname, '../../routes/test/fileNotReadable') })
        .expect(shouldBeApiError(400, 'no access to this file', '/body'))
        .expect(400, done);
      });
      it('bad content', done => {
        postApiRequest('/api/documents/workspaces',
          { path: pathApi.join(__dirname, '../../lib/schemaManager/examples/WS.example.json'),
           content: 'tintin' })
          .expect(shouldBeApiError(400, 'content of file not correct', '/body/content'))
          .expect(400, done);
      });
    });
  });
  // describe('checks if workspace contains Page', done => {
  //   it('no page', () => {
  //     postApiRequest('/api/documents/workspaces',
  //         { path: reqPathWksp, view: { path: badPath } })
  //         .expect(shouldBeApiError(400, 'page doesnt exist for this workspace', '/body'))
  //         .expect(400, done);
  //   });
  //   it('page exist', () => {
  //     postApiRequest('/api/documents/workspaces',
  //         { path: reqPathWksp, view: { path: reqPathPage } })
  //         .expect(shouldBeApiError(400, 'Plotview found for this workspace', '/body'))
  //         .expect(400, done);
  //   });
  // });
});
