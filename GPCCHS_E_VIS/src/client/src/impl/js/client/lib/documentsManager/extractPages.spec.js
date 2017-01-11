/* eslint no-underscore-dangle: 0 */
const { extractPages } = require('./extractPages');
const { should, expect } = require('../common/test');
const { v4 } = require('node-uuid');
const _ = require('lodash');
const path = require('path');

// TODO aleal : flag is never tested, and with a global var you can have side effect through your
// tests
// eslint-disable-next-line no-unused-vars
let flag = false;
function requestPathFromOId() {
  flag = true;
}

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
            // oId: 'page02.vipg',
            path: 'page02.vipg',
            timeBarId: 'TB1'
          },
          {
            path: 'page01.json',
            timeBarId: 'TB1'
          }
        ],
        // geometry: {
        //   kind: 'Absolute',
        // },
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
    it('valid', (done) => {
      extractPages(content, requestPathFromOId, (err, val) => {
        should.not.exist(err);
        val.should.have.keys('timebars', 'windows', 'pages', '__folder');
        val.pages.should.be.an('object');
        const k = Object.getOwnPropertyNames(val.windows);
        const w = val.windows[k[0]];
        _.each(w.pages, (p) => {
          should.exist(val.pages[p]);
        });
        done();
      });
    });
    it('windows not object', (done) => {
      content.windows = [];
      extractPages(content, requestPathFromOId, (err, val) => {
        val.should.have.keys('timebars', 'windows', 'pages', '__folder');
        Object.keys(val.pages).should.have.length(0);
        done();
      });
    });
    it('unknow timebar on page', (done) => {
      const k = Object.getOwnPropertyNames(content.windows);
      const win = content.windows[k[0]];
      win.pages[0].timeBarId = 'unknow';
      extractPages(content, requestPathFromOId, (err, contentWithPages) => {
        const keys = Object.keys(contentWithPages.pages);
        keys.should.be.an('array').of.length(2);
        expect(contentWithPages.pages[keys[0]].timebarId).to.be.an('undefined');
        done();
      });
    });
    it('invalid folder', (done) => {
      content.__folder = 'unknow';
      extractPages(content, requestPathFromOId, (err) => {
        should.exist(err);
        done();
      });
    });
  });
});
