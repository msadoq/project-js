/* eslint-disable no-unused-expressions */
import _ from 'lodash/fp';
import { sinon, isV4 } from '../common/test';
import { simpleReadPage, readPageAndViews } from './readPage';
import * as io from './io';

const stubReadDocument = () => sinon.stub(io, 'readDocument').callsFake((info, cb) => {
  if (info.withError) {
    return cb(new Error('Fake Error'));
  }
  // it's page
  if (info.viewsInfo) {
    const content = {
      type: 'Page',
      title: 'PAGE TITLE',
      views: info.viewsInfo || [],
    };
    // eslint-disable-next-line no-param-reassign
    delete info.viewsInfo;
    return cb(null, content, { someProperties: true }, '/a/fake/absolute/path');
  }

  // it's a view
  const content = {
    type: 'TextView',
    content: '',
    entryPoints: [],
  };
  return cb(null, content, null, '/a/fake/absolute/path');
});

describe('documentManager:readPage', () => {
  let stub;

  afterEach(() => {
    if (stub) {
      stub.restore();
    }
  });
  describe('simpleReadPage', () => {
    it('creates a simple page using readed document', (done) => {
      stub = stubReadDocument();
      simpleReadPage({ viewsInfo: [], uuid: 'fake-uuid' }, (err, content) => {
        expect(err).toBeFalsy();
        expect(content).toEqual({
          value: {
            type: 'Page',
            title: 'PAGE TITLE',
            views: [],
            uuid: 'fake-uuid',
            properties: { someProperties: true },
            isModified: false,
            absolutePath: '/a/fake/absolute/path',
          },
        });
        done();
      });
    });
    it('generates uuid in each readed views', (done) => {
      const view = {
        path: '/fake/path',
        geometry: {
          x: 0,
          y: 0,
          h: 0,
          w: 0,
        },
        windowState: 'Normalized',
      };
      stub = stubReadDocument();
      simpleReadPage({ viewsInfo: [view, view] }, (err, content) => {
        expect(content.value.views).toHaveLength(2);
        content.value.views.forEach((v) => {
          expect(isV4(v.uuid)).toBe(true);
        });
      });
      done();
    });
    it('gives an error when readDocument failed', (done) => {
      stub = stubReadDocument();
      simpleReadPage({ viewsInfo: [], withError: true }, (err, content) => {
        expect(err).toBeFalsy();
        expect(typeof content.error).toBe('error');
        done();
      });
    });
  });

  describe('readPageAndViews', () => {
    const view = {
      path: '/fake/path',
      geometry: {
        x: 0,
        y: 0,
        h: 0,
        w: 0,
      },
      windowState: 'Normalized',
    };
    const errorView = {
      ...view,
      withError: true,
    };
    it('creates a page with readed documents (page and views)', (done) => {
      stub = stubReadDocument();
      readPageAndViews({ uuid: 'fake-uuid', viewsInfo: [view, view] }, (err, content) => {
        expect(err).toBeFalsy();
        expect(content.pages).toHaveLength(1);
        expect(content.pages[0].value).toEqual({
          type: 'Page',
          title: 'PAGE TITLE',
          views: [],
          uuid: 'fake-uuid',
          properties: { someProperties: true },
          isModified: false,
          absolutePath: '/a/fake/absolute/path',
        });

        expect(content.views).toHaveLength(2);
        content.views.forEach((v) => {
          expect(isV4(v.value.uuid)).toBe(true);
        });
        const viewsWithoutUuid = _.map(_.unset('value.uuid'), content.views);
        viewsWithoutUuid.forEach((v) => {
          expect(v.value).toEqual({
            path: '/fake/path',
            geometry: { x: 0, y: 0, w: 0, h: 0 },
            windowState: 'Normalized',
            pageUuid: 'fake-uuid',
            pageFolder: '/a/fake/absolute',
            type: 'TextView',
            defaultRatio: { length: 5, width: 5 },
            links: [],
            title: 'New Text View',
            configuration: { content: '', entryPoints: [] },
            isModified: false,
            oId: undefined,
            absolutePath: '/a/fake/absolute/path',
          });
        });
        done();
      });
    });

    it('gives an error when readDocument failed on a page', (done) => {
      stub = stubReadDocument();
      readPageAndViews({ withError: true }, (err, content) => {
        expect(err).toBeFalsy();
        expect(typeof content.pages[0].error).toBe('error');
        done();
      });
    });
    it('gives all errors when readDocument failed on several views', (done) => {
      stub = stubReadDocument();
      readPageAndViews({ uuid: 'fake-uuid', viewsInfo: [view, errorView, view, errorView] }, (err, content) => {
        expect(content.pages).toHaveLength(1);
        expect(content.pages[0].error).toBeFalsy();

        expect(content.views).toHaveLength(4);
        expect(content.views[0].error).toBeFalsy();
        expect(typeof content.views[1].error).toBe('error');
        expect(content.views[2].error).toBeFalsy();
        expect(typeof content.views[3].error).toBe('error');
        done();
      });
    });
  });
});
