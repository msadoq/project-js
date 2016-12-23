/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import {
  getPages,
  getPage,
  getPageIdByViewId,
  getPageLayout,
  getEditor,
  makeGetViews,
  makeGetLayouts,
  getModifiedPagesIds,
  getPageModifiedViewsIds,
} from './pages';

describe('store:page:selectors', () => {
  it('getPage', () => {
    const { getState } = getStore({
      pages: {
        myPageId: { title: 'Title 1' },
      },
    });
    getPage(getState(), 'myPageId').should.have.property('title', 'Title 1');
    should.not.exist(getPage(getState(), 'unknownId'));
  });
  it('getPageLayout', () => {
    const { getState } = getStore({
      pages: {
        myPageId: {
          layout: []
        }
      }
    });
    getPageLayout(getState(), { pageId: 'myPageId' }).should.be.an('array');
  });
  it('getEditor', () => {
    const { getState } = getStore({
      pages: {
        myPageId: {
          editor: {}
        }
      }
    });
    getEditor(getState(), 'myPageId').should.be.an('object');
  });
  describe('getPages', () => {
    it('should returns pages', () => {
      const state = {
        pages: {
          myId: { title: 'Title' },
          myOtherId: { title: 'Title other' },
        },
      };
      const { getState } = getStore(state);

      getPages(getState()).should.equal(state.pages);
    });
  });
  it('makeGetViews', () => {
    const getViews = makeGetViews();
    const state = {
      pages: {
        myPageId: {
          views: ['view1']
        }
      },
      views: {
        views1: {},
        views2: {},
      }
    };
    const { getState } = getStore(state);

    getViews(getState(), { pageId: 'myPageId' }).should.eql([
      { viewId: 'view1' }
    ]);
  });
  it('makeGetLayouts', () => {
    const getLayouts = makeGetLayouts();
    const state = {
      pages: {
        myPageId: {
          layout: [{
            i: 'layout1'
          }, {
            i: 'layout2'
          }]
        }
      }
    };
    const { getState } = getStore(state);

    getLayouts(getState(), { pageId: 'myPageId' }).should.have.properties({
      lg: [{ i: 'layout1' }, { i: 'layout2' }]
    });
  });
  it('getModifiedPagesIds', () => {
    const state = {
      pages: {
        myPageId1: { isModified: true },
        myPageId2: { isModified: false },
        myPageId3: { isModified: true },
      }
    };
    const { getState } = getStore(state);

    getModifiedPagesIds(getState()).should.eql([
      'myPageId1',
      'myPageId3'
    ]);
  });
  it('getPageModifiedViewsIds', () => {
    const state = {
      pages: {
        myPageId1: { views: ['view1', 'view2', 'view3'] }
      },
      views: {
        view1: { isModified: true },
        view2: { isModified: false },
        view3: { isModified: true },
      }
    };
    const { getState } = getStore(state);

    getPageModifiedViewsIds(getState(), 'myPageId1').should.eql(['view1', 'view3']);
    getPageModifiedViewsIds(getState(), 'otherPageId').should.eql([]);
  });
  it('getPageIdByViewId', () => {
    const state = {
      pages: {
        myId: { title: 'Title', views: ['view1', 'view2'] },
        myOtherId: { title: 'Title other', views: ['view3'] },
      },
    };
    const { getState } = getStore(state);
    getPageIdByViewId(getState(), { viewId: 'view2' }).should.equal('myId');
    getPageIdByViewId(getState(), { viewId: 'view3' }).should.equal('myOtherId');
  });
});
