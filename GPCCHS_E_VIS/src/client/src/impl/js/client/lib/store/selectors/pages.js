import _get from 'lodash/get';

/**
 * Selectors
 */
export const getPage = (state, pageId) => state.pages[pageId];

export function getViews(state, pageId) {
  if (!pageId) { // TODO TEST
    return [];
  }

  const views = _get(state, `pages.${pageId}.views`, []);

  return views.reduce((views, id) => {
    const view = state.views[id];
    if (!view) {
      return views;
    }

    return [...views, { viewId: id, ...view }];
  }, []);
}

export function getEditor(state, pageId) { // TODO TESt
  if (!pageId) {
    return null;
  }

  return _get(state, `pages.${pageId}.editor`);
}
