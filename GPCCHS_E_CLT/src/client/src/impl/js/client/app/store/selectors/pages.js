import _ from 'lodash';

/**
 * Selectors
 */
export function getPage(state, pageId) {
  return state.pages[pageId];
}

export function getViews(state, pageId) {
  if (!pageId || !_.get(state, `pages.${pageId}.views`)) { // TODO TEST
    return [];
  }

  return _.reduce(state.pages[pageId].views, (views, id) => {
    const view = state.views[id];
    if (!view) {
      return views;
    }

    return [...views, Object.assign({ viewId: id }, view)];
  }, []);
}

export function getEditor(state, pageId) { // TODO TESt
  if (!pageId) {
    return null;
  }

  return _.get(state, `pages.${pageId}.editor`);
}
