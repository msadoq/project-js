/* eslint no-unused-expressions: "off" */
import * as types from '../../types';
import viewsReducer, {
  getView,
  getViews,
  getModifiedViewsIds,
  getViewConfiguration,
  getViewAbsolutePath,
  getViewType,
  getViewTitle,
  getViewTitleStyle,
  getViewDomainName,
  getViewSessionName,
  areLinksShown,
} from '.';
import { freezeArgs, getStore, should } from '../../../common/test';

const reducer = freezeArgs(viewsReducer);

/* --- Reducer -------------------------------------------------------------- */
describe('store:views:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    reducer({ myViewId: { title: 'Title' } }, {})
      .should.eql({ myViewId: { title: 'Title' } });
  });
  it('HSC workspace', () => {
    it('close', () => {
      const newState = reducer({ myView: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
      newState.should.be.an('object').that.is.empty;
    });
  });
});

/* --- Selectors ------------------------------------------------------------ */
describe('store:views:selectors', () => {
  it('getView', () => {
    const { getState } = getStore({
      views: {
        myViewId: { title: 'Title 1' },
      },
    });
    getView(getState(), { viewId: 'myViewId' }).should.have.property('title', 'Title 1');
    should.not.exist(getView(getState(), { viewId: 'unknownId' }));
  });
  it('getViews', () => {
    const state = {
      views: {
        myId: { title: 'Title' },
        myOtherId: { title: 'Title other' },
      },
    };
    const { getState } = getStore(state);
    getViews(getState()).should.equal(state.views);
  });
  it('getModifiedViewsIds', () => {
    const state = {
      views: {
        view1: { isModified: true },
        view2: { isModified: false },
        view3: { isModified: true },
      },
    };
    getModifiedViewsIds(state).should.eql(['view1', 'view3']);
  });
  it('getViewConfiguration', () => {
    const state = {
      views: {
        myViewId: {
          configuration: {
            title: 'Title 1',
          },
        },
      },
    };
    getViewConfiguration(state, { viewId: 'myViewId' }).should.eql({
      title: 'Title 1',
    });
  });
  it('getViewAbsolutePath', () => {
    const state = {
      views: {
        myViewId: {
          absolutePath: true,
        },
      },
    };
    getViewAbsolutePath(state, { viewId: 'myViewId' }).should.be.true;
  });
  it('getViewType', () => {
    const state = {
      views: {
        myViewId: {
          type: 'PlotView',
        },
      },
    };
    getViewType(state, { viewId: 'myViewId' }).should.be.eql('PlotView');
  });
  it('getViewTitle', () => {
    const state = {
      views: {
        myViewId: {
          title: 'TITLE',
        },
      },
    };
    getViewTitle(state, { viewId: 'myViewId' }).should.be.eql('TITLE');
  });
  it('getViewTitleStyle', () => {
    const state = {
      views: {
        myViewId: {
          titleStyle: 'TITLE_STYLE',
        },
      },
    };
    getViewTitleStyle(state, { viewId: 'myViewId' }).should.be.eql('TITLE_STYLE');
  });
  it('areLinksShown', () => {
    const state = {
      views: {
        myViewId: { showLinks: true },
      },
    };
    areLinksShown(state, { viewId: 'myViewId' }).should.eql(true);
  });
  describe('getDomainName', () => {
    it('should return domainName', () => {
      const state = { views: { v1: { domainName: 'myDomain' } } };
      getViewDomainName(state, { viewId: 'v1' }).should.eql('myDomain');
    });
    it('should support empty state', () => {
      should.not.exist(getViewDomainName({ views: { v1: {} } }, { viewId: 'v1' }));
    });
  });
  describe('getSessionName', () => {
    it('should return sessionName', () => {
      const state = { views: { v1: { sessionName: 'mySession' } } };
      getViewSessionName(state, { viewId: 'v1' }).should.eql('mySession');
    });
    it('should support empty state', () => {
      should.not.exist(getViewSessionName({ views: { v1: {} } }, { viewId: 'v1' }));
    });
  });
});
