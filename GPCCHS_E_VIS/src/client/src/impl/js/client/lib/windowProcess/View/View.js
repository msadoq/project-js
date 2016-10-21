import React, { Component, PropTypes } from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';

import ViewHeader from './Header';
import UnknownView from './UnknownView';

import styles from './View.css';

export default class View extends Component {
  static propTypes = {
    component: PropTypes.func,
    type: PropTypes.string,
    data: PropTypes.object,
  };
  shouldComponentUpdate(nextProps) {
    // data modification
    // TODO : should implement shouldComponentUpdate logic in view types
    if (this.props.type === 'PlotView') {
      // TODO : only the time to implement a per view logic, to test throttle
      if (nextProps.data === this.props.data) {
        return false;
      }
    } else if (this.props.type === 'PlotView') {
      return !shallowEqual(this.props.data, nextProps.data);
    }

    return true;
  }
  render() {
    console.log('re-render view', this.props.type, Date.now() - this.lastRender || Date.now());
    this.lastRender = Date.now();
    const ContentComponent = this.props.component || UnknownView;
    return (
      <div className={styles.container}>
        <ViewHeader {...this.props} />
        <div className={styles.content}>
          <ContentComponent {...this.props} />
        </div>
      </div>
    );
  }
}
