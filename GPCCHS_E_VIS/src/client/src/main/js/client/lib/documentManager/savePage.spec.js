import _ from 'lodash/fp';
import rimraf from 'rimraf';

import { getTmpPath, freezeMe } from '../common/jest';

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

  describe('savePage', () => {
    test('saves page', (done) => {
      savePage(freezeMe(state), 'page1', (err) => {
        expect(err).toBeFalsy();
        fs.isExists(state.pages.page1.absolutePath, (exist) => {
          expect(exist).toBe(true);
          done();
        });
      });
    });

    test('fails when page is undefined', (done) => {
      savePage(freezeMe({ pages: {} }), 'page1', (err) => {
        expect(err).toBeAnError();
        done();
      });
    });
    test('fails when page does not have absolutePath', (done) => {
      const modifiedState = _.unset('pages.page1.absolutePath', state);
      savePage(freezeMe(modifiedState), 'page1', (err) => {
        expect(err).toBeAnError();
        done();
      });
    });
  });

  describe('savePageAs', () => {
    test('saves page', (done) => {
      savePageAs(freezeMe(state), 'page1', state.pages.page1.absolutePath, (err) => {
        expect(err).toBeFalsy();
        fs.isExists(state.pages.page1.absolutePath, (exist) => {
          expect(exist).toBe(true);
          done();
        });
      });
    });

    test('fails when page is invalid', (done) => {
      const modifiedState = _.unset('pages.page1.title', state);
      savePageAs(freezeMe(modifiedState), 'page1', modifiedState.pages.page1.absolutePath, (err) => {
        expect(err).toBeAnError();
        fs.isExists(modifiedState.pages.page1.absolutePath, (exist) => {
          expect(exist).toBe(false);
          done();
        });
      });
    });

    test('fails when page is undefined', (done) => {
      savePageAs(freezeMe(state), 'unknownPage', state.pages.page1.absolutePath, (err) => {
        expect(err).toBeInstanceOf(Error);
        fs.isExists(state.pages.page1.absolutePath, (exist) => {
          expect(exist).toBe(false);
          done();
        });
      });
    });

    test('gives an error when createFolder fails', (done) => {
      savePageAs(freezeMe(state), 'page1', '/fakeFolder/document.json', (err) => {
        expect(err).toBeAnError();
        done();
      });
    });

    test('gives an error when writeDocument fails', (done) => {
      savePageAs(freezeMe(state), 'page1', './fakeFolder/document.json', (err) => {
        expect(err).toBeAnError();
        done();
      });
    });
  });
});
