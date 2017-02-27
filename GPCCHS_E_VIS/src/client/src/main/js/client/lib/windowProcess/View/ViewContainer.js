import _get from 'lodash/get';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getView,
  getViewEntryPoints,
} from '../../store/selectors/views';
import { getWindowPages } from '../../store/selectors/windows';
import { moveViewToPage } from '../../store/actions/pages';
import { setCollapsedAndUpdateLayout } from '../../store/actions/views';

import View from './View';


const makeMapStateToProps = () => {
  const mapStateToProps = (state, { viewId, timebarUuid, windowId }) => {
    const { type, configuration, oId, absolutePath, isModified }
        = getView(state, { viewId });

    const data = _get(state, ['viewData', viewId], {});
    const visuWindow = _get(state, ['timebars', timebarUuid, 'visuWindow']);
    return {
      entryPoints: getViewEntryPoints(state, { viewId }),
      type,
      configuration,
      data,
      visuWindow,
      windowPages: getWindowPages(state, { windowId }),
      oId,
      absolutePath,
      isModified,
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, { pageId }) => bindActionCreators({
  moveViewToPage: (windowId, toPageId, viewId) =>
    moveViewToPage(windowId, pageId, toPageId, viewId),
  collapseView: (focusedPageId, viewId, flag) =>
    setCollapsedAndUpdateLayout(focusedPageId, viewId, flag),
}, dispatch);

// return function to avoid page grid layout and React DOM re-conciliation issue
export default () => connect(makeMapStateToProps, mapDispatchToProps)(View);
