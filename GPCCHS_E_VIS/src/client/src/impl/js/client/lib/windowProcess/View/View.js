import React, { PureComponent, PropTypes } from 'react';
import getLogger from 'common/log';

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
    component: PropTypes.func,
    isViewsEditorOpen: PropTypes.bool,
    configuration: PropTypes.object,
    visuWindow: PropTypes.object,
    data: PropTypes.object,
    viewId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    oId: PropTypes.string,
    absolutePath: PropTypes.string,
    isModified: PropTypes.bool,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
    moveViewToPage: PropTypes.func,
    getWindowPages: PropTypes.func,
    collapseView: PropTypes.func,
    entryPoints: PropTypes.array,
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
      component,
      oId,
      absolutePath,
      isModified,
      entryPoints,
    } = this.props;
    const ContentComponent = component || UnknownView;

    return (
      <div
        className={styles.container}
        ref={(e) => { this.el = e; }}
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
        />
        {!configuration.collapsed &&
          <div
            className={styles.content}
            style={{ backgroundColor }}
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
            />
          </div>
        }
      </div>
    );
  }
}
