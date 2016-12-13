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
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
    moveViewToPage: PropTypes.func,
    getWindowPages: PropTypes.func,
  };

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
    } = this.props;
    const ContentComponent = this.props.component || UnknownView;

    return (
      <div className={styles.container}>
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
        />
        <div
          className={styles.content}
          style={{ backgroundColor }}
        >
          <MessagesContainer viewId={viewId} />
          <ContentComponent
            data={data}
            type={type}
            visuWindow={visuWindow}
            configuration={configuration}
          />
        </div>
      </div>
    );
  }
}
