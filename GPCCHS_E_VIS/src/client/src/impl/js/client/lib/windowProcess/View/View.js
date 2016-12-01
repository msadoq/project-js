import React, { PureComponent, PropTypes } from 'react';

import ViewHeader from './Header';
import UnknownView from './UnknownView';
import Message from '../common/Message';
import styles from './View.css';
import debug from '../../../lib/common/debug/windowDebug';

const logger = debug('View');

export default class View extends PureComponent {
  static propTypes = {
    component: PropTypes.func,
    removeMessage: PropTypes.func.isRequired,
    isViewsEditorOpen: PropTypes.bool,
    configuration: PropTypes.object,
    visuWindow: PropTypes.object,
    data: PropTypes.object,
    viewId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
    messages: PropTypes.array,
  };

  render() {
    logger.debug('render');
    const {
      configuration,
      configuration: { backgroundColour = '#FFFFFF' },
      isViewsEditorOpen,
      viewId,
      type,
      openEditor,
      closeEditor,
      unmountAndRemove,
      data,
      visuWindow
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
        />
        <div
          className={styles.content}
          style={{ backgroundColor: backgroundColour }}
        >
          { this.props.messages ?
            (this.props.messages.map((v, i) =>
              <Message
                key={i}
                type={v.type}
                message={v.message}
                onClose={this.props.removeMessage.bind(null, 'views', i, this.props.viewId)}
              />
            )) : null
          }
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
