import { exec } from 'child_process';
import { join } from 'path';

import mimeTypes from 'common/constants/mimeTypes';
import { should, getTmpPath, freezeMe, applyDependencyToApi } from '../common/test';

import SaveWorkspace from './saveWorkspace';
import fmdApi from '../common/fmd';
import validation from './validation';
import { readDocument } from './io';

const mockFmdApi = fmd => ({
  ...fmd,
  createDocument: (path, documentType, cb) => {
    const mimeType = mimeTypes[documentType];
    if (!mimeType) {
      return cb(`Unknown documentType : ${documentType}`);
    }
    const oid = `oid:${fmd.getRelativeFmdPath(path)}`;
    return cb(null, oid);
  },
});

const mockedFmdApi = mockFmdApi(fmdApi);

const { saveWorkspace, saveWorkspaceAs } = applyDependencyToApi(SaveWorkspace, mockedFmdApi);

describe('documentManager/saveWorkspace', () => {
  const state = {
    windows: {
      win1: {
        debug: {
          timebarVisibility: true,
          whyDidYouUpdate: false
        },
        focusedPage: 'page1',
        geometry: {
          h: 800,
          kind: 'Absolute',
          w: 1310,
          x: 110,
          y: 10,
        },
        pages: ['page1', 'page2'],
        title: 'window1'
      },
    },
    pages: {
      page1: { timebarUuid: 1234, oId: 'oid:/testPlot.json' },
      page2: { timebarUuid: 1234, path: 'testText.json' }
    },
    timebars: {
      1234: {
        extUpperBound: 1420107500000,
        id: 'tb1',
        masterId: 'Session 1',
        rulerResolution: 11250,
        rulerStart: 1420106400000,
        slideWindow: {
          lower: 1420106550000,
          upper: 1420107150000
        },
        speed: 1,
        visuWindow: {
          current: 1420106460000,
          defaultWidth: 900000,
          lower: 1420106400000,
          upper: 1420106700000,
        },
        timelines: ['tl1', 'tl2'],
        mode: 'Normal'
      }
    },
    timelines: {
      tl1: {
        color: null,
        id: 'Session 1',
        kind: 'Session',
        offset: 0,
        sessionId: 1
      },
      tl2: {
        color: null,
        id: 'Session 2',
        kind: 'Session',
        offset: 0,
        sessionId: 1
      }
    },
    hsc:
    {
      file: 'workspace1.json',
      folder: getTmpPath('testWk'),
    }
  };
  const folder = getTmpPath('testAs');

  after((done) => {
    exec('rm -r '.concat(getTmpPath()), () => {
      // your callback goes here
      done();
    });
  });
  it('saveAs ok', (done) => {
    const path = join(folder, 'workspace.json');
    saveWorkspaceAs(freezeMe(state), path, true, (err, windows) => {
      should.not.exist(err);
      windows.should.have.length(1);
      done();
    });
  });
  it('check validity of new workspace', (done) => {
    readDocument(mockedFmdApi)(folder, 'workspace.json', undefined, undefined,
      (err, wkContent) => {
        should.not.exist(err);
        const validationError = validation('workspace', wkContent);
        should.not.exist(validationError);
        done();
      });
  });
  it('save ok', (done) => {
    should.not.exist(saveWorkspace(freezeMe(state), true, (err, windows) => {
      should.not.exist(err);
      windows.should.have.length(1);
      done();
    }));
  });
  it('check validity of new workspace', (done) => {
    readDocument(mockedFmdApi)(
      state.hsc.folder,
      state.hsc.file,
      undefined,
      undefined,
      (err, wkContent) => {
        should.not.exist(err);
        const validationError = validation('workspace', wkContent);
        should.not.exist(validationError);
        done();
      }
    );
  });
});
