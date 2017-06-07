/* eslint-disable no-unused-expressions */
import rimraf from 'rimraf';
import { join } from 'path';

import mimeTypes from 'common/constants/mimeTypes';
import { sinon, expect, getTmpPath, freezeMe } from '../common/test';

import { saveWorkspace, saveWorkspaceAs } from './saveWorkspace';
import * as fmdApi from '../common/fmd';
import fs from '../common/fs';

const mockedCreateDocument = (path, documentType, cb) => {
  const mimeType = mimeTypes[documentType];
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
    state = {
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
    };
  });
  const folder = getTmpPath('testAs');

  afterEach((done) => {
    rimraf(getTmpPath(), done);
  });
  it('save ok', (done) => {
    const path = join(state.hsc.folder, state.hsc.file);
    saveWorkspace(freezeMe(state), (err) => {
      expect(err).to.not.be.an('error');
      fs.isExists(path, (exist) => {
        exist.should.be.true;
        done();
      });
    });
  });
  it('saveAs ok', (done) => {
    const path = join(folder, 'workspace.json');
    saveWorkspaceAs(freezeMe(state), path, (err) => {
      expect(err).to.not.be.an('error');
      fs.isExists(path, (exist) => {
        exist.should.be.true;
        done();
      });
    });
  });
  it('save fail', (done) => {
    state.timebars.abcd.mode = null;
    const path = join(state.hsc.folder, state.hsc.file);
    saveWorkspace(freezeMe(state), (err) => {
      expect(err).to.be.an('error');
      fs.isExists(path, (exist) => {
        exist.should.be.false;
        done();
      });
    });
  });
  it('saveAs fail', (done) => {
    state.timebars.abcd.mode = null;
    const path = join(folder, 'workspace.json');
    saveWorkspaceAs(freezeMe(state), path, (err) => {
      expect(err).to.be.an('error');
      fs.isExists(path, (exist) => {
        exist.should.be.false;
        done();
      });
    });
  });
  it('save correct content', (done) => {
    const path = join(state.hsc.folder, state.hsc.file);
    saveWorkspace(freezeMe(state), () => {
      readJson(path, (err, content) => {
        // console.warn(err);
        // console.warn('CONTENT : ', content);
        content.should.be.eql({
          type: 'WorkSpace',
          windows: [
            {
              type: 'documentWindow',
              pages: [
                {
                  oId: 'oid:/testPlot.json',
                  timebarId: 'tb1',
                },
                {
                  path: 'testText.json',
                  timebarId: 'tb1',
                },
              ],
              title: 'window1',
              geometry: {
                h: 800,
                kind: 'Absolute',
                w: 1310,
                x: 110,
                y: 10,
              },
            },
          ],
          timebars: [
            {
              id: 'tb1',
              rulerResolution: 11250,
              speed: 1,
              masterId: 'Session 1',
              mode: 'Normal',
              type: 'timeBarConfiguration',
              timelines: [
                {
                  color: null,
                  id: 'Session 1',
                  kind: 'Session',
                  offset: 0,
                  sessionName: 'session1',
                },
                {
                  color: null,
                  id: 'Session 2',
                  kind: 'Session',
                  offset: 0,
                  sessionName: 'session1',
                },
              ],
            },
          ],
        });
        done();
      });
    });
  });
});
