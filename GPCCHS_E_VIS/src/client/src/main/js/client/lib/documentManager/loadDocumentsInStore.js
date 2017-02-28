import _ from 'lodash/fp';

import { add as addTimeline } from '../store/actions/timelines';
import { add as addTimebar } from '../store/actions/timebars';
import { addAndMount as addAndMountView } from '../store/actions/pages';
import { add as addWindow, addAndMount as addAndMountPage } from '../store/actions/windows';

const loadDocumentsInStore = documents => (dispatch) => {
  const { windows, timelines, timebars, pages, views } = documents;
  // add windows
  _.each((w) => {
    // set focusedPage on the fly (not in documents)
    const pageId = (w.pages && w.pages.length) ? w.pages[0] : null;
    dispatch(addWindow(w.uuid, w.title, w.geometry, w.pages, pageId, false));
  }, windows);

  // add timelines
  _.each(tl => dispatch(addTimeline(tl.uuid, tl)), timelines);

  // add timebars
  _.each(tb => dispatch(addTimebar(tb.uuid, tb)), timebars);

  // add pages
  _.each((p) => {
    dispatch(addAndMountPage(
      p.windowId,
      p.uuid,
      p
    ));
  }, pages);

  // add views
  _.each((v) => {
    dispatch(addAndMountView(
      v.pageId,
      v.uuid,
      v
    ));
  }, views);
};

export default loadDocumentsInStore;
