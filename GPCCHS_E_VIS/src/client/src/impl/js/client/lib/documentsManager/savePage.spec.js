import { should, getTmpPath, freezeMe } from '../common/test';

const exec = require('child_process').exec;
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
        timebarUuid: 'TB1',
        views: ['plot1', 'text1'],
        path: './pages/page1.json',
        absolutePath: getTmpPath('testAs/pages/page1.json'),
      }
    },
    views: {
      plot1: {
        type: 'PlotView',
        configuration: {
          type: 'PlotView',
          entryPoints: [
            {
              name: 'ATT_BC_REVTCOUNT4',
              connectedDataX: {},
              connectedDataY: {},
            },
          ],
          axes: [],
          grids: [],
          title: 'Plotview 4 parameters',
          titleStyle: {},
        },
        path: 'plotview4.json',
        absolutePath: getTmpPath('testAs/views/plotview4.json')
      },
      text1: {
        type: 'TextView',
        configuration: {
          title: 'TextView One parameter',
          type: 'TextView',
          entryPoints: [],
          content: ''
        },
        path: 'textOne.json',
        absolutePath: getTmpPath('testAs/views/textOne.json'),
      }
    },
    workspace: {
      folder: getTmpPath('testPage'),
      file: './pages/page1.json',
    }
  };

  after((done) => {
    exec('rm -r '.concat(getTmpPath()), () => {
      // your callback goes here
      done();
    });
  });
  it('saveAs ok', (done) => {
    savePageAs(freezeMe(state), 'page1', state.pages.page1.absolutePath, false, (err) => {
      should.not.exist(err);
      done();
    });
  });
  it('check validity of saved as page', (done) => {
    fs.readJsonFromAbsPath(state.pages.page1.absolutePath, (err, pageContent) => {
      should.not.exist(err);
      const validationError = validation('page', pageContent);
      should.not.exist(validationError);
      done();
    });
  });
  it('save ok', (done) => {
    state.pages.page1.isModified = true;
    savePage(freezeMe(state), 'page1', false, (err) => {
      should.not.exist(err);
      done();
    });
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
