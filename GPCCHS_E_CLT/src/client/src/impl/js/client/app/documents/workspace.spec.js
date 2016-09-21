// const workspace = require('./workspace');
// const { should } = require('../utils/test');
// const documents = require('../documents');
// const _ = require('lodash');
// const path = require('path');
//
// const dir = path.join(__dirname, 'features');
//
// describe.only('documents/workspace', () => {
//   describe('listWindows ', () => {
//     let win = {
//       type: 'documentWindow'
//     };
//     it('notArray', () => {
//       const w = workspace.listWindows(win);
//       w.should.be.an('array').with.length(0);
//     });
//     it('no documentWindow', () => {
//       win = [{
//         type: 'sideWindow',
//         val: 'val1'
//       }, {
//         type: 'sideWindow'
//       }, {
//         type: 'otherWindow'
//       }, {
//         type: 'otherWindow',
//         val: 'val2'
//       }];
//       const w = workspace.listWindows(win);
//       w.should.be.an('array').with.length(0);
//     });
//     it('ok', () => {
//       win = [{
//         type: 'documentWindow',
//         val: 'val1'
//       }, {
//         type: 'sideWindow'
//       }, {
//         type: 'otherWindow'
//       }, {
//         type: 'documentWindow',
//         val: 'val2'
//       }];
//       const w = workspace.listWindows(win);
//       w.should.be.an('array').with.length(2);
//     });
//   });
//   // describe('getTimebarAndWindows', () => {
//   //   it('workspace valid', done => {
//   //     documents.readJsonFromPath(dir, 'dev.workspace.json', (err, json) => {
//   //       should.not.exist(err);
//   //       workspace.getTimebarAndWindows(json, (err1, content) => {
//   //         should.not.exist(err1);
//   //         content.should.be.an('object').with.all.keys(['timebar', 'windows']);
//   //         content.timebar.should.be.an('object');
//   //         content.windows.should.be.an('array');
//   //         done();
//   //       });
//   //     });
//   //   });
//   //   it('invalid workspace', done => {
//   //     documents.readJsonFromPath(dir, 'WS.example.mis.json', (err, json) => {
//   //       should.exist(err);
//   //       should.not.exist(json);
//   //       done();
//   //     });
//   //   });
//   // });
//   describe('discoverPages', () => {
//     let content;
//     before(done => {
//       documents.readJsonFromPath(dir, 'dev.workspace.json', (err, json) => {
//         workspace.getTimebarAndWindows(json, (err1, json1) => {
//           workspace.getWindowList(json1, (err2, json2) => {
//             content = json2;
//             done();
//           });
//         });
//       });
//     });
//     it('valid', done => {
//       const list = [];
//       _.forEach(content.windows, win => {
//         const elem = workspace.discoverPages(win);
//         if (win.type !== 'documentWindow') {
//           elem.should.be.an('array').with.length(0);
//         } else {
//           elem.should.be.an('array').with.length(2);
//           elem[0].should.have.keys(['uuid', 'path', 'timeBarId']);
//           elem[1].should.have.keys(['uuid', 'oId', 'timeBarId']);
//           list.push(elem[0]);
//           list.push(elem[1]);
//         }
//       });
//       list.should.have.length(2);
//       done();
//     });
//     it('no pages', done => {
//       _.forEach(content.windows, value => {
//         value.pages = []; // eslint-disable-line no-param-reassign
//         const elem = workspace.discoverPages(value);
//         elem.should.be.an('array').with.length(0);
//       });
//       done();
//     });
//     it('pages without id or path', done => {
//       _.forEach(content.windows, win => {
//         if (win.type === 'documentWindow') {
//           _.forEach(win.pages, page => {
//             page.wrong = page.oId || page.path; // eslint-disable-line no-param-reassign
//             page.oId = undefined; // eslint-disable-line no-param-reassign
//             page.path = undefined; // eslint-disable-line no-param-reassign
//           });
//         }
//         const elem = workspace.discoverPages(win);
//         elem.should.be.an('array').with.length(0);
//       });
//       done();
//     });
//   });
//   describe('identifyPages', () => {
//     let content;
//     before(done => {
//       documents.readJsonFromPath(dir, 'dev.workspace.json', (err, json) => {
//         workspace.getTimebarAndWindows(json, (err1, json1) => {
//           workspace.getWindowList(json1, (err2, json2) => {
//             content = json2;
//             done();
//           });
//         });
//       });
//     });
//     it('ok', done => {
//       workspace.identifyPages(content, (err1, contentPages) => {
//         should.not.exist(err1);
//         contentPages.should.be.an('object')
//           .with.all.keys(['windows', 'timebar', 'pages']);
//         // Check correspondance between page uuid
//         _.forEach(contentPages.pages, page => {
//           page.should.have.any.keys(['path', 'oId']);
//           page.should.contains.keys('uuid');
//
//           should.exist(_.find(contentPages.windows[0].pages, p => p === page.uuid));
//         });
//         done();
//       });
//     });
//   });
//   describe('readPages', () => {
//     let content;
//     before(done => {
//       documents.readJsonFromPath(dir, 'dev.workspace.json', (err, json) => {
//         workspace.getTimebarAndWindows(json, (err1, json1) => {
//           workspace.getWindowList(json1, (err2, json2) => {
//             workspace.identifyPages(json2, (err3, wk) => {
//               content = wk;
//               done();
//             });
//           });
//         });
//       });
//     });
//     it('valid', done => {
//       workspace.readPages(dir, content, (err, contentPages) => {
//         should.not.exist(err);
//         contentPages.should.contains.keys('pages');
//         _.forEach(contentPages.pages, page => {
//           page.should.contains.keys(['uuid', 'type', 'views', 'timeBarId']);
//           page.should.have.any.keys(['path', 'oId']);
//           page.views.should.be.an('array');
//         });
//         done();
//       });
//     });
//     it('invalid page', done => {
//       content.pages[0].path = '/pages/showcase.page.invalid.json';
//       workspace.readPages(dir, content, err2 => {
//         should.exist(err2);
//         done();
//       });
//     });
//   });
//   describe('discoverViews', () => {
//     it('valid pages', () => {
//       const pages = {
//         type: 'Page',
//         views: [{
//           oId: '/views/text1.view.json',
//           geometry: {
//             kind: 'Relative',
//             x: 0,
//             y: 0,
//             w: 4,
//             h: 4
//           },
//           windowState: 'Normalized',
//         }, {
//           path: '/views/plot2.view.json',
//           geometry: {
//             kind: 'Relative',
//             x: 8,
//             y: 4,
//             w: 4,
//             h: 3
//           },
//           windowState: 'Normalized',
//         }]
//       };
//       const list = workspace.discoverViews(pages);
//       list.should.be.an('array').with.length(2);
//       list[0].should.contains.keys(['uuid', 'oId']);
//       list[0].oId.should.equal('/views/text1.view.json');
//       list[1].should.contains.keys(['uuid', 'path']);
//       list[1].path.should.equal('/views/plot2.view.json');
//     });
//     it('invalid page', () => {
//       const pages = {
//         type: 'Page',
//         views: [{
//           notOId: '/views/plot1.view.json',
//           geometry: {
//             kind: 'Relative',
//             x: 8,
//             y: 0,
//             w: 4,
//             h: 3
//           },
//           windowState: 'Normalized',
//         }, {
//           pathNotOk: '/views/plot2.view.json',
//           geometry: {
//             kind: 'Relative',
//             x: 8,
//             y: 4,
//             w: 4,
//             h: 3
//           },
//           windowState: 'Normalized',
//         }]
//       };
//       const list = workspace.discoverViews(pages);
//       list.should.be.an('array').with.length(0);
//     });
//   });
//   describe('identifyViews', () => {
//     let content;
//     before(done => {
//       documents.readJsonFromPath(dir, 'dev.workspace.json', (err, json) => {
//         workspace.getTimebarAndWindows(json, (err1, json1) => {
//           workspace.getWindowList(json1, (err2, json2) => {
//             workspace.identifyPages(json2, (err3, json3) => {
//               workspace.readPages(dir, json3, (err4, json4) => {
//                 content = json4;
//                 done();
//               });
//             });
//           });
//         });
//       });
//     });
//     it('ok', done => {
//       workspace.identifyViews(content, (err, contentViews) => {
//         should.not.exist(err);
//         contentViews.should.be.an('object').that.contains.keys('views');
//         contentViews.views.should.be.an('array').with.length(3);
//         _.each(contentViews.views, view => {
//           view.should.have.any.keys(['path', 'oId']);
//           view.should.contains.keys('uuid');
//           // check correspondance between oId
//           let exists = false;
//           _.each(contentViews.pages, page => {
//             if (_.find(page.views, viewP => viewP.uuid === view.uuid)) {
//               exists = true;
//             }
//           });
//           exists.should.equal(true);
//         });
//         done();
//       });
//     });
//     it('no views', done => {
//       _.each(content.pages, page => {
//         page.views = []; // eslint-disable-line no-param-reassign
//       });
//       workspace.identifyViews(content, (err, contentViews) => {
//         should.not.exist(err);
//         contentViews.should.be.an('object').that.contains.keys('views');
//         contentViews.views.should.be.an('array').with.length(0);
//         done();
//       });
//     });
//   });
//   describe('readViews', () => {
//     let content;
//     before(done => {
//       documents.readJsonFromPath(dir, 'dev.workspace.json', (err, json) => {
//         workspace.getTimebarAndWindows(json, (err1, json1) => {
//           workspace.getWindowList(json1, (err2, json2) => {
//             workspace.identifyPages(json2, (err3, json3) => {
//               workspace.readPages(dir, json3, (err4, json4) => {
//                 workspace.identifyViews(json4, (err5, contentViews) => {
//                   content = contentViews;
//                   done();
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//     it('valid', done => {
//       workspace.readViews(dir, content, (err, contentViews) => {
//         should.not.exist(err);
//         contentViews.should.contains.keys('views');
//         _.forEach(contentViews.views, view => {
//           view.should.contains.keys(['uuid', 'type', 'configuration']);
//           view.should.have.any.keys(['path', 'oId']);
//         });
//         done();
//       });
//     });
//     it('invalid view', done => {
//       content.views[0].oId = '/views/text1.view1.json';
//       workspace.readViews(dir, content, err => {
//         should.exist(err);
//         done();
//       });
//     });
//   });
//   describe('separateConnectedData', () => {
//     let content;
//     before(done => {
//       documents.readJsonFromPath(dir, 'dev.workspace.json', (err, json) => {
//         workspace.getTimebarAndWindows(json, (err1, json1) => {
//           workspace.getWindowList(json1, (err2, json2) => {
//             workspace.identifyPages(json2, (err3, json3) => {
//               workspace.readPages(dir, json3, (err4, json4) => {
//                 workspace.identifyViews(json4, (err5, json5) => {
//                   workspace.readViews(dir, json5, (err6, contentAll) => {
//                     content = contentAll;
//                     done();
//                   });
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//     it('valid', done => {
//       workspace.separateConnectedData(content, (err, final) => {
//         should.not.exist(err);
//         final.should.be.an('object').with.all.keys(
//           ['windows', 'timebar', 'pages', 'views', 'connectedData']);
//         final.connectedData.should.be.an('array').with.length(7);
//         done();
//       });
//     });
//     it('with view without entryPoints', done => {
//       _.find(content.views, view => view.oId === '/views/text1.view.json')
//         .configuration.textViewEntryPoints = [];
//       workspace.separateConnectedData(content, (err, final) => {
//         should.not.exist(err);
//         final.should.be.an('object').with.all.keys(
//           ['windows', 'timebar', 'pages', 'views', 'connectedData']);
//         final.connectedData.should.be.an('array').with.length(4);
//         done();
//       });
//     });
//   });
//   describe('readWorkspace', () => {
//     it('valid', done => {
//       workspace.readWorkspace(dir, 'dev.workspace.json', (err, content) => {
//         should.not.exist(err);
//         content.should.be.an('object').with.all.keys(
//           ['windows', 'timebar', 'pages', 'views', 'connectedData']);
//         content.connectedData.should.be.an('array').with.length(7);
//         done();
//       });
//     });
//     it('invalid', done => {
//       workspace.readWorkspace(dir, 'WS.example.mis.json', err => {
//         should.exist(err);
//         done();
//       });
//     });
//   });
// });
