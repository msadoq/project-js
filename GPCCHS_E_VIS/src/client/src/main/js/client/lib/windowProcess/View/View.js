import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import _memoize from 'lodash/memoize';
import classnames from 'classnames';
import getLogger from 'common/log';
import ViewHeader from './Header';
import MessagesContainer from './MessagesContainer';
import PlotViewComp from '../../viewManager/PlotView/Components/View/PlotViewContainer';
import TextViewComp from '../../viewManager/TextView/Components/View/TextViewContainer';
import DynamicViewComp from '../../viewManager/DynamicView/Components/View/DynamicViewContainer';
import UnknownView from './UnknownView';

import styles from './View.css';

const logger = getLogger('View');

// Shortcut keyboard : html keycodes (event.keyCode)
const keys = {
  w: 87,
  x: 88,
  c: 67,
};

export default class View extends PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string,
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.shape({
      bgColor: PropTypes.string,
    }).isRequired,
    isViewsEditorOpen: PropTypes.bool.isRequired,
    visuWindow: PropTypes.shape({
      lower: PropTypes.number.isRequired,
      upper: PropTypes.number.isRequired,
      current: PropTypes.number.isRequired,
      defaultWidth: PropTypes.number.isRequired,
    }),
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.object,
    viewId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    oId: PropTypes.string,
    absolutePath: PropTypes.string,
    isModified: PropTypes.bool.isRequired,
    openEditor: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    closeView: PropTypes.func.isRequired,
    moveViewToPage: PropTypes.func.isRequired,
    collapseView: PropTypes.func.isRequired,
    maximizeView: PropTypes.func.isRequired,
    windowPages: PropTypes.arrayOf(PropTypes.object).isRequired,
    collapsed: PropTypes.bool.isRequired,
    maximized: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    backgroundColor: '#FFFFFF',
    titleStyle: {
      bgColor: '#FEFEFE',
    },
    data: {},
    absolutePath: '',
    oId: '',
    visuWindow: null,
    collapsed: false,
    maximized: false,
  };

  static contextTypes = {
    focusedPageId: PropTypes.string,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.toggleCollapse);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.toggleCollapse);
  }

  toggleCollapse = (e) => {
    const {
      // collapseView,
      viewId,
      closeEditor,
      isViewsEditorOpen,
      closeView,
      openEditor,
      type,
    } = this.props;
    // const { focusedPageId } = this.context;

    if (e.keyCode === keys.w && e.altKey && this.el.querySelector(':hover')) {
      // collapseView(focusedPageId, viewId, !configuration.collapsed); // TODO abesson
    } else if (e.keyCode === keys.x && e.altKey && this.el.querySelector(':hover')) {
      closeView(viewId);
      if (isViewsEditorOpen && closeEditor) {
        closeEditor();
      }
    } else if (e.keyCode === keys.c && e.altKey && this.el.querySelector(':hover')) {
      if (isViewsEditorOpen && closeEditor) {
        closeEditor();
      } else if (!isViewsEditorOpen && openEditor) {
        openEditor(viewId, type);
      }
    }
  }

  borderColorStyle = _memoize(c => ({ borderColor: c }));
  backgroundColorStyle = _memoize(c => ({ backgroundColor: c }));
  assignEl = (el) => { this.el = el; }

  render() {
    logger.debug('render');
    const {
      backgroundColor,
      titleStyle,
      isViewsEditorOpen,
      viewId,
      type,
      openEditor,
      closeEditor,
      closeView,
      data,
      visuWindow,
      moveViewToPage,
      windowPages,
      collapseView,
      maximizeView,
      oId,
      absolutePath,
      isModified,
      collapsed,
      maximized,
      title,
    } = this.props;
    let ContentComponent;
    switch (type) {
      case 'PlotView':
        ContentComponent = PlotViewComp;
        break;
      case 'TextView':
        ContentComponent = TextViewComp;
        break;
      case 'DynamicView':
        ContentComponent = DynamicViewComp;
        break;
      default:
        ContentComponent = UnknownView;
    }
    const borderColor = _get(titleStyle, 'bgColor');
    // !! gives visuWindow only for views which uses it to avoid useless rendering
    return (
      <div
        className={classnames('subdiv', styles.container)}
        style={this.borderColorStyle(borderColor)}
        ref={this.assignEl}
      >
        <ViewHeader
          title={title}
          titleStyle={titleStyle}
          isViewsEditorOpen={isViewsEditorOpen}
          viewId={viewId}
          type={type}
          openEditor={openEditor}
          closeEditor={closeEditor}
          closeView={closeView}
          windowPages={windowPages}
          moveViewToPage={moveViewToPage}
          collapseView={collapseView}
          maximizeView={maximizeView}
          collapsed={!!collapsed}
          maximized={!!maximized}
          oId={oId}
          absolutePath={absolutePath}
          isModified={isModified}
        />
        <div
          className={styles.content}
          style={this.backgroundColorStyle(backgroundColor)}
        >
          <MessagesContainer containerId={viewId} />
          <ContentComponent
            data={data}
            type={type}
            viewId={viewId}
            isViewsEditorOpen={isViewsEditorOpen}
            visuWindow={type === 'PlotView' ? visuWindow : undefined}
          />
        </div>
      </div>
    );
  }
}
