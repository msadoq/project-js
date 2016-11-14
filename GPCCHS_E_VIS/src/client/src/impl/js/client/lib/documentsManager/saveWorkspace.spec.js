const { saveWorkspace, saveWorkspaceAs } = require('./saveWorkspace');
const { expect } = require('chai');
const { join } = require('path');
const fs = require('../common/fs');
const validation = require('./validation');


describe('mainProcess/documents/workspace', () => {
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
      page1: { timebarId: 1234, path: 'testPlot.json' },
      page2: { timebarId: 1234, path: 'testText.json' }
    },
    timebars: {
      1234: {
        extUpperBound: 1420107500000,
        id: 'tb1',
        masterId: 'Session 1',
        playingState: 'pause',
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
    workspace:
    {
      file: 'workspace1.json',
      folder: '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/test/testWk',
    }
  };
  const folder = '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/test/testAs';

  it('saveAs ok', () => {
    const path = join(folder, 'workspace.json');
    expect(saveWorkspaceAs(state, path)).to.not.be.an('error');
  });
  it('check validity of new workspace', (done) => {
    fs.readJsonFromPath(folder, 'workspace.json', (err, wkContent) => {
      if (err) {
        console.log('readJsonFromPath', err);
      }
      expect(err).to.be.an('null');
      const validationError = validation('workspace', wkContent);
      if (validationError) {
        console.log('validation', validationError);
      }
      expect(validationError).to.be.an('undefined');
      done();
    });
  });
  it('save ok', () => {
    expect(saveWorkspace(state)).to.not.be.an('error');
  });
  it('check validity of new workspace', (done) => {
    fs.readJsonFromPath(state.workspace.folder, state.workspace.file, (err, wkContent) => {
      if (err) {
        console.log('readJsonFromPath', err);
      }
      expect(err).to.be.an('null');
      const validationError = validation('workspace', wkContent);
      if (validationError) {
        console.log('validation', validationError);
      }
      expect(validationError).to.be.an('undefined');
      done();
    });
  });
});
