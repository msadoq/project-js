const { should } = require('../common/test');
const { saveAllDocumentsAs, saveAllDocuments } = require('./saveAllDocuments');
const readWorkspace = require('./workspace');
const exec = require('child_process').exec;

describe('mainProcess/documents/saveAllDocuments', () => {
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
        pages: ['page1'],
        title: 'window1'
      },
    },
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
        path: './pages/page1.json'
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
        path: './views/plot1.json',
      },
      text1: {
        type: 'TextView',
        configuration: {
          title: 'TextView One parameter',
          type: 'TextView',
          entryPoints: [],
          content: []
        },
        path: './views/text1.json',
      }
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
    hsc: {
      file: 'workspaceAll.json',
      folder: '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/test/testAll',
    }
  };
  const folder = '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/test/testAllAs/';
  const file = 'workspace.json';

  after((done) => {
    const path = '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/test/';
    exec('rm -r '.concat(path), () => {
      // your callback goes here
      done();
    });
  });
  it('saveAs ok', () => {
    should.not.exist(saveAllDocumentsAs(state, folder, file));
  });
  it('check validity of the new documents', (done) => {
    readWorkspace(folder, file, (err) => {
      should.not.exist(err);
      done();
    });
  });
  it('save ok', () => {
    should.not.exist(saveAllDocuments(state));
  });
  it('check validity of the new documents', (done) => {
    readWorkspace(folder, file, (err) => {
      should.not.exist(err);
      done();
    });
  });
});
