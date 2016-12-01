import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { LIFECYCLE_STARTED } from 'common/constants';

import Debug from '../Navigation/Debug';
import TimebarMasterContainer from '../Timebar/TimebarMasterContainer';
import PageContainer from '../Page/PageContainer';
import TabsContainer from '../Navigation/TabsContainer';
import styles from './Window.css';
import debug from '../../../lib/common/debug/windowDebug';

const logger = debug('Window');

export default class Window extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    focusedPageId: PropTypes.string.isRequired,
    appStatus: PropTypes.string,
  };

  render() {
    logger.debug('render', this.props);
    const {
      appStatus, focusedPageId,
      windowId
    } = this.props;

    if (appStatus !== LIFECYCLE_STARTED) {
      return (
        <div className={styles.box}>
          Connection in progress
          <div>...</div>
          <div className={styles.message}>
            ({appStatus})
          </div>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <Debug
          windowId={windowId}
          focusedPageId={focusedPageId}
        />
        <TabsContainer
          className="col-xs-12"
          windowId={windowId}
          focusedPageId={focusedPageId}
        />
        <div className={classnames(styles.content)}>
          <PageContainer
            windowId={windowId}
            focusedPageId={focusedPageId}
          />
        </div>
        <TimebarMasterContainer
          windowId={windowId}
          focusedPageId={focusedPageId}
        />
      </div>
    );
  }
}
