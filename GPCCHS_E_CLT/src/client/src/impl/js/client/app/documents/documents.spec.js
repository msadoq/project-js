const documents = require('./index');

const pathTestFMD = '/data/work/gitRepositories/LPISIS/GPCCHS/' +
  'GPCCHS_E_CLT/src/client/src/impl/js/client/data/' +
  'dev.workspace.json';

describe('functions documents/index', () => {
  describe('function < resolve >', () => {
    it('correct path', () => {
      const pathReturn = documents.resolve('dev.workspace.json');
      pathReturn.should.equal(pathTestFMD);
    });
  });
  describe('function < isExists >', () => {
    it('isExists: true', done => {
      documents.isExists(documents.resolve('dev.workspace.json'), exists => {
        exists.should.equal(true);
        done();
      });
    });
    it('isExists: false', done => {
      documents.isExists(documents.resolve('dev.workspace1.json'), exists => {
        exists.should.equal(false);
        done();
      });
    });
  });
  describe('function < isReadable >', () => {
    it('isReadable: true', done => {
      documents.isReadable(documents.resolve('dev.workspace.json'), readable => {
        readable.should.equal(true);
        done();
      })
    });
    it('isReadable: false', done => {
      documents.isReadable(documents.resolve('dev.workspace0.json'), readable => {
        readable.should.equal(false);
        done();
      })
    });
  });
  // describe('function < read >', () => {
  //   it('readToFile works', done => {
  //     documents.read(readToFile => {
  //       readToFile.should.equal(documents.resolve('dev.workspace.json'));
  //       readToFile.should.equal(documents.isExists(true));
  //       readToFile.should.equal(documents.isReadable(true));
  //       readToFile.should.be.an('object').and.have.property('data').that.is.an('object');
  //       readToFile.data.should.have.property('content');
  //       done();
  //     })
  //   });

  // });
});
