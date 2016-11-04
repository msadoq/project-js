import React, { Component, PropTypes } from 'react';
import { Navbar } from 'react-bootstrap';
import Navigation from '../Navigation/Navigation';
import TimebarContainer from '../Timebar/TimebarContainer';
import PageContainer from '../Page/PageContainer';
import TabsContainer from '../Navigation/TabsContainer';
import styles from './Window.css';

export default class Window extends Component {
  static propTypes = {
    windowDebug: PropTypes.object
  };

  render() {
    const { windowDebug } = this.props;

    return (
      <div className={styles.container}>
        <Navbar className={styles.navbar}>
          <Navigation {...this.props} />
        </Navbar>
        <div className={styles.content}>
          <TabsContainer {...this.props} />
          <PageContainer {...this.props} />
        </div>
        {windowDebug && windowDebug.timebarVisibility &&
          <TimebarContainer {...this.props} />}
      </div>
    );
  }
}
