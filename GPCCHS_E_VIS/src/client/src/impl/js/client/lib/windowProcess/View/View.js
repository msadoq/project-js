import React, { PureComponent, PropTypes } from 'react';

import ViewHeader from './Header';
import UnknownView from './UnknownView';

import styles from './View.css';
import debug from '../../../lib/common/debug/windowDebug';

const logger = debug('View');

export default class View extends PureComponent {
  static propTypes = {
    component: PropTypes.func,
    isViewsEditorOpen: PropTypes.bool.isRequired,
    configuration: PropTypes.object,
    viewId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
  };
  render() {
    logger.debug('render');
    const ContentComponent = this.props.component || UnknownView;
    return (
      <div className={styles.container}>
        <ViewHeader
          isViewsEditorOpen={this.props.isViewsEditorOpen}
          configuration={this.props.configuration}
          viewId={this.props.viewId}
          type={this.props.type}
          openEditor={this.props.openEditor}
          closeEditor={this.props.closeEditor}
          unmountAndRemove={this.props.unmountAndRemove}
        />
        <div className={styles.content}>
          <ContentComponent {...this.props} />
        </div>
      </div>
    );
  }
}
