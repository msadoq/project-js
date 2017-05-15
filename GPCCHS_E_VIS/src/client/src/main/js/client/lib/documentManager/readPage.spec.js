/* eslint-disable no-unused-expressions */
import _ from 'lodash/fp';
import { should, sinon, isV4 } from '../common/test';
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
        should.not.exist(err);
        content.should.be.eql({
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
        content.value.views.should.have.length(2);
        content.value.views.forEach((v) => {
          isV4(v.uuid).should.be.true;
        });
      });
      done();
    });
    it('gives an error when readDocument failed', (done) => {
      stub = stubReadDocument();
      simpleReadPage({ viewsInfo: [], withError: true }, (err, content) => {
        should.not.exist(err);
        content.error.should.be.an('error');
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
        should.not.exist(err);
        content.pages.should.have.length(1);
        content.pages[0].value.should.be.eql({
          type: 'Page',
          title: 'PAGE TITLE',
          views: [],
          uuid: 'fake-uuid',
          properties: { someProperties: true },
          isModified: false,
          absolutePath: '/a/fake/absolute/path',
        });

        content.views.should.have.length(2);
        content.views.forEach((v) => {
          isV4(v.value.uuid).should.be.true;
        });
        const viewsWithoutUuid = _.map(_.unset('value.uuid'), content.views);
        viewsWithoutUuid.forEach((v) => {
          v.value.should.be.eql({
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
        should.not.exist(err);
        content.pages[0].error.should.be.an('error');
        done();
      });
    });
    it('gives all errors when readDocument failed on several views', (done) => {
      stub = stubReadDocument();
      readPageAndViews({ uuid: 'fake-uuid', viewsInfo: [view, errorView, view, errorView] }, (err, content) => {
        content.pages.should.have.length(1);
        should.not.exist(content.pages[0].error);

        content.views.should.have.length(4);
        should.not.exist(content.views[0].error);
        content.views[1].error.should.be.an('error');
        should.not.exist(content.views[2].error);
        content.views[3].error.should.be.an('error');
        done();
      });
    });
  });
});
