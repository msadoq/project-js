import _ from 'lodash/fp';
import sinon from 'sinon';
import rimraf from 'rimraf';
import { join } from 'path';
import { readFile } from 'fs';

import { MIME_TYPES } from '../constants';
import { getTmpPath, freezeMe } from '../common/jest';

import { saveWorkspace, saveWorkspaceAs } from './saveWorkspace';
import * as fmdApi from '../common/fmd';
import fs from '../common/fs';

const mockedCreateDocument = (path, documentType, cb) => {
  const mimeType = MIME_TYPES[documentType];
  if (!mimeType) {
    return cb(`Unknown documentType : ${documentType}`);
  }
  const oid = `oid:${fmdApi.getRelativeFmdPath(path)}`;
  return cb(null, oid);
};

const readJson = (path, cb) => {
  fs.read(path, (err, content) => {
    if (err) {
      return cb(err);
    }
    return cb(null, JSON.parse(content));
  });
};

describe('documentManager/saveWorkspace', () => {
  let stub;
  beforeAll(() => {
    stub = sinon.stub(fmdApi, 'createDocument').callsFake(mockedCreateDocument);
  });
  afterAll(() => {
    stub.restore();
  });
  let state;
  beforeEach(() => {
    state = freezeMe({
      windows: {
        win1: {
          focusedPage: 'page1',
          geometry: {
            h: 800,
            kind: 'Absolute',
            w: 1310,
            x: 110,
            y: 10,
          },
          pages: ['page1', 'page2'],
          title: 'window1',
        },
      },
      pages: {
        page1: {
          type: 'Page',
          title: 'Page 1',
          timebarUuid: 'abcd',
          oId: 'oid:/testPlot.json',
        },
        page2: {
          type: 'Page',
          title: 'Page 2',
          timebarUuid: 'abcd',
          path: 'testText.json',
        },
      },
      timebars: {
        abcd: {
          uuid: 'abcd',
          id: 'tb1',
          masterId: 'Session 1',
          rulerResolution: 11250,
          rulerStart: 1420106400000,
          slideWindow: {
            lower: 1420106550000,
            upper: 1420107150000,
          },
          speed: 1,
          visuWindow: {
            current: 1420106460000,
            defaultWidth: 900000,
            lower: 1420106400000,
            upper: 1420106700000,
          },
          timelines: ['tl1', 'tl2'],
          mode: 'Normal',
        },
      },
      timelines: {
        tl1: {
          color: null,
          id: 'Session 1',
          kind: 'Session',
          offset: 0,
          sessionName: 'session1',
        },
        tl2: {
          color: null,
          id: 'Session 2',
          kind: 'Session',
          offset: 0,
          sessionName: 'session1',
        },
      },
      timebarTimelines: {
        abcd: ['tl1', 'tl2'],
      },
      hsc:
      {
        file: 'workspace1.json',
        folder: getTmpPath('testWk'),
      },
    });
  });
  const folder = getTmpPath('testAs');

  afterEach((done) => {
    rimraf(getTmpPath(), done);
  });

  describe('saveWorkspace', () => {
    test('saves', (done) => {
      const path = join(state.hsc.folder, state.hsc.file);
      saveWorkspace(state, (err) => {
        expect(err).not.toBeAnError();
        fs.isExists(path, (exist) => {
          expect(exist).toBe(true);
          done();
        });
      });
    });

    test('saves correct content', (done) => {
      const path = join(state.hsc.folder, state.hsc.file);
      saveWorkspace(state, () => {
        readJson(path, (err, content) => {
          expect(content).toMatchSnapshot();
          done();
        });
      });
    });

    test('fails when validate', (done) => {
      const modifiedState = _.unset('timebars.abcd.mode', state);
      const path = join(modifiedState.hsc.folder, modifiedState.hsc.file);
      saveWorkspace(modifiedState, (err) => {
        expect(err).toBeAnError();
        fs.isExists(path, (exist) => {
          expect(exist).toBe(false);
          done();
        });
      });
    });

    test('fails when cannot get path from workspace', (done) => {
      saveWorkspace({ hsc: {} }, (err) => {
        expect(err).toBeAnError();
        done();
      });
    });
  });

  describe('saveWorkspaceAs', () => {
    test('saves', (done) => {
      const path = join(folder, 'workspace.json');
      saveWorkspaceAs(state, path, (err) => {
        expect(err).not.toBeAnError();
        readFile(path, 'utf8', (errorReading, content) => {
          expect(errorReading).not.toBeAnError();
          expect(content).toMatchSnapshot();
          done();
        });
      });
    });

    test('fails when createFolder', (done) => {
      saveWorkspaceAs(state, '/unknown/document.json', (err) => {
        expect(err).toBeAnError();
        done();
      });
    });

    test('fails when writeDocument', (done) => {
      saveWorkspaceAs(state, '/', (err) => {
        expect(err).toBeAnError();
        done();
      });
    });
  });
});
