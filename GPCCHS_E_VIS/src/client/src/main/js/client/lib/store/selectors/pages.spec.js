/* eslint no-unused-expressions: 0 */
import { should } from '../../common/test';
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
  getPanels,
} from './pages';

describe('store:page:selectors', () => {
  it('getPage', () => {
    const state = {
      pages: {
        myPageId: { title: 'Title 1' },
      },
    };
    getPage(state, { pageId: 'myPageId' }).should.have.property('title', 'Title 1');
    should.not.exist(getPage(state, 'unknownId'));
  });
  it('getPageLayout', () => {
    const state = {
      pages: {
        myPageId: {
          layout: [],
        },
      },
    };
    getPageLayout(state, { pageId: 'myPageId' }).should.be.an('array');
  });
  it('getEditor', () => {
    const state = {
      pages: {
        myPageId: {
          editor: {},
        },
      },
    };
    getEditor(state, { pageId: 'myPageId' }).should.be.an('object');
  });
  describe('getPages', () => {
    it('should returns pages', () => {
      const state = {
        pages: {
          myId: { title: 'Title' },
          myOtherId: { title: 'Title other' },
        },
      };

      getPages(state).should.equal(state.pages);
    });
  });
  it('makeGetViews', () => {
    const getViews = makeGetViews();
    const state = {
      pages: {
        myPageId: {
          views: ['view1'],
        },
      },
      views: {
        views1: {},
        views2: {},
      },
    };

    getViews(state, { pageId: 'myPageId' }).should.eql([
      { viewId: 'view1' },
    ]);
  });
  it('makeGetLayouts', () => {
    const getLayouts = makeGetLayouts();
    const state = {
      pages: {
        myPageId: {
          layout: [{
            i: 'layout1',
          }, {
            i: 'layout2',
          }],
        },
      },
    };

    getLayouts(state, { pageId: 'myPageId' }).should.have.properties({
      lg: [{ i: 'layout1' }, { i: 'layout2' }],
    });
  });
  it('getModifiedPagesIds', () => {
    const state = {
      pages: {
        myPageId1: { isModified: true },
        myPageId2: { isModified: false },
        myPageId3: { isModified: true },
      },
    };

    getModifiedPagesIds(state).should.eql([
      'myPageId1',
      'myPageId3',
    ]);
  });
  it('getPageModifiedViewsIds', () => {
    const state = {
      pages: {
        myPageId1: { views: ['view1', 'view2', 'view3'] },
      },
      views: {
        view1: { isModified: true },
        view2: { isModified: false },
        view3: { isModified: true },
      },
    };

    getPageModifiedViewsIds(state, { pageId: 'myPageId1' }).should.eql(['view1', 'view3']);
    getPageModifiedViewsIds(state, { pageId: 'otherPageId' }).should.eql([]);
  });
  it('getPageIdByViewId', () => {
    const state = {
      pages: {
        myId: { title: 'Title', views: ['view1', 'view2'] },
        myOtherId: { title: 'Title other', views: ['view3'] },
      },
    };
    getPageIdByViewId(state, { viewId: 'view2' }).should.equal('myId');
    getPageIdByViewId(state, { viewId: 'view3' }).should.equal('myOtherId');
  });
  it('getPanels', () => {
    const state = {
      pages: {
        myId: { title: 'Title', panels: { editorWidth: 0 } },
        myOtherId: { title: 'Title other', panels: undefined },
      },
    };
    getPanels(state, { pageId: 'myId' }).should.equal(state.pages.myId.panels);
    should.not.exist(getPanels(state, { pageId: 'myOtherId' }));
  });
});
