import {} from '../../common/test';
import {
  getPageViews,
  isAnyEditorOpened,
  isAnyInspectorOpened,
} from './pages';

describe('store:page:selectors', () => {
  it('getPageViews', () => {
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

    getPageViews(state, { pageId: 'myPageId' }).should.eql([
      { viewId: 'view1' },
    ]);
  });
  it('notice if any view is opened', () => {
    const state = {
      pages: {
        page1: {
          panels: {
            editorIsMinimized: false,
            editorWidth: 250,
          },
        },
        page2: {
          panels: {
            editorIsMinimized: true,
            editorWidth: 250,
          },
        },
      },
    };
    isAnyEditorOpened(state).should.eql(true);
  });
  it('notice if any view is opened', () => {
    const state = {
      pages: {
        page1: {
          panels: {
            editorWidth: 250,
            editorIsMinimized: true,
          },
        },
      },
    };
    isAnyEditorOpened(state).should.eql(false);
  });
  it('notice if any inspector is opened', () => {
    const state = {
      pages: {
        page1: {
          panels: {
            explorerIsMinimized: false,
            explorerTab: 'inspector',
          },
        },
      },
    };
    isAnyInspectorOpened(state).should.eql(true);
  });
  it('notice if no inspector is opened', () => {
    const state = {
      pages: {
        page1: {
          panels: {
            explorerIsMinimized: true,
            explorerTab: 'inspector',
          },
        },
      },
    };
    isAnyInspectorOpened(state).should.eql(false);
  });
});
