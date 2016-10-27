import React, { PureComponent, PropTypes } from 'react';

import ViewHeader from './Header';
import UnknownView from './UnknownView';

import styles from './View.css';

export default class View extends PureComponent {
  static propTypes = {
    component: PropTypes.func,
  };
  render() {
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
