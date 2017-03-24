/* eslint no-unused-expressions: 0 */
import { freezeArgs, should } from '../../../common/test';
import * as types from '../../types';
import pagesReducer, {
  getPages,
  getPage,
  getPanels,
  getPageLayout,
  getEditor,
  getModifiedPagesIds,
  getPageIdByViewId,
} from '.';

/* --- Reducer -------------------------------------------------------------- */

const reducer = freezeArgs(pagesReducer);

describe('store:pages:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    const state = { myPageId: { title: 'Title' } };
    reducer(state, {}).should.eql(state);
  });
  it('unknown action with pageId', () => {
    const state = { myPageId: { title: 'Title' } };
    reducer(state, { payload: { pageId: 'myPageId' } }).should.eql(state);
  });
  describe('HSC workspace', () => {
    it('close', () => {
      reducer({ myPage: { timebarHeight: 5 } }, { type: types.HSC_CLOSE_WORKSPACE })
      .should.be.an('object').that.is.empty;
    });
  });
  describe('Update view path', () => {
    it('set modified page', () => {
      const state = {
        page1: { views: ['view1', 'view2'] },
        page2: { views: ['view3', 'view4'] },
      };
      const newState = reducer(state, { type: types.WS_VIEW_UPDATEPATH, payload: { viewId: 'view3' } });
      newState.page2.should.have.property('isModified');
      newState.page1.should.not.have.property('isModified');
    });
    it('does not set modified page', () => {
      const state = {
        page1: { views: ['view1', 'view2'] },
        page2: { views: ['view3', 'view4'] },
      };
      const newState = reducer(state, { type: types.WS_VIEW_UPDATEPATH, payload: { viewId: 'view5' } });
      newState.page2.should.not.have.property('isModified');
      newState.page1.should.not.have.property('isModified');
    });
  });
});

/* --- Selectors ------------------------------------------------------------ */

describe('store:page:selectors', () => {
  describe('getPage', () => {
    it('should returns page', () => {
      const state = {
        pages: {
          myPageId: { title: 'Title 1' },
        },
      };
      getPage(state, { pageId: 'myPageId' }).should.have.property('title', 'Title 1');
      should.not.exist(getPage(state, 'unknownId'));
    });
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
  describe('getPanels', () => {
    it('should returns panels', () => {
      const state = {
        pages: {
          myId: { title: 'Title', panels: { editorWidth: 0 } },
          myOtherId: { title: 'Title other', panels: undefined },
        },
      };
      getPanels(state, { pageId: 'myId' }).should.equal(state.pages.myId.panels);
      getPanels(state, { pageId: 'myOtherId' }).should.be.eql({});
    });
  });
  describe('getPageLayout', () => {
    it('should returns current page layout', () => {
      const state = {
        pages: {
          myPageId: {
            layout: [],
          },
        },
      };
      getPageLayout(state, { pageId: 'myPageId' }).should.be.an('array');
    });
  });
  describe('getEditor', () => {
    it('should returns current page layout', () => {
      const state = {
        pages: {
          myPageId: {
            editor: {},
          },
        },
      };
      getEditor(state, { pageId: 'myPageId' }).should.be.an('object');
    });
  });
  describe('getModifiedPagesIds', () => {
    it('should returns all modified pages ids', () => {
      const state = {
        pages: {
          myPageId1: { uuid: 'myPageId1', isModified: true },
          myPageId2: { uuid: 'myPageId2', isModified: false },
          myPageId3: { uuid: 'myPageId3', isModified: true },
        },
      };

      getModifiedPagesIds(state).should.eql([
        'myPageId1',
        'myPageId3',
      ]);
    });
  });
  describe('getPageIdByViewId', () => {
    it('should returns pageId', () => {
      const state = {
        pages: {
          myId: { uuid: 'myId', title: 'Title', views: ['view1', 'view2'] },
          myOtherId: { uuid: 'myOtherId', title: 'Title other', views: ['view3'] },
        },
      };
      getPageIdByViewId(state, { viewId: 'view2' }).should.equal('myId');
      getPageIdByViewId(state, { viewId: 'view3' }).should.equal('myOtherId');
    });
  });
});
