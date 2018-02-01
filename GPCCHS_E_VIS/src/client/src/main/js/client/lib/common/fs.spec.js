// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 09/02/2017 : Replace some console uses by new Console
// VERSION : 1.1.2 : FA : #5316 : 09/02/2017 : Revert "Replace some console uses by new Console"
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Move readJsonFromFmdPath function in documentManager/io
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Refacto common/fs, add common/pathResolver, impact documentManager/io
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Remove useless checkPath in common/fs
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Refacto common/fs, add common/pathResolver, impact documentManager/io
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Remove useless checkPath in common/fs
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for mocha .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

import { join } from 'path';
import rimraf from 'rimraf';
import {
  mkdirSync,
  writeFileSync,
  accessSync,
  constants,
  chmodSync,
} from 'fs';

import { getTmpPath } from '../common/jest';
import fs from './fs';

describe('common/fs', () => {
  const tmpFolder = getTmpPath();
  const file = fs.resolve(tmpFolder, '/foo.txt');
  const json = fs.resolve(tmpFolder, '/foo.json');
  const unreadable = fs.resolve(tmpFolder, '/unreadable.txt');
  const notExists = fs.resolve(tmpFolder, '/not-exists.txt');
  const unavailableFolder = fs.resolve(tmpFolder, '/unavailableFolder');
  beforeAll(() => {
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
  afterAll((done) => {
    rimraf(tmpFolder, done);
  });

  test('resolve', () => {
    expect(fs.resolve('/foo/bar', '/baz/file.json')).toBe('/foo/bar/baz/file.json');
    expect(fs.resolve('/foo/bar', 'file.json')).toBe('/foo/bar/file.json');
  });

  describe('isExists', () => {
    test('file exists', (done) => {
      fs.isExists(file, (exists) => {
        expect(exists).toBe(true);
        done();
      });
    });
    test('file not exists', (done) => {
      fs.isExists(notExists, (exists) => {
        expect(exists).toBe(false);
        done();
      });
    });
  });

  describe('isReadable', () => {
    test('readable', (done) => {
      fs.isReadable(file, (readable) => {
        expect(readable).toBe(true);
        done();
      });
    });
    test('not readable', (done) => {
      fs.isReadable(unreadable, (readable) => {
        expect(readable).toBe(false);
        done();
      });
    });
  });

  describe('read', () => {
    test('works', (done) => {
      fs.read(file, (err, content) => {
        expect(err).toBeFalsy();
        expect(content).toBe('my content');
        done();
      });
    });
    test('error', (done) => {
      fs.read(unreadable, (err, content) => {
        expect(err).toBeInstanceOf(Error);
        expect(content).toBeFalsy();
        done();
      });
    });
  });

  describe('parse', () => {
    test('valid', (done) => {
      fs.parse('{"foo":"bar"}', (err, content) => {
        expect(err).toBeFalsy();
        expect(content).toEqual({ foo: 'bar' });
        done();
      });
    });
    test('invalid', (done) => {
      fs.parse('"{"foo":"bar""', (err, content) => {
        expect(err).toBeInstanceOf(Error);
        expect(content).toBeFalsy();
        done();
      });
    });
  });

  describe('createFolder', () => {
    test('folder already exists', (done) => {
      fs.createFolder('/', (err, res) => {
        expect(err).toBeFalsy();
        expect(res).toBe(true);
        done();
      });
    });
    test('folder does not exists', (done) => {
      const path = join(tmpFolder, 'a/b/c/d');
      return fs.createFolder(path, (err, res) => {
        expect(res).toBe(true);
        fs.isExists(path, (exist) => {
          expect(exist).toBe(true);
          done();
        });
      });
    });
    test('fails when cannot mkdirp', (done) => {
      const path = join(unavailableFolder, 'a/b/c/d');
      return fs.createFolder(path, (err, res) => {
        expect(err).toBeInstanceOf(Error);
        expect(res).toBeFalsy();
        fs.isExists(path, (exist) => {
          expect(exist).toBe(false);
          done();
        });
      });
    });
  });
});
