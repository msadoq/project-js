/* eslint no-underscore-dangle: 0 */
import { v4 } from 'uuid';
import _ from 'lodash';
import { set, compose, prop, split } from 'lodash/fp';
import path from 'path';
import fmdApi from '../common/fmd';
import ExtractPages from './extractPages';
import { should } from '../common/test';
import { applyDependencyToApi } from '../common/utils';

const getPathFromOid = compose(prop(1), split(':'));
const mockFmdApi = set('resolveDocument', (oid, cb) => cb(null, getPathFromOid(oid)));

const { extractPages } = applyDependencyToApi(ExtractPages, mockFmdApi(fmdApi));

describe('lib/documentManager', () => {
  describe('extractPages', () => {
    let content;
    beforeEach(() => {
      const id = v4();
      const fixturesFolder = path.join(__dirname, 'fixtures');
      content = { windows: {} };
      content.windows[id] = {
        type: 'documentWindow',
        title: 'window example',
        pages: [
          {
            oId: 'oid:/pages/pageSmall_with_oid.json',
            timebarId: 'TB1'
          },
          {
            path: 'pages/page1.json',
            timebarId: 'TB1'
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
      content.__folder = fixturesFolder;
    });
    it('valid', (done) => {
      extractPages(content, (err, val) => {
        should.not.exist(err);
        val.should.have.keys('timebars', 'windows', 'pages', '__folder');
        val.pages.should.be.an('object');
        _.each(val.windows[0].pages, (pageId) => {
          should.exist(val.pages[pageId]);
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
    it('unknown timebarId on page', (done) => {
      const k = Object.getOwnPropertyNames(content.windows);
      const win = content.windows[k[0]];
      win.pages[0].timebarId = 'unknow';
      extractPages(content, (err) => {
        should.exist(err);
        done();
      });
    });
    it('invalid folder', (done) => {
      content.__folder = 'unknow';
      extractPages(content, (err) => {
        should.exist(err);
        done();
      });
    });
  });
});
