/* eslint-disable no-unused-expressions */
import { join } from 'path';
import rimraf from 'rimraf';
import {
  mkdirSync,
  writeFileSync,
  accessSync,
  constants,
  chmodSync,
} from 'fs';

import { should, getTmpPath } from '../common/test';
import fs from './fs';

describe('common/fs', () => {
  const tmpFolder = getTmpPath();
  const file = fs.resolve(tmpFolder, '/foo.txt');
  const json = fs.resolve(tmpFolder, '/foo.json');
  const unreadable = fs.resolve(tmpFolder, '/unreadable.txt');
  const notExists = fs.resolve(tmpFolder, '/not-exists.txt');
  const unavailableFolder = fs.resolve(tmpFolder, '/unavailableFolder');
  before(() => {
    try {
      accessSync(tmpFolder, constants.F_OK);
    } catch (e) {
      mkdirSync(tmpFolder);
    }
    try {
      accessSync(file, constants.F_OK);
    } catch (e) {
      writeFileSync(file, 'my content');
    }
    try {
      accessSync(json, constants.F_OK);
    } catch (e) {
      writeFileSync(json, '{"foo":"bar"}');
    }
    try {
      accessSync(unreadable, constants.F_OK);
    } catch (e) {
      writeFileSync(unreadable, 'my content');
      chmodSync(unreadable, 0);
    }
    try {
      accessSync(unavailableFolder, constants.F_OK);
    } catch (e) {
      mkdirSync(unavailableFolder);
      chmodSync(unavailableFolder, 0);
    }
  });
  after((done) => {
    rimraf(tmpFolder, done);
  });

  it('resolve', () => {
    fs.resolve('/foo/bar', '/baz/file.json').should.equal('/foo/bar/baz/file.json');
    fs.resolve('/foo/bar', 'file.json').should.equal('/foo/bar/file.json');
  });

  describe('isExists', () => {
    it('file exists', (done) => {
      fs.isExists(file, (exists) => {
        exists.should.equal(true);
        done();
      });
    });
    it('file not exists', (done) => {
      fs.isExists(notExists, (exists) => {
        exists.should.equal(false);
        done();
      });
    });
  });

  describe('isReadable', () => {
    it('readable', (done) => {
      fs.isReadable(file, (readable) => {
        readable.should.equal(true);
        done();
      });
    });
    it('not readable', (done) => {
      fs.isReadable(unreadable, (readable) => {
        readable.should.equal(false);
        done();
      });
    });
  });

  describe('read', () => {
    it('works', (done) => {
      fs.read(file, (err, content) => {
        should.not.exist(err);
        content.should.equal('my content');
        done();
      });
    });
    it('error', (done) => {
      fs.read(unreadable, (err, content) => {
        err.should.be.an('error');
        should.not.exist(content);
        done();
      });
    });
  });

  describe('parse', () => {
    it('valid', (done) => {
      fs.parse('{"foo":"bar"}', (err, content) => {
        should.not.exist(err);
        content.should.eql({ foo: 'bar' });
        done();
      });
    });
    it('invalid', (done) => {
      fs.parse('"{"foo":"bar""', (err, content) => {
        err.should.be.an('error');
        should.not.exist(content);
        done();
      });
    });
  });

  describe('readJsonFromAbsPath', () => {
    it('works', (done) => {
      fs.readJsonFromAbsPath(getTmpPath('foo.json'), (err, content) => {
        should.not.exist(err);
        content.should.eql({ foo: 'bar' });
        done();
      });
    });
    it('readJsonFromAbsPath error', (done) => {
      fs.readJsonFromAbsPath(getTmpPath('not-exists.txt'), (err, content) => {
        err.should.be.an('error');
        should.not.exist(content);
        done();
      });
    });
  });

  describe('readJsonFromRelativePath', () => {
    it('works', (done) => {
      fs.readJsonFromRelativePath(getTmpPath(), 'foo.json', (err, content) => {
        should.not.exist(err);
        content.should.eql({ foo: 'bar' });
        done();
      });
    });
    it('readJsonFromRelativePath error', (done) => { // dc stub send oid as filepath
      fs.readJsonFromRelativePath(getTmpPath(), 'not-exists.txt', (err, content) => {
        err.should.be.an('error');
        should.not.exist(content);
        done();
      });
    });
  });

  describe('checkPath', () => {
    it('path exists', (done) => {
      fs.checkPath('/', (err, res) => {
        res.should.be.true;
        done();
      });
    });
    it('path does not exists', (done) => {
      fs.checkPath('/unknownPath', (err, res) => {
        res.should.be.false;
        done();
      });
    });
  });

  describe('createFolder', () => {
    it('folder already exists', (done) => {
      fs.createFolder('/', (err, res) => {
        should.not.exist(err);
        res.should.be.true;
        done();
      });
    });
    it('folder does not exists', (done) => {
      const path = join(tmpFolder, 'a/b/c/d');
      return fs.createFolder(path, (err, res) => {
        res.should.be.true;
        fs.isExists(path, (exist) => {
          exist.should.be.true;
          done();
        });
      });
    });
    it('fails when cannot mkdirp', (done) => {
      const path = join(unavailableFolder, 'a/b/c/d');
      return fs.createFolder(path, (err, res) => {
        err.should.be.an('error');
        should.not.exist(res);
        fs.isExists(path, (exist) => {
          exist.should.be.false;
          done();
        });
      });
    });
  });
});
