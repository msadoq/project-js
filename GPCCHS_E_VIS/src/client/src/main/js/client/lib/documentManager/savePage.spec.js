/* eslint-disable no-unused-expressions */
import rimraf from 'rimraf';

import { should, expect, getTmpPath, freezeMe } from '../common/test';

import fs from '../common/fs';
import { savePage, savePageAs } from './savePage';

describe('mainProcess/documents/savePage', () => {
  let state;
  beforeEach(() => {
    state = {
      pages: {
        page1: {
          editor: {},
          layout: [
            {
              h: 1,
              i: 'plot1',
              w: 2,
              x: 5,
              y: 6,
            }, {
              h: 1,
              i: 'text1',
              w: 2,
              x: 5,
              y: 6,
            },
          ],
          title: 'page1',
          hideBorders: false,
          timebarUuid: 'TB1',
          views: ['plot1', 'text1'],
          path: './pages/page1.json',
          absolutePath: getTmpPath('testAs/pages/page1.json'),
        },
      },
      views: {
        plot1: {
          type: 'PlotView',
          configuration: {
            type: 'PlotView',
            entryPoints: [
              {
                name: 'ATT_BC_REVTCOUNT4',
                connectedData: {},
              },
            ],
            axes: [],
            grids: [],
            title: 'Plotview 4 parameters',
            titleStyle: {},
          },
          path: 'plotview4.json',
          absolutePath: getTmpPath('testAs/views/plotview4.json'),
        },
        text1: {
          type: 'TextView',
          configuration: {
            title: 'TextView One parameter',
            type: 'TextView',
            entryPoints: [],
            content: '',
          },
          path: 'textOne.json',
          absolutePath: getTmpPath('testAs/views/textOne.json'),
        },
      },
      workspace: {
        folder: getTmpPath('testPage'),
        file: './pages/page1.json',
      },
    };
  });

  afterEach(done => (
    rimraf(getTmpPath(), done)
  ));
  it('save ok', (done) => {
    savePage(freezeMe(state), 'page1', false, (err) => {
      should.not.exist(err);
      fs.isExists(state.pages.page1.absolutePath, (exist) => {
        exist.should.be.true;
        done();
      });
    });
  });
  it('saveAs ok', (done) => {
    savePageAs(freezeMe(state), 'page1', state.pages.page1.absolutePath, false, (err) => {
      should.not.exist(err);
      fs.isExists(state.pages.page1.absolutePath, (exist) => {
        exist.should.be.true;
        done();
      });
    });
  });

  it('save should fail when page is invalid', (done) => {
    state.pages.page1.title = undefined;
    savePage(freezeMe(state), 'page1', false, (err) => {
      expect(err).to.be.an('error');
      fs.isExists(state.pages.page1.absolutePath, (exist) => {
        exist.should.be.false;
        done();
      });
    });
  });
  it('saveAs should fail when page is invalid', (done) => {
    state.pages.page1.title = undefined;
    savePageAs(freezeMe(state), 'page1', state.pages.page1.absolutePath, false, (err) => {
      expect(err).to.be.an('error');
      fs.isExists(state.pages.page1.absolutePath, (exist) => {
        exist.should.be.false;
        done();
      });
    });
  });
});
