import React, { PureComponent, PropTypes } from 'react';
import throttle from 'react-throttle-render';

import ViewHeader from './Header';
import UnknownView from './UnknownView';

import styles from './View.css';

export default class View extends PureComponent {
  static propTypes = {
    component: PropTypes.func,
  };
  render() {
    const ContentComponent = throttle(this.props.component, 100) || UnknownView;
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
