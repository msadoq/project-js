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
