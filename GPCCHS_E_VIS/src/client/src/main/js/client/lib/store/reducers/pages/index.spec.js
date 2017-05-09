/* eslint no-unused-expressions: 0 */
import { freezeArgs, should } from '../../../common/test';
import * as types from '../../types';
import * as actions from '../../actions/pages';
import pagesReducer, {
  getPages,
  getPage,
  getPanels,
  getPageLayout,
  getEditor,
  getModifiedPagesIds,
  getPageIdByViewId,
  getPageAbsolutePath,
  getPageIsModified,
  getPageDomainName,
  getPageSessionName,
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
      const newState = reducer(state, { type: types.WS_VIEW_UPDATE_ABSOLUTEPATH, payload: { viewId: 'view3' } });
      newState.page2.should.have.property('isModified');
      newState.page1.should.not.have.property('isModified');
    });
    it('does not set modified page', () => {
      const state = {
        page1: { views: ['view1', 'view2'] },
        page2: { views: ['view3', 'view4'] },
      };
      const newState = reducer(state, { type: types.WS_VIEW_UPDATE_ABSOLUTEPATH, payload: { viewId: 'view5' } });
      newState.page2.should.not.have.property('isModified');
      newState.page1.should.not.have.property('isModified');
    });
  });
  it('remove pages when close window', () => {
    const state = {
      p1: {},
      p2: {},
      p3: {},
    };
    const newState = reducer(state, { type: types.WS_WINDOW_CLOSE, payload: { pages: ['p1', 'p2'] } });
    newState.should.be.eql({ p3: {} });
  });
  it('should update sessionName', () => {
    const newState = reducer({ p1: {} }, actions.updateSessionName('p1', 'mySession'));
    newState.p1.should.eql({ sessionName: 'mySession', isModified: true });
    reducer(newState, actions.updateSessionName('p1', null))
      .should.eql({ p1: { isModified: true } });
  });
  it('should update domainName', () => {
    const newState = reducer({ p1: {} }, actions.updateDomainName('p1', 'myDomain'));
    newState.p1.should.eql({ domainName: 'myDomain', isModified: true });
    reducer(newState, actions.updateDomainName('p1', null))
      .should.eql({ p1: { isModified: true } });
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
  describe('getPageAbsolutePath', () => {
    it('should returns current page absolutePath', () => {
      const state = {
        pages: {
          myPageId: {
            absolutePath: true,
          },
        },
      };
      getPageAbsolutePath(state, { pageId: 'myPageId' }).should.be.true;
    });
  });
  describe('getPageIsModified', () => {
    it('should returns current page isModified', () => {
      const state = {
        pages: {
          myPageId: {
            isModified: true,
          },
        },
      };
      getPageIsModified(state, { pageId: 'myPageId' }).should.be.true;
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
  describe('getPageDomainName', () => {
    it('should return domainName', () => {
      const state = { pages: { p1: { domainName: 'myDomain' } } };
      getPageDomainName(state, { pageId: 'p1' }).should.eql('myDomain');
    });
    it('should support empty state', () => {
      should.not.exist(getPageDomainName({ pages: { p1: {} } }, { pageId: 'p1' }));
    });
  });
  describe('getSessionName', () => {
    it('should return sessionName', () => {
      const state = { pages: { p1: { sessionName: 'mySession' } } };
      getPageSessionName(state, { pageId: 'p1' }).should.eql('mySession');
    });
    it('should support empty state', () => {
      should.not.exist(getPageSessionName({ pages: { p1: {} } }, { pageId: 'p1' }));
    });
  });
});
