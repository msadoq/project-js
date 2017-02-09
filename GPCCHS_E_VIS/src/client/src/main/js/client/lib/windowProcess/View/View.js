import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import _memoize from 'lodash/memoize';
import classnames from 'classnames';
import getLogger from 'common/log';
import ViewHeader from './Header';
import MessagesContainer from './MessagesContainer';
import PlotViewComp from './PlotView/PlotViewContainer';
import TextViewComp from './TextView/TextViewContainer';
import DynamicViewComp from './DynamicView/DynamicViewContainer';
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
    isViewsEditorOpen: PropTypes.bool.isRequired,
    configuration: PropTypes.shape({
      backgroundColor: PropTypes.string,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      defaultRatio: PropTypes.object.isRequired,
      entryPoints: PropTypes.array.isRequired,
      links: PropTypes.array.isRequired,
      markers: PropTypes.array,
      axes: PropTypes.object,
      legend: PropTypes.object,
      titleStyle: PropTypes.object,
      grids: PropTypes.array,
    }).isRequired,
    visuWindow: PropTypes.shape({
      lower: PropTypes.number.isRequired,
      upper: PropTypes.number.isRequired,
      current: PropTypes.number.isRequired,
      defaultWidth: PropTypes.number.isRequired,
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.object,
    viewId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    oId: PropTypes.string,
    absolutePath: PropTypes.string,
    isModified: PropTypes.bool.isRequired,
    openEditor: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    unmountAndRemove: PropTypes.func.isRequired,
    moveViewToPage: PropTypes.func.isRequired,
    collapseView: PropTypes.func.isRequired,
    windowPages: PropTypes.arrayOf(PropTypes.object).isRequired,
    entryPoints: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    entryPoints: [],
    data: {},
    absolutePath: '',
    oId: '',
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
      collapseView,
      viewId,
      closeEditor,
      isViewsEditorOpen,
      unmountAndRemove,
      openEditor,
      type,
      configuration,
    } = this.props;
    const { focusedPageId } = this.context;

    if (e.keyCode === keys.w && e.altKey && this.el.querySelector(':hover')) {
      collapseView(focusedPageId, viewId, !configuration.collapsed);
    } else if (e.keyCode === keys.x && e.altKey && this.el.querySelector(':hover')) {
      unmountAndRemove(viewId);
      if (isViewsEditorOpen && closeEditor) {
        closeEditor();
      }
    } else if (e.keyCode === keys.c && e.altKey && this.el.querySelector(':hover')) {
      if (isViewsEditorOpen && closeEditor) {
        closeEditor();
      } else if (!isViewsEditorOpen && openEditor) {
        openEditor(viewId, type, configuration);
      }
    }
  }

  borderColorStyle = _memoize(c => ({ borderColor: c }));
  backgroundColorStyle = _memoize(c => ({ backgroundColor: c }));
  assignEl = (el) => { this.el = el; }

  render() {
    logger.debug('render');
    const {
      configuration,
      configuration: { backgroundColor = '#FFFFFF' },
      isViewsEditorOpen,
      viewId,
      type,
      openEditor,
      closeEditor,
      unmountAndRemove,
      data,
      visuWindow,
      moveViewToPage,
      windowPages,
      collapseView,
      oId,
      absolutePath,
      isModified,
      entryPoints,
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

    const borderColor = _get(configuration, ['titleStyle', 'bgColor'], '#fefefe');
    // !! gives visuWindow only for views which uses it to avoid useless rendering
    return (
      <div
        className={classnames('subdiv', styles.container)}
        style={this.borderColorStyle(borderColor)}
        ref={this.assignEl}
      >
        <ViewHeader
          isViewsEditorOpen={isViewsEditorOpen}
          configuration={configuration}
          viewId={viewId}
          type={type}
          openEditor={openEditor}
          closeEditor={closeEditor}
          unmountAndRemove={unmountAndRemove}
          windowPages={windowPages}
          moveViewToPage={moveViewToPage}
          collapseView={collapseView}
          collapsed={!!configuration.collapsed}
          oId={oId}
          absolutePath={absolutePath}
          isModified={isModified}
        />
        {!configuration.collapsed &&
          <div
            className={styles.content}
            style={this.backgroundColorStyle(backgroundColor)}
          >
            <MessagesContainer viewId={viewId} />
            <ContentComponent
              data={data}
              type={type}
              viewId={viewId}
              isViewsEditorOpen={isViewsEditorOpen}
              visuWindow={type === 'PlotView' ? visuWindow : undefined}
              configuration={configuration}
              entryPoints={entryPoints}
            />
          </div>
        }
      </div>
    );
  }
}
