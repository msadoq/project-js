import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPage } from '../../store/reducers/pages';
import { getView } from '../../store/reducers/views';
import { getWindowPages } from '../../store/selectors/windows';
import { moveViewToPage, setCollapsed, setMaximized } from '../../store/actions/pages';
import View from './View';

const makeMapStateToProps = () => {
  const mapStateToProps = (state, { viewId, windowId, pageId }) => {
    const { type, oId, absolutePath, isModified, backgroundColor, titleStyle, title }
        = getView(state, { viewId });

    const page = getPage(state, { pageId });
    const collapsedLayout = page.layout.find(e => e.i === viewId && e.collapsed);

    return {
      backgroundColor,
      type,
      title,
      titleStyle,
      windowPages: getWindowPages(state, { windowId }),
      oId,
      absolutePath,
      isModified,
      collapsed: !!collapsedLayout,
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, { pageId }) => bindActionCreators({
  moveViewToPage: (windowId, toPageId, viewId) =>
    moveViewToPage(windowId, pageId, toPageId, viewId),
  collapseView: (viewId, flag) =>
    setCollapsed(pageId, viewId, flag),
  maximizeView: (viewId, flag) =>
    setMaximized(pageId, viewId, flag),
}, dispatch);

// return function to avoid page grid layout and React DOM re-conciliation issue
export default connect(makeMapStateToProps, mapDispatchToProps)(View);
