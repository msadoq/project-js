import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { LIFECYCLE_STARTED } from 'common/constants';

import Navigation from '../Navigation/Navigation';
import TimebarContainer from '../Timebar/TimebarContainer';
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
        <Navigation
          windowId={windowId}
          focusedPageId={focusedPageId}
        />
        <div className={classnames('row', styles.content)}>
          <TabsContainer
            className="col-xs-12"
            windowId={windowId}
            focusedPageId={focusedPageId}
          />
          <PageContainer
            className="col-xs-12"
            windowId={windowId}
            focusedPageId={focusedPageId}
          />
        </div>
        <TimebarContainer
          windowId={windowId}
          focusedPageId={focusedPageId}
        />
      </div>
    );
  }
}
