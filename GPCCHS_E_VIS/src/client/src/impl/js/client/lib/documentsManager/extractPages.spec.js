/* eslint no-underscore-dangle: 0 */
const { extractPages, readPages, findWindowPagesAndReplaceWithUuid } = require('./extractPages');
const { should } = require('../common/test');
const { v4 } = require('node-uuid');
const _ = require('lodash');
const path = require('path');


describe('documents/lib', () => {
  describe('extractPages', () => {
    let content;
    beforeEach(() => {
      const id = v4();
      content = { windows: {} };
      content.windows[id] = {
        type: 'documentWindow',
        title: 'window example',
        pages: [
          {
            oId: 'page02.vipg',
            timeBarId: 'TB1'
          },
          {
            path: 'page01.json',
            timeBarId: 'TB1'
          }
        ],
        geometry: {
          kind: 'Absolute',
        },
        uuid: id,
      };
      const tbid = v4();
      content.timebars = {};
      content.timebars[tbid] = {
        id: 'TB1',
        uuid: tbid,
      };
      content.__folder = path.join(__dirname, 'examples');
    });
    describe('findWindowPagesAndReplaceWithUuid', () => {
      it('window valid', () => {
        const tbs = content.timebars;
        _.each(content.windows, (w) => {
          const pages = findWindowPagesAndReplaceWithUuid(w, tbs);
          pages.should.be.an('array').with.length(2);
          _.each(pages, (p) => {
            p.should.contains.keys('uuid', 'timebarId');
            should.exist(content.timebars[p.timebarId]);
          });
          _.each(w.pages, (id) => {
            _.filter(pages, { uuid: id }).should.be.an('array').with.length(1);
          });
        });
      });
      it('Unknown timebar on page', () => {
        const k = Object.getOwnPropertyNames(content.windows);
        const w = content.windows[k[0]];
        w.pages[0].timeBarId = 'TB2';
        const pages = findWindowPagesAndReplaceWithUuid(w, content.timebars);
        pages.should.be.an('array').with.length(2);
        _.each(pages, (p) => {
          p.should.contains.keys('uuid', 'timebarId');
          if (p.oId) {
            should.not.exist(p.timebarId);
          } else {
            should.exist(content.timebars[p.timebarId]);
          }
        });
      });
    });
    describe('readPages', () => {
      it('valid pages', (done) => {
        const k = Object.getOwnPropertyNames(content.windows);
        const w = content.windows[k[0]];
        const pages = findWindowPagesAndReplaceWithUuid(w, content.timebars);
        readPages(content.__folder, pages, (e, list) => {
          should.not.exist(e);
          should.exist(list);
          list.should.be.an('array').with.length(2);
          const pId = Object.getOwnPropertyNames(w.pages);
          should.exist(_.filter(list, { uuid: pId[0] }));
          should.exist(_.filter(list, { uuid: pId[1] }));
          done();
        });
      });
      it('invalid folder', (done) => {
        const k = Object.getOwnPropertyNames(content.windows);
        const w = content.windows[k[0]];
        const pages = findWindowPagesAndReplaceWithUuid(w, content.timebars);
        readPages('../examples', pages, (err) => {
          should.exist(err);
          done();
        });
      });
      it('invalid page path', (done) => {
        const k = Object.getOwnPropertyNames(content.windows);
        const w = content.windows[k[0]];
        w.pages.push({ path: 'invalid.json', timeBarId: 'TB1' });
        const pages = findWindowPagesAndReplaceWithUuid(w, content.timebars);
        readPages('../examples', pages, (err) => {
          should.exist(err);
          done();
        });
      });
    });
    describe('extractPages', () => {
      it('valid', (done) => {
        extractPages(content, (err, val) => {
          should.not.exist(err);
          val.should.have.keys('timebars', 'windows', 'pages', '__folder');
          val.pages.should.be.an('object');
          const k = Object.getOwnPropertyNames(content.windows);
          const w = content.windows[k[0]];
          _.each(w.pages, (p) => {
            should.exist(content.pages[p]);
          });
          done();
        });
      });
      it('windows not object', (done) => {
        content.windows = [];
        extractPages(content, (err, val) => {
          val.should.have.keys('timebars', 'windows', 'pages', '__folder');
          Object.keys(val.pages).should.have.length(0);
          done();
        });
      });
    });
  });
});
