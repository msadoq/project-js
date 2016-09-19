const documents = require('../documents');
const {
  should
} = require('../utils/test');

const pathTestFMD = '/data/work/gitRepositories/LPISIS/GPCCHS/' +
  'GPCCHS_E_CLT/src/client/src/impl/js/client/app/documents/features/' +
  'dev.workspace.json';

describe('functions documents/index', () => {
  it('function < resolve >', () => {
    const pathReturn = documents.resolve(__dirname, 'features/dev.workspace.json');
    pathReturn.should.equal(pathTestFMD);
  });
  const pathOk = documents.resolve(__dirname, 'features/dev.workspace.json');
  const pathNok = documents.resolve(__dirname, 'features/dev.workspace0.json');
  describe('function < isExists >', () => {
    it('isExists: true', done => {
      documents.isExists(pathOk, exists => {
        exists.should.equal(true);
        done();
      });
    });
    it('isExists: false', done => {
      documents.isExists(pathNok, exists => {
        exists.should.equal(false);
        done();
      });
    });
  });
  describe('function < isReadable >', () => {
    it('isReadable: true', done => {
      documents.isReadable(pathOk, readable => {
        readable.should.equal(true);
        done();
      });
    });
    it('isReadable: false', done => {
      documents.isReadable(pathNok, readable => {
        readable.should.equal(false);
        done();
      });
    });
  });
  describe('function < read >', () => {
    it('readToFile works', done => {
      documents.read(pathOk, (err, content) => {
        should.not.exist(err);
        should.exist(content);
        done();
      });
    });

    it('readToFile error', done => {
      documents.read(pathNok, (err, content) => {
        should.exist(err);
        should.not.exist(content);
        done();
      });
    });
  });
  describe('function < parse >', () => {
    it('parseContent OK', done => {
      documents.parse(pathOk, content => {
        should.exist(content);
        done();
      });
    });
    it('parseContent err', done => {
      documents.parse(pathNok, e => {
        should.exist(e);
        done();
      });
    });
  });
  describe('function < readJsonFromPath >', () => {
    it('function works', done => {
      documents.readJsonFromPath(__dirname, 'features/dev.workspace.json', (err, content) => {
        should.not.exist(err);
        should.exist(content);
        content.should.have.all.keys(['type', 'timeBarWindow', 'windows']);
        content.timeBarWindow.should.be.an('object');
        content.windows.should.be.an('array');
        done();
      });
    });
    it('readJsonFromPath error', done => {
      documents.readJsonFromPath(__dirname, 'features/dev.workspace0.json', (err, content) => {
        should.exist(err);
        should.not.exist(content);
        done();
      });
    });
  });
});
