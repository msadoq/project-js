import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import _memoize from 'lodash/memoize';
import classnames from 'classnames';
import getLogger from 'common/log';
import PlotViewComp from '../../../VIVL/PlotView/window/PlotViewContainer';
import TextViewComp from '../../../VIVL/TextView/window/TextViewContainer';
import DynamicViewComp from '../../../VIVL/DynamicView/window/DynamicViewContainer';
import ViewHeader from './Header';
import UnknownView from './UnknownView';
import MessagesContainer from './MessagesContainer';
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
    configuration: PropTypes.object.isRequired,
    visuWindow: PropTypes.object,
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
    getWindowPages: PropTypes.func.isRequired,
    collapseView: PropTypes.func.isRequired,
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

  constructor(...args) {
    super(...args);
    this.state = { show: 'html' };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.toggleCollapse);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.toggleCollapse);
  }

  updateShow = (s) => {
    this.setState({ show: s });
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
      getWindowPages,
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
          getWindowPages={getWindowPages}
          moveViewToPage={moveViewToPage}
          collapseView={collapseView}
          collapsed={configuration.collapsed}
          oId={oId}
          absolutePath={absolutePath}
          isModified={isModified}
          show={this.state.show}
          updateShow={this.updateShow}
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
              visuWindow={visuWindow}
              configuration={configuration}
              entryPoints={entryPoints}
              show={this.state.show}
            />
          </div>
        }
      </div>
    );
  }
}
