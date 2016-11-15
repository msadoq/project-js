import { should } from '../common/test';

const { savePage, savePageAs } = require('./savePage');
const fs = require('../common/fs');
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
        absolutePath: '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/test/testAs/pages/page1.json',
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
        absolutePath: '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/test/testAs/views/plotview4.json',
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
        absolutePath: '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/test/testAs/views/textOne.json',
      }
    },
    workspace: {
      folder: '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/test/testPage',
      file: './pages/page1.json',
    }
  };

  it('saveAs ok', () => {
    should.not.exist(savePageAs(state, 'page1', state.pages.page1.absolutePath));
  });
  it('check validity of saved as page', (done) => {
    fs.readJsonFromAbsPath(state.pages.page1.absolutePath, (err, pageContent) => {
      should.not.exist(err);
      const validationError = validation('page', pageContent);
      should.not.exist(validationError);
      done();
    });
  });
  it('save ok', () => {
    should.not.exist(savePage(state, 'page1'));
  });
  it('check validity of saved page', (done) => {
    fs.readJsonFromAbsPath(state.pages.page1.absolutePath, (err, pageContent) => {
      should.not.exist(err);
      const validationError = validation('page', pageContent);
      should.not.exist(validationError);
      done();
    });
  });
});
