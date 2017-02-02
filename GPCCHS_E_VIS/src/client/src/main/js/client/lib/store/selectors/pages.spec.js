/* eslint no-unused-expressions: 0 */
import { should } from '../../common/test';
import {
  getPages,
  getPageIds,
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
    const state = {
      pages: {
        myPageId: { title: 'Title 1' },
      },
    };
    getPage(state, 'myPageId').should.have.property('title', 'Title 1');
    should.not.exist(getPage(state, 'unknownId'));
  });
  it('getPageIds', () => {
    const state = {
      pages: {
        page1: { title: 'Title 1' },
        page2: { title: 'Title 2' },
      },
    };
    getPageIds(state).should.eql(['page1', 'page2']);
  });
  it('getPageLayout', () => {
    const state = {
      pages: {
        myPageId: {
          layout: []
        }
      }
    };
    getPageLayout(state, { pageId: 'myPageId' }).should.be.an('array');
  });
  it('getEditor', () => {
    const state = {
      pages: {
        myPageId: {
          editor: {}
        }
      }
    };
    getEditor(state, 'myPageId').should.be.an('object');
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
          views: ['view1']
        }
      },
      views: {
        views1: {},
        views2: {},
      }
    };

    getViews(state, { pageId: 'myPageId' }).should.eql([
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

    getLayouts(state, { pageId: 'myPageId' }).should.have.properties({
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

    getModifiedPagesIds(state).should.eql([
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

    getPageModifiedViewsIds(state, 'myPageId1').should.eql(['view1', 'view3']);
    getPageModifiedViewsIds(state, 'otherPageId').should.eql([]);
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
});
