import _get from 'lodash/get';
import _findIndex from 'lodash/findIndex';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getView } from '../../store/selectors/views';
import { getWindowPages } from '../../store/selectors/windows';
import { moveViewToPage, setCollapsed, setMaximized } from '../../store/actions/pages';
import View from './View';

const makeMapStateToProps = () => {
  const mapStateToProps = (state, { viewId, timebarUuid, windowId, pageId }) => {
    const { type, oId, absolutePath, isModified, backgroundColor, titleStyle, title }
        = getView(state, { viewId });

    const data = _get(state, ['viewData', viewId], {});
    const visuWindow = _get(state, ['timebars', timebarUuid, 'visuWindow']);
    const collapsed = _get(state,
      ['pages',
        pageId,
        'layout',
        _findIndex(_get(state, ['pages', pageId, 'layout']), i => i.i === viewId),
        'collapsed',
      ]
    );
    const maximized = _get(state,
      ['pages',
        pageId,
        'layout',
        _findIndex(_get(state, ['pages', pageId, 'layout']), i => i.i === viewId),
        'maximized',
      ]
    );
    return {
      backgroundColor,
      type,
      title,
      titleStyle,
      data,
      visuWindow,
      windowPages: getWindowPages(state, { windowId }),
      oId,
      absolutePath,
      isModified,
      collapsed,
      maximized,
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
