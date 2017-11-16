import { join } from 'path';
import rimraf from 'rimraf';
import { createDumpFolder, dumpBuffer } from './dumpBuffer';
import fs from '../../common/fs';

describe.skip('serverProcess/utils/dumpBuffer', () => {
  global.testConfig.DUMP_DIR = '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/dump';
  test('createDumpFolder in DUMP_DIR', (done) => {
    global.testConfig.DUMP = 'on';
    const dataId = { catalog: 'catalog', comObject: 'comObject2', parameterName: 'parameterName2' };
    createDumpFolder(dataId);
    const dir =
      join(global.testConfig.DUMP_DIR, dataId.catalog, dataId.comObject, dataId.parameterName);
    return fs.isExists(dir, (exists) => {
      expect(exists).toBe(true);
      rimraf(global.testConfig.DUMP_DIR, done);
    });
  });
  test('createDumpFolder no dataId', (done) => {
    global.testConfig.DUMP = 'on';
    createDumpFolder();
    return fs.isExists(global.testConfig.DUMP_DIR, (exists) => {
      expect(exists).toBe(false);
      done();
    });
  });
  test('createDumpFolder no parameterName', (done) => {
    global.testConfig.DUMP = 'on';
    const dataId = { catalog: 'catalog', comObject: 'comObject' };
    createDumpFolder(dataId);
    return fs.isExists(
      join(global.testConfig.DUMP_DIR, dataId.catalog, dataId.comObject),
      (exists) => {
        expect(exists).toBe(false);
        done();
      });
  });
  test('dumpBuffer on', (done) => {
    global.testConfig.DUMP = 'on';
    const dataId = { catalog: 'catalog', comObject: 'comObject3', parameterName: 'parameterName3' };
    const timestamp = 10002000;
    dumpBuffer(dataId, timestamp, 'My buffer');
    const path = join(global.testConfig.DUMP_DIR, dataId.catalog, dataId.comObject,
      dataId.parameterName, timestamp.toString());
    fs.read(path, (err, content) => {
      expect(err).toBeFalsy();
      expect(content).toEqual('My buffer');
      rimraf(global.testConfig.DUMP_DIR, done);
    });
  });
  test('dumpBuffer off', (done) => {
    global.testConfig.DUMP = 'off';
    const dataId = { catalog: 'catalog', comObject: 'comObject3', parameterName: 'parameterName3' };
    const timestamp = 10002000;
    dumpBuffer(dataId, timestamp, 'My buffer');
    const path = join(global.testConfig.DUMP_DIR, dataId.catalog, dataId.comObject,
      dataId.parameterName, timestamp.toString());
    fs.isExists(path, (exists) => {
      expect(exists).toBe(false);
      done();
    });
  });
});
