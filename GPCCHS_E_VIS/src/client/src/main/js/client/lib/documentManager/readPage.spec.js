import sinon from 'sinon';
import _ from 'lodash/fp';
import { simpleReadPage, readPageAndViews } from './readPage';
import * as io from './io';

const stubReadDocument = () => sinon.stub(io, 'readDocument').callsFake((info, cb) => {
  if (info.withError) {
    return cb(new Error('Fake Error'));
  }
  // it's page
  if (info.viewsInfo) {
    const content = {
      type: info.type || 'Page',
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
    test('creates a simple page using readed document', (done) => {
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
    test('generates uuid in each readed views', (done) => {
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
          expect(v.uuid).toBeAnUuid();
        });
      });
      done();
    });
    test('gives an error when readDocument failed', (done) => {
      stub = stubReadDocument();
      simpleReadPage({ viewsInfo: [], withError: true }, (err, content) => {
        expect(err).toBeFalsy();
        expect(content.error).toBeInstanceOf(Error);
        done();
      });
    });
    it('gives an error when validation failed', (done) => {
      stub = stubReadDocument();
      simpleReadPage({ type: 'Unknown type' }, (unused, { error }) => {
        expect(error).toBeInstanceOf(Error);
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
    test('creates a page with readed documents (page and views)', (done) => {
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
          expect(v.value.uuid).toBeAnUuid();
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

    test('gives an error when readDocument failed on a page', (done) => {
      stub = stubReadDocument();
      readPageAndViews({ withError: true }, (err, content) => {
        expect(err).toBeFalsy();
        expect(content.pages[0].error).toBeInstanceOf(Error);
        done();
      });
    });
    test('gives all errors when readDocument failed on several views', (done) => {
      stub = stubReadDocument();
      readPageAndViews({ uuid: 'fake-uuid', viewsInfo: [view, errorView, view, errorView] }, (err, content) => {
        expect(content.pages).toHaveLength(1);
        expect(content.pages[0].error).toBeFalsy();

        expect(content.views).toHaveLength(4);
        expect(content.views[0].error).toBeFalsy();
        expect(content.views[1].error).toBeInstanceOf(Error);
        expect(content.views[2].error).toBeFalsy();
        expect(content.views[3].error).toBeInstanceOf(Error);
        done();
      });
    });
  });
});
