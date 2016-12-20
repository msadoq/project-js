import React, { PureComponent, PropTypes } from 'react';
import getLogger from 'common/log';

import ViewHeader from './Header';
import UnknownView from './UnknownView';
import MessagesContainer from './MessagesContainer';
import styles from './View.css';

const logger = getLogger('GPCCHS:View');

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
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
    moveViewToPage: PropTypes.func,
    getWindowPages: PropTypes.func,
    collapseView: PropTypes.func,
    isCollapsed: PropTypes.bool,
    updateAbsolutePath: PropTypes.func,
    setModified: PropTypes.func,
  };

  static contextTypes = {
    focusedPageId: PropTypes.string,
  };

  componentDidMount() {
    document.addEventListener('keypress', this.toggleCollapse);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.toggleCollapse);
  }

  toggleCollapse = (e) => {
    if (e.keyCode === 101 && this.el.querySelector(':hover')) {
      const {
        collapseView,
        viewId,
        isCollapsed,
      } = this.props;
      const { focusedPageId } = this.context;
      collapseView(focusedPageId, viewId, !isCollapsed);
    }
  }

  render() {
    logger.debug('render');
    const {
      configuration,
      isCollapsed,
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
      updateAbsolutePath,
      setModified,
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
          isCollapsed={isCollapsed}
          oId={oId}
          absolutePath={absolutePath}
          updateAbsolutePath={updateAbsolutePath}
          setModified={setModified}
        />
        {!isCollapsed &&
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
            />
          </div>
        }
      </div>
    );
  }
}
