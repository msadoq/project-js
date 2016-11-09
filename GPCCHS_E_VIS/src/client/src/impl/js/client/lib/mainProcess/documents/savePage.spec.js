const { savePage, savePageAs } = require('./savePage');
const { expect } = require('chai');
const { join, dirname } = require('path');
const fs = require('../../common/fs');
const validation = require('./validation');

describe('mainProcess/documents/savePage', () => {
  const state = {
    pages: {
      page1: {
        editor: {},
        layout: [
          {
            h: 1,
            i: 'plot1',
            w: 2,
            x: 5,
            y: 6
          }, {
            h: 1,
            i: 'text1',
            w: 2,
            x: 5,
            y: 6
          },
        ],
        title: 'page1',
        hideBorders: false,
        timebarId: 'TB1',
        views: ['plot1', 'text1'],
        path: './pages/page1.json',
      }
    },
    views: {
      plot1: {
        type: 'PlotView',
        configuration: {
          type: 'PlotView',
          entryPoints: [
            { name: 'ATT_BC_REVTCOUNT4',
             connectedDataX: {},
             connectedDataY: {}
           }
          ],
          axes: [],
          grids: [],
          title: 'Plotview 4 parameters',
          titleStyle: {},
        },
        path: 'plotview4.json',
      },
      text1: {
        type: 'TextView',
        configuration: {
          title: 'TextView One parameter',
          type: 'TextView',
          entryPoints: [],
          content: []
        },
        path: 'textOne.json',
      }
    },
    workspace: {
      folder: '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/test/testPage',
      file: './pages/page1.json',
    }
  };
  const folder = '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/test/testAs';

  it('saveAs ok', () => {
    const path = join(folder, './pages/page1.json');
    expect(savePageAs(state, 'page1', path)).to.not.be.an('error');
  });
  it('check validity of saved page', (done) => {
    fs.readJsonFromPath(dirname(join(folder, './pages/page1.json')), 'page1.json', (err, pageContent) => {
      if (err) {
        console.log('readJsonFromPath', err);
      }
      expect(err).to.be.an('null');
      const validationError = validation('page', pageContent);
      if (validationError) {
        console.log('validation', validationError);
      }
      expect(validationError).to.be.an('undefined');
      done();
    });
  });
  it('save ok', () => {
    expect(savePage(state, 'page1')).to.not.be.an('error');
  });
  it('check validity of saved page', (done) => {
    fs.readJsonFromPath(dirname(join(state.workspace.folder, state.pages.page1.path)), 'page1.json',
    (err, pageContent) => {
      if (err) {
        console.log('readJsonFromPath', err);
      }
      expect(err).to.be.an('null');
      const validationError = validation('page', pageContent);
      if (validationError) {
        console.log('validation', validationError);
      }
      expect(validationError).to.be.an('undefined');
      done();
    });
  });
});
