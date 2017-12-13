import _ from 'lodash/fp';
import rimraf from 'rimraf';

import { getTmpPath, freezeMe } from 'common/jest';

import fs from 'common/fs';
import { writePage, writePageAs } from './writePage';

jest.mock('../ipc');

describe('mainProcess/documents/writePage', () => {
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

  afterEach(done => rimraf(getTmpPath(), () => rimraf('./fakeFolder', done)));

  describe('writePage', () => {
    test('saves page', (done) => {
      writePage(freezeMe(state), 'page1', undefined, (err) => {
        expect(err).toBeFalsy();
        fs.isExists(state.pages.page1.absolutePath, (exist) => {
          expect(exist).toBe(true);
          done();
        });
      });
    });

    test('fails when page is undefined', (done) => {
      writePage(freezeMe({ pages: {} }), 'page1', undefined, (err) => {
        expect(err).toBeAnError();
        done();
      });
    });
    test('fails when page does not have absolutePath', (done) => {
      const modifiedState = _.unset('pages.page1.absolutePath', state);
      writePage(freezeMe(modifiedState), 'page1', undefined, (err) => {
        expect(err).toBeAnError();
        done();
      });
    });
  });

  describe('writePageAs', () => {
    test('saves page', (done) => {
      writePageAs(freezeMe(state), 'page1', state.pages.page1.absolutePath, (err) => {
        expect(err).toBeFalsy();
        fs.isExists(state.pages.page1.absolutePath, (exist) => {
          expect(exist).toBe(true);
          done();
        });
      });
    });

    test('fails when page is invalid', (done) => {
      const modifiedState = _.unset('pages.page1.title', state);
      writePageAs(freezeMe(modifiedState), 'page1', modifiedState.pages.page1.absolutePath, (err) => {
        expect(err).toBeAnError();
        fs.isExists(modifiedState.pages.page1.absolutePath, (exist) => {
          expect(exist).toBe(false);
          done();
        });
      });
    });

    test('fails when page is undefined', (done) => {
      writePageAs(freezeMe(state), 'unknownPage', state.pages.page1.absolutePath, (err) => {
        expect(err).toBeInstanceOf(Error);
        fs.isExists(state.pages.page1.absolutePath, (exist) => {
          expect(exist).toBe(false);
          done();
        });
      });
    });

    test('gives an error when createFolder fails', (done) => {
      writePageAs(freezeMe(state), 'page1', '/fakeFolder/document.json', (err) => {
        expect(err).toBeAnError();
        done();
      });
    });

    test('gives an error when writeDocument fails', (done) => {
      writePageAs(freezeMe(state), 'page1', './fakeFolder/document.json', (err) => {
        expect(err).toBeAnError();
        done();
      });
    });
  });
});
