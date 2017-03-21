/* eslint no-unused-expressions: 0 */
import { freezeArgs, getStore, should } from '../../../common/test';
import * as actions from '../../actions/windows';
import windowsReducer, {
  getWindow,
  getWindows,
  getWindowsArray,
  getWindowPageIds,
  getWindowFocusedPageId,
  getDisplayHelp,
} from '../windows';
import * as types from '../../types';

const reducer = freezeArgs(windowsReducer);

/* --- Reducer -------------------------------------------------------------- */
describe('store:windows:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    reducer({ myWindowId: { title: 'Title' } }, { payload: { windowId: 'myWindowId' } })
      .should.eql({ myWindowId: { title: 'Title' } });
  });
  describe('add', () => {
    it('should add in store', () => {
      const action = actions.addWindow('myWindowId', 'Title', { x: 110 }, ['myPageId'], null, true);
      const state = reducer(undefined, action);
      state.myWindowId.should.deep.eql({
        title: 'Title',
        displayHelp: false,
        focusedPage: null,
        pages: ['myPageId'],
        geometry: { w: 800, h: 600, x: 110, y: 10 },
        minimized: false,
        isLoaded: false,
        isModified: true,
        uuid: 'myWindowId',
      });
    });
    it('should support empty add', () => {
      const state = reducer(undefined, actions.addWindow('myWindowId'));
      const win = state.myWindowId;
      win.title.should.eql('Unknown');
      win.isModified.should.eql(true);
      win.minimized.should.eql(false);
      win.geometry.should.deep.eql({ x: 10, y: 10, w: 800, h: 600 });
    });
  });
  describe('HSC workspace', () => {
    it('close', () => {
      const newState = reducer({ myTimelineUuid: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
      newState.should.be.an('object').that.is.empty;
    });
  });
});

/* --- Selectors ------------------------------------------------------------ */
describe('store:windows:selectors', () => {
  it('getWindowsArray', () => {
    const state = {
      windows: {
        window1: { title: 'foo' },
        window2: { title: 'bar' },
      },
    };
    getWindowsArray(state).should.eql([
      { title: 'foo' },
      { title: 'bar' },
    ]);
  });
  it('getWindows', () => {
    const state = {
      windows: {
        myWindowId: { title: 'Title' },
        myOtherId: { title: 'Title other' },
      },
    };
    const { getState } = getStore(state);
    getWindows(getState()).should.equal(state.windows);
  });
  describe('getWindow', () => {
    const state = {
      windows: {
        myWindowId: { title: 'Title 1' },
      },
    };
    const { getState } = getStore(state);
    it('should returns window', () => {
      getWindow(getState(), { windowId: 'myWindowId' }).should.equal(state.windows.myWindowId);
    });
    it('should support not existing window', () => {
      should.not.exist(getWindow(getState(), { windowId: 'unknownId' }));
    });
  });
  it('getWindowPageIds', () => {
    const state = {
      windows: {
        window1: {
          pages: ['page1', 'page2'],
        },
      },
    };
    getWindowPageIds(state, { windowId: 'window1' }).should.eql(['page1', 'page2']);
  });
  it('getWindowFocusedPageId', () => {
    const state = {
      windows: {
        window1: {
          focusedPage: 'page1',
        },
      },
    };
    getWindowFocusedPageId(state, { windowId: 'window1' }).should.eql('page1');
  });
  it('getDisplayHelp', () => {
    const state = {
      windows: {
        w1: { displayHelp: true },
      },
    };
    getDisplayHelp(state, { windowId: 'w1' }).should.be.true;
    should.not.exist(getDisplayHelp({}, {}));
  });
});
