import React, { Component, PropTypes } from 'react';

import { LIFECYCLE_STARTED } from '../../mainProcess/lifecycle';
import Navigation from '../Navigation/Navigation';
import TimebarContainer from '../Timebar/TimebarContainer';
import PageContainer from '../Page/PageContainer';
import TabsContainer from '../Navigation/TabsContainer';
import styles from './Window.css';

export default class Window extends Component {
  static propTypes = {
    appStatus: PropTypes.string,
  };

  render() {
    const { appStatus } = this.props;
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
        <Navigation {...this.props} />
        <div className={styles.content}>
          <TabsContainer {...this.props} />
          <PageContainer {...this.props} />
        </div>
        <TimebarContainer {...this.props} />
      </div>
    );
  }
}
