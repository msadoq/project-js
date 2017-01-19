import { join } from 'path';
import {
  mkdirSync,
  writeFileSync,
  rmdirSync,
  unlinkSync,
  accessSync,
  constants,
  chmodSync
} from 'fs';

import { should, expect, getTmpPath } from '../common/test';
import fmd from './fmd';

describe('common/fmd', () => {
  const folder = getTmpPath();
  const txtFile = join(folder, '/foo.txt');
  const json = join(folder, '/foo.json');
  const unreadable = join(folder, '/unreadable.txt');
  const notExists = join(folder, '/not-exists.txt');
  before(() => {
    try {
      accessSync(folder, constants.F_OK);
    } catch (e) {
      mkdirSync(folder);
    }
    try {
      accessSync(txtFile, constants.F_OK);
    } catch (e) {
      writeFileSync(txtFile, 'my content');
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
  });
  after(() => {
    try {
      unlinkSync(txtFile);
      unlinkSync(json);
      chmodSync(unreadable, 777);
      unlinkSync(unreadable);
      rmdirSync(folder);
    } catch (e) {
      console.warn(e); // eslint-disable-line no-console
    }
  });

  describe('readJson', () => {
    it('works with relativePath and folder', (done) => {
      fmd.readJson(folder, 'foo.json', undefined, undefined, (err, content) => {
        should.not.exist(err);
        content.should.eql({ foo: 'bar' });
        done();
      });
    });
    it('works with only relativePath', (done) => {
      // you can found '/text1.json' in lib/documentManager/fixtures
      fmd.readJson(undefined, '/text1.json', undefined, undefined, (err, content) => {
        should.exist(content);
        should.not.exist(err);
        done();
      });
    });
    it('works with absolutePath', (done) => {
      fmd.readJson(undefined, undefined, undefined, json, (err, content) => {
        should.not.exist(err);
        content.should.eql({ foo: 'bar' });
        done();
      });
    });
    // it('works with oid', (done) => {
    //   const oid = `oid:${json}`;
    //   fmd.readJson(undefined, undefined, oid, undefined, (err, content) => {
    //     should.not.exist(err);
    //     content.should.eql({ foo: 'bar' });
    //     done();
    //   });
    // });
    it('fail with bad file format', (done) => {
      fmd.readJson(undefined, undefined, undefined, txtFile, (err, content) => {
        expect(content).to.be.an('undefined');
        should.exist(err);
        done();
      });
    });
    it('fail with unreadable file', (done) => {
      fmd.readJson(undefined, undefined, undefined, unreadable, (err, content) => {
        expect(content).to.be.an('undefined');
        should.exist(err);
        done();
      });
    });
    it('fail with absent file', (done) => {
      fmd.readJson(undefined, undefined, undefined, notExists, (err, content) => {
        expect(content).to.be.an('undefined');
        should.exist(err);
        done();
      });
    });
  });

  // describe('writeJson', (done) => {
  //   done();
  // });
});
