/* eslint-disable no-unused-expressions */
import rimraf from 'rimraf';
import { join } from 'path';

import mimeTypes from 'common/constants/mimeTypes';
import { sinon, should, expect, getTmpPath, freezeMe } from '../common/test';

import { saveWorkspace, saveWorkspaceAs } from './saveWorkspace';
import fmdApi from '../common/fmd';
import fs from '../common/fs';

const mockedCreateDocument = (path, documentType, cb) => {
  const mimeType = mimeTypes[documentType];
  if (!mimeType) {
    return cb(`Unknown documentType : ${documentType}`);
  }
  const oid = `oid:${fmdApi.getRelativeFmdPath(path)}`;
  return cb(null, oid);
};

describe('documentManager/saveWorkspace', () => {
  let stub;
  before(() => {
    stub = sinon.stub(fmdApi, 'createDocument', mockedCreateDocument);
  });
  after(() => {
    stub.restore();
  });
  let state;
  beforeEach(() => {
    state = {
      windows: {
        win1: {
          debug: {
            timebarVisibility: true,
            whyDidYouUpdate: false,
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
          title: 'window1',
        },
      },
      pages: {
        page1: {
          type: 'Page',
          title: 'Page 1',
          timebarUuid: 1,
          oId: 'oid:/testPlot.json',
        },
        page2: {
          type: 'Page',
          title: 'Page 2',
          timebarUuid: 2,
          path: 'testText.json',
        },
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
          sessionId: 1,
        },
        tl2: {
          color: null,
          id: 'Session 2',
          kind: 'Session',
          offset: 0,
          sessionId: 1,
        },
      },
      hsc:
      {
        file: 'workspace1.json',
        folder: getTmpPath('testWk'),
      },
    };
  });
  const folder = getTmpPath('testAs');

  afterEach((done) => {
    rimraf(getTmpPath(), done);
  });
  it('save ok', (done) => {
    const path = join(state.hsc.folder, state.hsc.file);
    saveWorkspace(freezeMe(state), true, (err, windows) => {
      expect(err).to.not.be.an('error');
      windows.should.have.length(1);
      windows.should.be.eql(Object.keys(state.windows));
      fs.isExists(path, (exist) => {
        exist.should.be.true;
        done();
      });
    });
  });
  it('saveAs ok', (done) => {
    const path = join(folder, 'workspace.json');
    saveWorkspaceAs(freezeMe(state), path, true, (err, windows) => {
      expect(err).to.not.be.an('error');
      windows.should.have.length(1);
      windows.should.be.eql(Object.keys(state.windows));
      fs.isExists(path, (exist) => {
        exist.should.be.true;
        done();
      });
    });
  });
  it('save fail', (done) => {
    state.timebars[1234].mode = null;
    const path = join(state.hsc.folder, state.hsc.file);
    saveWorkspace(freezeMe(state), true, (err, windows) => {
      expect(err).to.be.an('error');
      should.not.exist(windows);
      fs.isExists(path, (exist) => {
        exist.should.be.false;
        done();
      });
    });
  });
  it('saveAs fail', (done) => {
    state.timebars[1234].mode = null;
    const path = join(folder, 'workspace.json');
    saveWorkspaceAs(freezeMe(state), path, true, (err, windows) => {
      expect(err).to.be.an('error');
      should.not.exist(windows);
      fs.isExists(path, (exist) => {
        exist.should.be.false;
        done();
      });
    });
  });
});
