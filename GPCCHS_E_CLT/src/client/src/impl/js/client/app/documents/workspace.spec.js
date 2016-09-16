const workspace = require('./workspace');
const { should } = require('../utils/test');
const documents = require('../documents');
const _ = require('lodash');

describe('documents/workspace', () => {
  describe('listWindows ', () => {
    let win = { type: 'documentWindow' };
    it('notArray', () => {
      const w = workspace.listWindows(win);
      w.should.be.an('array').with.length(0);
    });
    it('no documentWindow', () => {
      win = [
        { type: 'sideWindow', val: 'val1' },
        { type: 'sideWindow' },
        { type: 'otherWindow' },
        { type: 'otherWindow', val: 'val2' }
      ];
      const w = workspace.listWindows(win);
      w.should.be.an('array').with.length(0);
    });
    it('ok', () => {
      win = [
        { type: 'documentWindow', val: 'val1' },
        { type: 'sideWindow' },
        { type: 'otherWindow' },
        { type: 'documentWindow', val: 'val2' }
      ];
      const w = workspace.listWindows(win);
      w.should.be.an('array').with.length(2);
    });
  });
  describe('getTimebarAndWindows', () => {
    it('workspace valid', done => {
      documents.readJsonFromPath('dev.workspace.json', (err, json) => {
        if (err) {
          done(err);
        } else {
          workspace.getTimebarAndWindows(json, (err1, content) => {
            if (err1) {
              done(err1);
            } else {
              content.should.be.an('object').with.all.keys(['timebar', 'windows']);
              content.timebar.should.be.an('object');
              content.windows.should.be.an('array');
              done();
            }
          });
        }
      });
    });
    it('invalid workspace', done => {
      documents.readJsonFromPath(
        '../app/schemaManager/examples/WS.example.mis.json',
        (err, json) => {
          if (err) {
            done(err);
          } else {
            workspace.getTimebarAndWindows(json, err1 => {
              err1.should.be.an('array').with.length(20);
              done();
            });
          }
        });
    });
  });
  describe('discoverPages', () => {
    it('valid', done => {
      documents.readJsonFromPath('dev.workspace.json', (err, json) => {
        if (err) {
          done(err);
        } else {
          const list = [];
          _.forEach(json.windows, win => {
            const elem = workspace.discoverPages(win);
            if (win.type !== 'documentWindow') {
              elem.should.be.an('array').with.length(0);
            } else {
              elem.should.be.an('array').with.length(2);
              elem[0].should.have.keys(['uuid', 'path', 'timeBarId']);
              elem[1].should.have.keys(['uuid', 'oId', 'timeBarId']);
              list.push(elem[0]);
              list.push(elem[1]);
            }
          });
          list.should.have.length(2);
          done();
        }
      });
    });
    it('no pages', done => {
      documents.readJsonFromPath('dev.workspace.json', (err, json) => {
        if (err) {
          done(err);
        } else {
          _.forEach(json.windows, value => {
            value.pages = []; // eslint-disable-line no-param-reassign
            const elem = workspace.discoverPages(value);
            elem.should.be.an('array').with.length(0);
          });
          done();
        }
      });
    });
    it('pages without id or path', done => {
      documents.readJsonFromPath('dev.workspace.json', (err, json) => {
        if (err) {
          done(err);
        } else {
          _.forEach(json.windows, win => {
            if (win.type === 'documentWindow') {
              _.forEach(win.pages, page => {
                page.wrong = page.oId || page.path; // eslint-disable-line no-param-reassign
                page.oId = undefined; // eslint-disable-line no-param-reassign
                page.path = undefined; // eslint-disable-line no-param-reassign
              });
            }
            const elem = workspace.discoverPages(win);
            elem.should.be.an('array').with.length(0);
          });
          done();
        }
      });
    });
  });
  describe('identifyPages', () => {
    it('ok', done => {
      documents.readJsonFromPath('dev.workspace.json', (err, json) => {
        should.not.exist(err);
        workspace.identifyPages(json, (err1, content) => {
          should.not.exist(err1);
          content.should.be.an('object')
          .with.all.keys(['type', 'windows', 'timeBarWindow', 'pages']);
          // Check correspondance between page uuid
          _.forEach(content.pages, page => {
            page.should.have.any.keys(['path', 'oId']);
            page.should.contains.keys('uuid');
            should.exist(_.find(content.windows[4].pages, p => p === page.uuid));
          });
          done();
        });
      });
    });
  });
  describe('readPages', () => {
    it('valid', done => {
      documents.readJsonFromPath('dev.workspace.json', (err, json) => {
        should.not.exist(err);
        workspace.identifyPages(json, (err1, content) => {
          should.not.exist(err1);
          workspace.readPages(content, (err2, contentPages) => {
            should.not.exist(err2);
            contentPages.should.contains.keys('pages');
            _.forEach(contentPages.pages, page => {
              page.should.contains.keys(['uuid', 'type', 'views']);
              page.should.have.any.keys(['path', 'oId']);
              page.views.should.be.an('array');
            });
            done();
          });
        });
      });
    });
    it('invalid page', done => {
      documents.readJsonFromPath('dev.workspace.json', (err, json) => {
        should.not.exist(err);
        workspace.identifyPages(json, (err1, content) => {
          should.not.exist(err1);
          // eslint-disable-next-line no-param-reassign
          content.pages[0].path = '/pages/showcase.page.invalid.json';
          workspace.readPages(content, err2 => {
            should.exist(err2);
            done();
          });
        });
      });
    });
  });
  describe('discoverViews', () => {
    it('valid pages', () => {
      const pages = {
        type: 'Page',
        views: [
          {
            oId: '/views/text1.view.json',
            geometry: {
              kind: 'Relative',
              x: 0,
              y: 0,
              w: 4,
              h: 4
            },
            windowState: 'Normalized',
          },
          {
            path: '/views/plot2.view.json',
            geometry: {
              kind: 'Relative',
              x: 8,
              y: 4,
              w: 4,
              h: 3
            },
            windowState: 'Normalized',
          }
        ]
      };
      const list = workspace.discoverViews(pages);
      list.should.be.an('array').with.length(2);
      list[0].should.contains.keys(['uuid', 'oId']);
      list[0].oId.should.equal('/views/text1.view.json');
      list[1].should.contains.keys(['uuid', 'path']);
      list[1].path.should.equal('/views/plot2.view.json');
    });
    it('invalid page', () => {
      const pages = {
        type: 'Page',
        views: [
          {
            notOId: '/views/plot1.view.json',
            geometry: {
              kind: 'Relative',
              x: 8,
              y: 0,
              w: 4,
              h: 3
            },
            windowState: 'Normalized',
          },
          {
            pathNotOk: '/views/plot2.view.json',
            geometry: {
              kind: 'Relative',
              x: 8,
              y: 4,
              w: 4,
              h: 3
            },
            windowState: 'Normalized',
          }
        ]
      };
      const list = workspace.discoverViews(pages);
      list.should.be.an('array').with.length(0);
    });
  });
  describe('identifyViews', () => {
    let content;
    before(done => {
      documents.readJsonFromPath('dev.workspace.json', (err, json) => {
        should.not.exist(err);
        workspace.identifyPages(json, (err1, content1) => {
          should.not.exist(err1);
          workspace.readPages(content1, (err2, contentPages) => {
            should.not.exist(err2);
            content = contentPages;
            done();
          });
        });
      });
    });
    it('ok', done => {
      workspace.identifyViews(content, (err3, contentViews) => {
        should.not.exist(err3);
        contentViews.should.be.an('object').that.contains.keys('views');
        contentViews.views.should.be.an('array').with.length(5);
        _.each(contentViews.views, view => {
          view.should.have.any.keys(['path', 'oId']);
          view.should.contains.keys('uuid');
          // check correspondance between oId
          let exists = false;
          _.each(contentViews.pages, page => {
            if (_.find(page.views, viewP => viewP.uuid === view.uuid)) {
              exists = true;
            }
          });
          exists.should.equal(true);
        });
        done();
      });
    });
    it('no views', done => {
      _.each(content.pages, page => {
        page.views = []; // eslint-disable-line no-param-reassign
      });
      workspace.identifyViews(content, (err3, contentViews) => {
        should.not.exist(err3);
        contentViews.should.be.an('object').that.contains.keys('views');
        contentViews.views.should.be.an('array').with.length(0);
        done();
      });
    });
  });
  // describe.only('readViews', () => {});
});
