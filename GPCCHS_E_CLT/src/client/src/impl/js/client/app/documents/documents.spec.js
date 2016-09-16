const documents = require('./index');
const {
  should
} = require('../utils/test');

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
      });
    });
    it('isReadable: false', done => {
      documents.isReadable(documents.resolve('dev.workspace0.json'), readable => {
        readable.should.equal(false);
        done();
      });
    });
  });
  describe('function < read >', () => {
    it('readToFile works', done => {
      documents.read(documents.resolve('dev.workspace.json'), (err, content) => {
        should.not.exist(err);
        should.exist(content);

        done();
      });
    });

    it('readToFile error', done => {
      documents.read(documents.resolve('dev.workspace0.json'), (err, content) => {
        should.exist(err);
        should.not.exist(content);
        done();
      });
    });
  });
  describe('function < parse >', () => {
    it('parseContent OK', done => {
      documents.parse(documents.resolve('dev.workspace.json'), content => {
        should.exist(content);
        done();
      });
    });
    it('parseContent err', done => {
      documents.parse(documents.resolve('dev.workspace.json'), e => {
        should.exist(e);
        done();
      });
    });
  });
  describe('function < readJsonFromPath >', () => {
    it('function works', done => {
      documents.readJsonFromPath('dev.workspace.json', (err, content) => {
        should.not.exist(err);
        should.exist(content);
        content.should.have.all.keys(['type', 'timeBarWindow', 'windows']);
        content.timeBarWindow.should.be.an('object');
        content.windows.should.be.an('array');
        done();
      });
    });
    it('readJsonFromPath error', done => {
      documents.readJsonFromPath('dev.workspace.json', (err, content) => {
        should.exist(err);
        should.not.exist(content);
        done();
      });
    });
  });
});
