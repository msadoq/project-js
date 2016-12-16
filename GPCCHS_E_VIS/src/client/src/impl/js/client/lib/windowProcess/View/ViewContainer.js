import _get from 'lodash/get';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getComponent } from '../../../VIVL/window';
import { getView } from '../../store/selectors/views';
import { getWindowPages } from '../../store/selectors/windows';
import { moveViewToPage } from '../../store/actions/pages';
import { setCollapsedAndUpdateLayout } from '../../store/actions/views';

import View from './View';

const mapStateToProps = (state, { viewId, timebarId }) => {
  const { type, configuration, isCollapsed } = getView(state, viewId);
  const ViewTypeComponent = getComponent(type);

  const data = _get(state, ['viewData', viewId], {});
  const visuWindow = _get(state, ['timebars', timebarId, 'visuWindow']);
  return {
    type,
    configuration,
    isCollapsed,
    component: ViewTypeComponent,
    data,
    visuWindow,
    getWindowPages: windowId => getWindowPages(state, windowId),
  };
};

const mapDispatchToProps = (dispatch, { pageId }) => bindActionCreators({
  moveViewToPage: (windowId, toPageId, viewId) =>
    moveViewToPage(windowId, pageId, toPageId, viewId),
  collapseView: (focusedPageId, viewId, flag) =>
    setCollapsedAndUpdateLayout(focusedPageId, viewId, flag),
}, dispatch);

// return function to avoid page grid layout and React DOM re-conciliation issue
export default () => connect(mapStateToProps, mapDispatchToProps)(View);
