import _ from 'lodash/fp';

import { add as addTimeline } from '../store/actions/timelines';
import { add as addTimebar } from '../store/actions/timebars';
import { addAndMount as addAndMountView, setModified as setModifiedPage } from '../store/actions/pages';
import {
  add as addWindow,
  addAndMount as addAndMountPage,
  setModified as setModifiedWindow,
  focusPage,
} from '../store/actions/windows';
import { setModified as setModifiedView } from '../store/actions/views';

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

  // focus first page (TODO refacto)
  _.each((w) => {
    const pageId = _.get('pages[0]', w);
    dispatch(focusPage(w.uuid, pageId));
  }, windows);

  // set Modified to false on all documents (TODO refacto)
  _.each((v) => {
    dispatch(setModifiedView(v.uuid, false));
  }, views);

  _.each((p) => {
    dispatch(setModifiedPage(p.uuid, false));
  }, pages);

  _.each((w) => {
    dispatch(setModifiedWindow(w.uuid, false));
  }, windows);
};

export default loadDocumentsInStore;
